"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import kb from "@/data/knowledge_base.json";
import { useForge, EXPOSURE_LEVELS } from "@/lib/ForgeContext";
import { useOnboarding } from "@/lib/OnboardingContext";
import { useProgress } from "@/lib/ProgressContext";
import { gradeCodeOutput } from "@/lib/gradeCode";
import { gradeAnswer } from "@/lib/grading";
import { runPython } from "@/lib/pyodideRunner";
import { runJavaScript } from "@/lib/codeExec";
import { runCpp, isTauriRuntime } from "@/lib/cppRunner";
import { runJava } from "@/lib/javaRunner";
import { runCsharp } from "@/lib/csharpRunner";
import { forgeExampleXp } from "@/lib/forgeXp";
import { getWorkshopTopic, getWorkshopTopicTierId } from "@/lib/workshop";
import ExposureSelector from "@/components/ExposureSelector";
import ForgeReferencePane from "@/components/ForgeReferencePane";
import Walkthrough from "@/components/Walkthrough";

// Same split Forge B uses: Python/JS run for real in any browser; C++,
// Java, and C# only run for real inside the Tauri desktop shell (via their
// respective bundled toolchains) — a plain browser tab has no
// compiler/JDK/SDK to shell out to.
const BROWSER_LIVE_LANGS = ["python", "javascript"];
const TAURI_LIVE_LANGS = ["cpp", "java", "csharp"];

const WORKSHOP_INTRO_STEPS = [
  {
    title: "The Workshop",
    body: "Four challenge types: Reorder scrambled code into a working program, Fix a broken one, Predict what a snippet prints, or Build code from a spec.",
  },
  {
    title: "Guided / Challenge / Gauntlet",
    body: "Same difficulty levels as The Forge, and they're shared across both modes — whatever you pick here also applies there. Guided shows the worked solution up front; Challenge and The Gauntlet require a passing (or at least submitted) attempt first.",
  },
  {
    title: "Grading & XP",
    body: "Python and JavaScript run for real everywhere; C++, Java, and C# run for real too, but only inside the desktop app — on the web, those three fall back to the same offline pattern-matching grading The Forge uses for prose. XP scales with difficulty and how close your answer matched.",
  },
];

function buildInitialOrder(challenge) {
  if (!challenge || challenge.type !== "reorder") return [];
  return challenge.shuffled_lines.map((_, i) => i);
}

