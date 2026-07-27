# Releasing an update

How to ship a new version of the Codex Infinium desktop app, now that the
auto-updater (Tauri `updater` plugin, step 6) is wired up. This replaces the
old step-2/3 process of just building an installer and copying it to the
Desktop — that still works for a first install, but existing installs now
update themselves automatically once a release is published this way.

## One-time setup (already done, for reference)

- Signing keypair generated via `npx tauri signer generate --ci -p "" -w src-tauri/updater-private.key`.
- **`src-tauri/updater-private.key` is git-ignored and lives only on this
  machine.** If it's ever lost, generate a new keypair and update the
  `pubkey` in `tauri.conf.json` — every existing install stops being able to
  verify new updates (they'll just silently never see the "update available"
  banner) until they're manually reinstalled with the new key baked in.
  There is no recovery of a lost key; there's only "generate a new one and
  accept that old installs are now on their own."
- `src-tauri/tauri.conf.json`'s `plugins.updater.endpoints` points at
  `https://raw.githubusercontent.com/joeyj123/Codex-Infinium/main/latest.json`.

## Every release, step by step

1. **Bump the version** in two places (keep them in sync):
   - `src-tauri/tauri.conf.json` → `"version"`
   - `src-tauri/Cargo.toml` → `[package] version`

2. **Build the static export**, same as always:
   ```
   npm run build
   ```

3. **Build and sign the installers.** The signing env vars must be set for
   this exact command — without them, `tauri build` still produces the
   `.msi`/`.exe` but skips generating the `.sig` files, and the updater will
   never see this version as valid.

   PowerShell:
   ```
   $env:TAURI_SIGNING_PRIVATE_KEY = Get-Content "src-tauri\updater-private.key" -Raw
   $env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD = ""
   npx tauri build
   ```

   This produces, under `src-tauri/target/release/bundle/`:
   - `msi/Codex Infinium_<version>_x64_en-US.msi` (+ `.sig`)
   - `nsis/Codex Infinium_<version>_x64-setup.exe` (+ `.sig`)

   The **NSIS `.exe` is the one the updater actually downloads and runs**
   (`platforms.windows-x86_64` in `latest.json` points at it) — the `.msi` is
   still built and worth publishing too for people doing a fresh install via
   Windows' native installer UI, but the updater flow itself only touches
   the `.exe`.

4. **Create a GitHub Release** with the version as the tag (e.g. `v0.1.1`),
   and upload both installers plus both `.sig` files as release assets. Via
   `gh` CLI (portable build in `scratch/gh_cli/bin/gh.exe` if not installed
   system-wide, or `winget install --id GitHub.cli` if UAC/elevation is
   available):
   ```
   gh release create v<version> \
     "path/to/Codex-Infinium_<version>_x64-setup.exe" \
     "path/to/Codex-Infinium_<version>_x64-setup.exe.sig" \
     "path/to/Codex-Infinium_<version>_x64_en-US.msi" \
     "path/to/Codex-Infinium_<version>_x64_en-US.msi.sig" \
     --repo joeyj123/Codex-Infinium \
     --title "v<version>" \
     --notes "<what changed>"
   ```
   Note: rename the built files to strip the space before `Infinium` (e.g.
   `Codex Infinium_...` → `Codex-Infinium_...`) before uploading — GitHub
   handles spaces in release asset names fine, but it avoids URL-encoding
   headaches in `latest.json` below.

5. **Write `latest.json`** at the project root (this is the file the
   updater actually polls, via raw.githubusercontent.com) and push it to
   `main`:
   ```json
   {
     "version": "<version>",
     "notes": "<what changed>",
     "pub_date": "<UTC ISO 8601 timestamp>",
     "platforms": {
       "windows-x86_64": {
         "signature": "<contents of the .exe.sig file, verbatim>",
         "url": "https://github.com/joeyj123/Codex-Infinium/releases/download/v<version>/Codex-Infinium_<version>_x64-setup.exe"
       }
     }
   }
   ```
   The `signature` field is the **entire contents** of the `.sig` file
   (a base64 blob), not a hash you compute yourself — just `cat` the file
   Tauri already generated and paste it in.

6. **Commit and push** `latest.json` (and the version bump) to `main`:
   ```
   git add latest.json src-tauri/tauri.conf.json src-tauri/Cargo.toml src-tauri/Cargo.lock
   git commit -m "Release v<version>"
   git push origin main
   ```

7. **Done.** Any installed copy of the app will now see the update, either
   automatically on next launch (the banner in `components/UpdateBanner.js`)
   or when someone clicks "Check for Updates" in Settings
   (`app/settings/page.js`). Clicking install downloads the real `.exe` from
   the GitHub Release, runs it silently, and relaunches the app — verified
   working end-to-end in the step-6 session (see
   `CHRONICLE_OF_INFINIUM.md`).

## Sanity checks worth doing after step 6

- `curl https://raw.githubusercontent.com/joeyj123/Codex-Infinium/main/latest.json`
  should return the JSON you just pushed, not a 404 or a stale version.
- The release's assets should be downloadable directly (click the asset link
  on the GitHub Releases page) — a private repo would 404 here even though
  `git push` still works, since raw.githubusercontent.com and Release asset
  downloads both need public read access.
