"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import kb from "@/data/knowledge_base.json";
import { useForge, EXPOSURE_LEVELS } from "@/lib/ForgeContext";
import { useOnboarding } from "@/lib/OnboardingContext";
import { useProgress } from "@/lib/ProgressContext";
import { gradeAnswer } from "@/lib/grading";
import { gradeCodeOutput } from "@/lib/gradeCode";
import { runJavaScript } from "@/lib/codeExec";
import { runPython } from "@/lib/pyodideRunner";
import { runCpp, isTauriRuntime } from "@/lib/cppRunner";
import { runJava } from "@/lib/javaRunner";
import { runCsharp } from "@/lib/csharpRunner";
import { forgeExampleXp } from "@/lib/forgeXp";
import ExposureSelector from "@/components/ExposureSelector";
import ForgeReferencePane from "@/components/ForgeReferencePane";
import Walkthrough from "@/components/Walkthrough";

const FORGE_READY_TIERS = ["novice", "apprentice", "expert"];

// Python and JavaScript run for real in-browser (JS natively, Python via a
// lazy-loaded Pyodide worker). C++, Java, and C# all run for real too, but
// only inside the Tauri desktop shell (via the bundled MinGW-w64/g++,
// Temurin JDK, and trimmed .NET SDK toolchains respectively) — a plain
// browser tab has no compiler to shell out to. All three languages this app
// supports now have a genuine execution path; none fall back to prose
// pattern-matching alone anymore.
const BROWSER_LIVE_LANGS = ["python", "javascript"];
const TAURI_LIVE_LANGS = ["cpp", "java", "csharp"];

const FORGE_INTRO_STEPS = [
  {
    title: "The Forge",
    body: "Every topic has a bank of worked examples. Three difficulty levels — Guided, Challenge, and The Gauntlet — control how much help you see, not what content exists.",
  },
  {
    title: "Guided vs. Challenge vs. Gauntlet",
    body: "Guided shows the worked solution and hints up front, with an optional answer box for extra practice. Challenge and The Gauntlet require typing an answer before the worked solution reveals.",
  },
  {
    title: "Grading & XP",
    body: "For Python and JavaScript code examples, your code actually runs in a sandboxed browser worker and is checked against real output — genuine correctness checking. C++, Java, and C# compile and run for real too, but only inside the desktop app. Everything else (prose answers) is graded offline against key concepts and sample answers — no AI, just pattern-matching, so treat that path as a rough check rather than a perfect one. You'll get Strong match, Partial match, or Needs review. XP scales with both the difficulty level (Gauntlet pays the most) and how well you matched. Each example only pays out once.",
  },
  {
    title: "Reference Pane",
    body: "The 📖 Reference button opens a pocket view of this topic's page from The Study, without leaving The Forge. It's available in Guided and Challenge, but not The Gauntlet.",
  },
];