export default function WorkshopTopicClient() {
  const { topicId } = useParams();
  const searchParams = useSearchParams();
  // A `lang` param means this is an Expert-track topic; its absence means a
  // flat pre-Expert tier topic, which is Python-only — `lang` below still
  // ends up "python" either way, since that's the only language execute()
  // ever needs to run for a pre-Expert challenge.
  const langParam = searchParams.get("lang");
  const isExpert = !!langParam;
  const lang = langParam || "python";
  const resolvedTierId = isExpert ? "expert" : getWorkshopTopicTierId(kb, topicId);
  const router = useRouter();
  const { exposure, loaded: forgeLoaded } = useForge();
  const { loaded: onboardingLoaded, hasSeenMode, markModeSeen } = useOnboarding();
  const { hasCompletedWorkshopChallenge, markWorkshopChallengeComplete } = useProgress();

  const tier = kb.tiers.find((t) => t.id === resolvedTierId);
  const topic = isExpert ? getWorkshopTopic(kb, topicId, lang) : getWorkshopTopic(kb, topicId);
  const challenges = topic?.workshop_challenges || [];

  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState([]);
  const [codeText, setCodeText] = useState("");
  const [revealedHints, setRevealedHints] = useState([]);
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const [gradeResult, setGradeResult] = useState(null);
  const [codeOutput, setCodeOutput] = useState(null);
  const [running, setRunning] = useState(false);
  // Starts false to match the static-export/SSR render, then flips true
  // post-mount if actually running inside the desktop shell — same pattern
  // as ForgeTopicClient, avoiding a hydration mismatch from branching on
  // `window` during the initial render.
  const [tauriReady, setTauriReady] = useState(false);
  useEffect(() => {
    setTauriReady(isTauriRuntime());
  }, []);

  const challenge = challenges[index];
  const isReorder = challenge?.type === "reorder";
  const isFix = challenge?.type === "fix";
  const isOutput = challenge?.type === "output";
  const isBuild = challenge?.type === "build";
  const isLive = BROWSER_LIVE_LANGS.includes(lang) || (tauriReady && TAURI_LIVE_LANGS.includes(lang));

  async function execute(code) {
    if (lang === "python") return runPython(code);
    if (lang === "javascript") return runJavaScript(code);
    if (lang === "cpp") return runCpp(code);
    if (lang === "java") return runJava(code);
    if (lang === "csharp") return runCsharp(code);
    return runJavaScript(code);
  }

  useEffect(() => {
    const alreadyDone = challenge ? hasCompletedWorkshopChallenge(challenge.id) : false;
    setRevealedHints([]);
    setSolutionRevealed(exposure === "guided" || alreadyDone);
    setReferenceOpen(exposure === "guided");
    setOrder(buildInitialOrder(challenge));
    // codeText doubles as "code to execute" for fix/build and "typed
    // prediction" for output — the two never overlap on the same challenge.
    setCodeText(isFix ? challenge?.buggy_code || "" : isBuild ? challenge?.starter_code || "" : "");
    setGradeResult(null);
    setCodeOutput(null);
    setRunning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, exposure, topicId, lang]);

  if (!tier) return <p>Unknown tier.</p>;
  if (!topic) return <p>Unknown Workshop topic.</p>;

  if (challenges.length === 0) {
    return (
      <div>
        <h1>{topic.title}</h1>
        <div className="banner banner-dim">No challenges have been forged for this topic yet.</div>
        <button
          className="btn"
          style={{ marginTop: 16 }}
          onClick={() => router.push(isExpert ? `/workshop?lang=${lang}` : `/workshop?tier=${resolvedTierId}`)}
        >
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
  const alreadyCompleted = hasCompletedWorkshopChallenge(challenge.id);

  function goTo(newIndex) {
    if (newIndex < 0 || newIndex >= challenges.length) return;
    setIndex(newIndex);
  }

  function revealHint(i) {
    setRevealedHints((prev) => (prev.includes(i) ? prev : [...prev, i]));
  }

  function moveLine(pos, dir) {
    const target = pos + dir;
    if (target < 0 || target >= order.length) return;
    setOrder((prev) => {
      const next = [...prev];
      [next[pos], next[target]] = [next[target], next[pos]];
      return next;
    });
  }

  function currentCode() {
    if (isReorder) return order.map((i) => challenge.shuffled_lines[i]).join("\n\n");
    return codeText;
  }

  // Not available for "output" challenges (nothing of the learner's own to
  // run) or when the current language isn't live right now (e.g. C++ in a
  // plain browser tab) — Run is only ever a live-execution preview.
  async function runCode() {
    if (isOutput || !isLive) return;
    setRunning(true);
    const execResult = await execute(currentCode());
    setRunning(false);
    setCodeOutput(execResult);
  }

  // Grading dispatch has two axes: challenge type, and whether this
  // language is currently live.
  //  - reorder/fix/build, live: run the learner's own code for real via
  //    execute(), compare against expected_output with gradeCodeOutput —
  //    unchanged from Workshop A/B.
  //  - reorder/fix/build, not live (C++ outside Tauri): can't execute
  //    anything, so fall back to lib/grading.js's gradeAnswer() — the same
  //    offline concept-coverage/answer-bank engine Forge A2 built and Forge
  //    B already reuses for non-live Java/C#/C++ examples — applied to the
  //    learner's code text instead of prose.
  //  - output, live: execute the fixed snippet_code for real, compare the
  //    typed prediction against that live result.
  //  - output, not live: skip execution entirely and compare the typed
  //    prediction directly against the authored expected_output — there's
  //    nothing to run, so the authored value is the only "actual" output
  //    available.
  async function submitAnswer() {
    setRunning(true);

    if (isOutput) {
      const actualResult = isLive
        ? await execute(challenge.snippet_code)
        : { ok: true, output: challenge.expected_output, error: null };
      setRunning(false);
      setCodeOutput(actualResult);
      const actualOutput = actualResult.ok ? actualResult.output : challenge.expected_output;
      const result = gradeCodeOutput({ ok: true, output: codeText, error: null }, actualOutput);
      setGradeResult(result);
      setSolutionRevealed(true);
      if (!alreadyCompleted) {
        const xp = forgeExampleXp(exposure, result.tier);
        markWorkshopChallengeComplete(challenge.id, xp, tier.name);
      }
      return;
    }

    if (isLive) {
      const execResult = await execute(currentCode());
      setRunning(false);
      setCodeOutput(execResult);
      const result = gradeCodeOutput(execResult, challenge.expected_output);
      setGradeResult(result);
      setSolutionRevealed(true);
      if (!alreadyCompleted) {
        const xp = forgeExampleXp(exposure, result.tier);
        markWorkshopChallengeComplete(challenge.id, xp, tier.name);
      }
      return;
    }

    setRunning(false);
    const result = gradeAnswer(currentCode(), challenge);
    setGradeResult(result);
    setSolutionRevealed(true);
    if (!alreadyCompleted) {
      const xp = forgeExampleXp(exposure, result.tier);
      markWorkshopChallengeComplete(challenge.id, xp, tier.name);
    }
  }

  const outputPanelLabel = isOutput ? "Actual output (revealed after Submit)" : "Output";
  const outputPanelText = running
    ? "Running…"
    : codeOutput
    ? [codeOutput.output, codeOutput.error ? `Error: ${codeOutput.error}` : ""].filter(Boolean).join("\n") ||
      "(no output)"
    : isOutput
    ? "Submit your prediction to reveal the real output."
    : isLive
    ? "Click Run or Submit to execute your code."
    : `${tier.language_tracks?.[lang]?.name || "This language"} compiles for real, but only inside the Codex Infinium desktop app — on the web, Submit is graded offline instead of executed.`;

  return (
    <div>
      <div className="study-toolbar">
        <button
          className="btn"
          onClick={() => router.push(isExpert ? `/workshop?lang=${lang}` : `/workshop?tier=${resolvedTierId}`)}
        >
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
          Challenge {index + 1} / {challenges.length} —{" "}
          {isReorder ? "🧩 Reorder" : isFix ? "🛠️ Fix" : isOutput ? "🔮 Predict Output" : "🏗️ Build to Spec"}
        </p>

        <p style={{ fontSize: 17, lineHeight: 1.6 }}>{challenge.prompt}</p>

        {showHints && challenge.hints?.length > 0 && (
          <div style={{ marginTop: 18 }}>
            <p className="section-tag" style={{ marginBottom: 8 }}>
              Hints
            </p>
            {challenge.hints.map((hint, i) => {
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
          {isOutput && (
            <>
              <p className="section-tag" style={{ marginBottom: 8 }}>
                The Code
              </p>
              <pre className="forge-terminal forge-code-box" style={{ marginBottom: 12 }}>
                {challenge.snippet_code}
              </pre>
            </>
          )}

          <p className="section-tag" style={{ marginBottom: 8 }}>
            {isReorder
              ? "Reorder these blocks"
              : isFix
              ? "Fix this code"
              : isOutput
              ? "What will this print?"
              : "Write your code"}
          </p>

          {isReorder ? (
            <div className="workshop-reorder-list">
              {order.map((lineIdx, pos) => (
                <div key={lineIdx} className="workshop-reorder-block">
                  <div className="workshop-reorder-controls">
                    <button className="btn" disabled={pos === 0} onClick={() => moveLine(pos, -1)}>
                      ▲
                    </button>
                    <button className="btn" disabled={pos === order.length - 1} onClick={() => moveLine(pos, 1)}>
                      ▼
                    </button>
                  </div>
                  <pre className="forge-terminal forge-code-box" style={{ margin: 0, flex: 1 }}>
                    {challenge.shuffled_lines[lineIdx]}
                  </pre>
                </div>
              ))}
            </div>
          ) : (
            <textarea
              className={isOutput ? "forge-answer-box" : "forge-answer-box forge-code-box"}
              rows={isOutput ? 4 : 10}
              spellCheck={false}
              value={codeText}
              onChange={(e) => setCodeText(e.target.value)}
              placeholder={isOutput ? "Type exactly what you think the code above prints…" : undefined}
            />
          )}

          <div className="btn-row" style={{ marginTop: 8 }}>
            {!isOutput && isLive && (
              <button className="btn" disabled={running} onClick={runCode}>
                {running ? "Running…" : "▶ Run"}
              </button>
            )}
            <button className="btn" disabled={running} onClick={submitAnswer}>
              {running ? "Running…" : "Submit"}
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <p className="section-tag" style={{ marginBottom: 8 }}>
              {outputPanelLabel}
            </p>
            <pre className="forge-terminal">{outputPanelText}</pre>
          </div>

          {gradeResult && (
            <p className={`stat-line forge-grade-${gradeResult.tier}`} style={{ marginTop: 8 }}>
              {gradeResult.label}
            </p>
          )}
          {!gradeResult && alreadyCompleted && (
            <p className="stat-line" style={{ marginTop: 8, color: "var(--muted)" }}>
              Already recorded — you can resubmit to re-check your work, but it won't earn more XP.
            </p>
          )}
        </div>

        {answerRequiredForSolution && !solutionRevealed && (
          <p className="stat-line" style={{ marginTop: 14, color: "var(--muted)" }}>
            Submit an attempt above to reveal the worked solution.
          </p>
        )}

        {solutionRevealed && (
          <div style={{ marginTop: 22 }}>
            <p className="section-tag" style={{ marginBottom: 8 }}>
              Worked Solution
            </p>
            <pre className="forge-terminal forge-solution-code">{challenge.solution_code}</pre>
            <div className="banner" style={{ marginTop: 12 }}>
              {challenge.solution_summary}
            </div>
          </div>
        )}
      </div>

      <div className="btn-row" style={{ marginTop: 16, justifyContent: "center" }}>
        <button className="btn" disabled={index === 0} onClick={() => goTo(index - 1)}>
          ‹ Previous
        </button>
        <button className="btn" disabled={index === challenges.length - 1} onClick={() => goTo(index + 1)}>
          Next ›
        </button>
      </div>

      {referenceOpen && referenceAllowed && (
        <ForgeReferencePane topic={topic} tier={tier} tierId={resolvedTierId} onClose={() => setReferenceOpen(false)} />
      )}

      {onboardingLoaded && !hasSeenMode("workshop") && (
        <Walkthrough steps={WORKSHOP_INTRO_STEPS} onDone={() => markModeSeen("workshop")} />
      )}
    </div>
  );
}