export default function ForgeTopicClient() {
  const { tierId, topicId } = useParams();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const router = useRouter();
  const { exposure, loaded: forgeLoaded } = useForge();
  const { loaded: onboardingLoaded, hasSeenMode, markModeSeen } = useOnboarding();
  const { hasCompletedForgeExample, markForgeExampleComplete } = useProgress();

  const tier = kb.tiers.find((t) => t.id === tierId);
  const forgeReady = FORGE_READY_TIERS.includes(tierId);
  const isExpert = tierId === "expert";
  const topic = forgeReady
    ? isExpert
      ? lang && tier?.language_tracks?.[lang]?.topics?.find((t) => t.id === topicId)
      : tier?.topics?.find((t) => t.id === topicId)
    : null;
  const examples = topic?.examples || [];

  const [index, setIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState([]);
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [gradeResult, setGradeResult] = useState(null);
  const [codeOutput, setCodeOutput] = useState(null);
  const [running, setRunning] = useState(false);
  // Starts false to match server-rendered/static-export HTML (which never
  // has a Tauri bridge), then flips true after mount if this page is
  // actually running inside the desktop shell — avoids a hydration
  // mismatch from branching on `window` during the initial render.
  const [tauriReady, setTauriReady] = useState(false);
  useEffect(() => {
    setTauriReady(isTauriRuntime());
  }, []);

  const example = examples[index];
  // isCodeTopic/isLive are per-example, not per-tier/per-URL: Expert's
  // language-track pages are always code topics (Python/JS run live in any
  // browser, C++ runs live only inside the Tauri desktop shell, Java/C#
  // fall back to an authored preview), while Apprentice topics are plain
  // reasoning examples UNLESS the specific example carries its own
  // `language: "python"` field, in which case that one example gets the same
  // code-textarea + terminal + live-run treatment, coexisting with ordinary
  // prose examples elsewhere in that topic's examples array.
  const isCodeTopic = isExpert || example?.language === "python";
  const isLive = isExpert
    ? BROWSER_LIVE_LANGS.includes(lang) || (tauriReady && TAURI_LIVE_LANGS.includes(lang))
    : example?.language === "python";
  const runLang = isExpert ? lang : example?.language;

  async function execute(code) {
    if (runLang === "python") return runPython(code);
    if (runLang === "javascript") return runJavaScript(code);
    if (runLang === "cpp") return runCpp(code);
    if (runLang === "java") return runJava(code);
    if (runLang === "csharp") return runCsharp(code);
    return runJavaScript(code);
  }

  // Guided shows everything proactively and opens the reference pane by
  // default; Challenge and The Gauntlet start closed/hidden, and only unlock
  // the worked solution once an answer has been submitted (or was already
  // submitted in a past visit). This resets every time the example or the
  // chosen exposure level changes, so switching examples doesn't carry over
  // a previous reveal or answer.
  useEffect(() => {
    const alreadyDone = example ? hasCompletedForgeExample(example.id) : false;
    setRevealedHints([]);
    setSolutionRevealed(exposure === "guided" || alreadyDone);
    setReferenceOpen(exposure === "guided");
    setAnswerText(isCodeTopic ? example?.starter_code || "" : "");
    setGradeResult(null);
    setCodeOutput(null);
    setRunning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, exposure, topicId]);

  if (!tier) return <p>Unknown tier.</p>;

  if (!forgeReady) {
    return (
      <div>
        <h1>
          {tier.icon} {tier.name}
        </h1>
        <div className="banner banner-dim">
          The Forge doesn't have examples for {tier.name} yet — Novice and Expert are the only tiers built out so far.
        </div>
        <button className="btn" style={{ marginTop: 16 }} onClick={() => router.push("/forge")}>
          ⬅️ Back to The Forge
        </button>
      </div>
    );
  }

  if (isExpert && !lang) {
    return (
      <div>
        <h1>{tier.icon} {tier.name}</h1>
        <div className="banner banner-dim">No language selected.</div>
        <button className="btn" style={{ marginTop: 16 }} onClick={() => router.push("/forge/expert")}>
          ⬅️ Choose a Language
        </button>
      </div>
    );
  }

  if (!topic) return <p>Unknown topic.</p>;

  const backHref = isExpert ? `/forge/expert?lang=${lang}` : `/forge/${tierId}`;

  if (examples.length === 0) {
    return (
      <div>
        <h1>{topic.title}</h1>
        <div className="banner banner-dim">No examples have been forged for this topic yet.</div>
        <button className="btn" style={{ marginTop: 16 }} onClick={() => router.push(backHref)}>
          ⬅️ Back
        </button>
      </div>
    );
  }

  if (!forgeLoaded) return null;

  const showStepsProactively = exposure === "guided";
  const hintsClickable = exposure === "challenge";
  const showHints = exposure !== "gauntlet";
  const referenceAllowed = exposure !== "gauntlet";
  const answerRequiredForSolution = exposure !== "guided";
  const alreadyCompleted = hasCompletedForgeExample(example.id);

  function goTo(newIndex) {
    if (newIndex < 0 || newIndex >= examples.length) return;
    setIndex(newIndex);
  }

  function revealHint(i) {
    setRevealedHints((prev) => (prev.includes(i) ? prev : [...prev, i]));
  }

  async function runCode() {
    if (!answerText.trim() || !isLive) return;
    setRunning(true);
    const execResult = await execute(answerText);
    setRunning(false);
    setCodeOutput(execResult);
  }

  // Grading branches by language: Python/JS/C++/Java/C# all actually execute
  // the submitted code (in-browser for Python/JS, via Tauri for the other
  // three) and compare real captured output against expected_output (see
  // lib/gradeCode.js). Only plain prose answers fall back to
  // lib/grading.js's offline word-overlap pattern-matching. Submitting is
  // what satisfies Challenge and Gauntlet's "answer before solution" gate;
  // Guided's box is optional reinforcement.
  async function submitAnswer() {
    if (!answerText.trim()) return;

    if (isCodeTopic && isLive) {
      setRunning(true);
      const execResult = await execute(answerText);
      setRunning(false);
      setCodeOutput(execResult);
      const result = gradeCodeOutput(execResult, example.expected_output);
      setGradeResult(result);
      setSolutionRevealed(true);
      if (!alreadyCompleted) {
        const xp = forgeExampleXp(exposure, result.tier);
        markForgeExampleComplete(example.id, xp, tier.name);
      }
      return;
    }

    const result = gradeAnswer(answerText, example);
    setGradeResult(result);
    setSolutionRevealed(true);
    if (!alreadyCompleted) {
      const xp = forgeExampleXp(exposure, result.tier);
      markForgeExampleComplete(example.id, xp, tier.name);
    }
  }

  return (
    <div>
      <div className="study-toolbar">
        <button className="btn" onClick={() => router.push(backHref)}>
          ⬅️ Back
        </button>
        <h2 style={{ margin: 0, textAlign: "center" }}>{topic.title}</h2>
        {referenceAllowed ? (
          <button className="btn" onClick={() => setReferenceOpen(true)}>
            📖 Reference
          </button>
        ) : (
          <span />
        )}
      </div>

      <ExposureSelector />

      <div className="card forge-example-card" style={{ marginTop: 18 }}>
        <p className="stat-line" style={{ marginBottom: 10 }}>
          Example {index + 1} / {examples.length}
        </p>

        <p style={{ fontSize: 17, lineHeight: 1.6 }}>{example.prompt}</p>

        {showHints && example.hints?.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <p className="section-tag" style={{ marginBottom: 8 }}>
              Hints
            </p>
            {example.hints.map((hint, i) => {
              const revealed = showStepsProactively || revealedHints.includes(i);
              return (
                <div key={i} style={{ marginBottom: 8 }}>
                  {revealed ? (
                    <p className="stat-line" style={{ color: "var(--parchment)" }}>
                      💡 {hint}
                    </p>
                  ) : (
                    <button className="btn" onClick={() => revealHint(i)}>
                      Reveal hint {i + 1}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 22 }}>
          <p className="section-tag" style={{ marginBottom: 8 }}>
            {isCodeTopic ? "Your Code" : "Your Answer"}
            {exposure === "guided" ? " (optional)" : ""}
          </p>
          <textarea
            className={isCodeTopic ? "forge-answer-box forge-code-box" : "forge-answer-box"}
            rows={isCodeTopic ? 10 : 4}
            spellCheck={false}
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder={isCodeTopic ? "Write your code here…" : "Type your answer in your own words…"}
          />
          <div className="btn-row" style={{ marginTop: 8 }}>
            {isCodeTopic && isLive && (
              <button className="btn" disabled={!answerText.trim() || running} onClick={runCode}>
                {running ? "Running…" : "▶ Run"}
              </button>
            )}
            <button className="btn" disabled={!answerText.trim() || running} onClick={submitAnswer}>
              {running ? "Running…" : "Submit"}
            </button>
          </div>

          {isCodeTopic && (
            <div style={{ marginTop: 12 }}>
              <p className="section-tag" style={{ marginBottom: 8 }}>
                {isLive ? "Output" : "Expected output"}
              </p>
              <pre className="forge-terminal">
                {isLive
                  ? running
                    ? "Running…"
                    : codeOutput
                    ? [codeOutput.output, codeOutput.error ? `Error: ${codeOutput.error}` : ""]
                        .filter(Boolean)
                        .join("\n") || "(no output)"
                    : "Click Run or Submit to execute your code."
                  : example.expected_output || "(no preview authored)"}
              </pre>
              {!isLive && isExpert && (
                <p className="stat-line" style={{ marginTop: 6, color: "var(--muted)" }}>
                  {TAURI_LIVE_LANGS.includes(lang) && !tauriReady
                    ? `${tier.language_tracks[lang]?.name || "This language"} compiles for real, but only inside the Codex Infinium desktop app — this is an authored preview of what the worked solution prints, not a live result.`
                    : `${tier.language_tracks[lang]?.name || "This language"} can't run live in the browser — this is an authored preview of what the worked solution prints, not a live result.`}
                </p>
              )}
            </div>
          )}

          {gradeResult && (
            <p className={`stat-line forge-grade-${gradeResult.tier}`} style={{ marginTop: 8 }}>
              {gradeResult.label}
            </p>
          )}
          {!gradeResult && alreadyCompleted && (
            <p className="stat-line" style={{ marginTop: 8, color: "var(--muted)" }}>
              Already recorded — you can resubmit to re-check your answer, but it won't earn more XP.
            </p>
          )}
        </div>

        {answerRequiredForSolution && !solutionRevealed && (
          <p className="stat-line" style={{ marginTop: 14, color: "var(--muted)" }}>
            Submit an answer above to reveal the worked solution.
          </p>
        )}

        {solutionRevealed && (
          <div style={{ marginTop: 22 }}>
            <p className="section-tag" style={{ marginBottom: 8 }}>
              Worked Solution
            </p>
            {example.steps.map((step, i) => (
              <p key={i} style={{ lineHeight: 1.6, marginBottom: 10 }}>
                <strong style={{ color: "var(--gold)" }}>{i + 1}.</strong> {step}
              </p>
            ))}
            {isCodeTopic && example.solution_code && (
              <pre className="forge-terminal forge-solution-code">{example.solution_code}</pre>
            )}
            <div className="banner" style={{ marginTop: 12 }}>
              {example.solution_summary}
            </div>
          </div>
        )}
      </div>

      <div className="btn-row" style={{ marginTop: 16, justifyContent: "center" }}>
        <button className="btn" disabled={index === 0} onClick={() => goTo(index - 1)}>
          ‹ Previous
        </button>
        <button className="btn" disabled={index === examples.length - 1} onClick={() => goTo(index + 1)}>
          Next ›
        </button>
      </div>

      {referenceOpen && referenceAllowed && (
        <ForgeReferencePane topic={topic} tier={tier} tierId={tierId} onClose={() => setReferenceOpen(false)} />
      )}

      {onboardingLoaded && !hasSeenMode("forge") && (
        <Walkthrough steps={FORGE_INTRO_STEPS} onDone={() => markModeSeen("forge")} />
      )}
    </div>
  );
}
