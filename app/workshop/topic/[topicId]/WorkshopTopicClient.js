"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import kb from "@/data/knowledge_base.json";
import { useForge, EXPOSURE_LEVELS } from "@/lib/ForgeContext";
import { useOnboarding } from "@/lib/OnboardingContext";
import { useProgress } from "@/lib/ProgressContext";
import { gradeCodeOutput } from "@/lib/gradeCode";
import { runPython } from "@/lib/pyodideRunner";
import { forgeExampleXp } from "@/lib/forgeXp";
import { getWorkshopTopic } from "@/lib/workshop";
import ExposureSelector from "@/components/ExposureSelector";
import ForgeReferencePane from "@/components/ForgeReferencePane";
import Walkthrough from "@/components/Walkthrough";

const WORKSHOP_INTRO_STEPS = [
  {
    title: "The Workshop",
    body: "Four challenge types: Reorder scrambled code into a working program, Fix a broken one, Predict what a snippet prints, or Build code from a spec. All graded by actually running Python.",
  },
  {
    title: "Guided / Challenge / Gauntlet",
    body: "Same difficulty levels as The Forge, and they're shared across both modes — whatever you pick here also applies there. Guided shows the worked solution up front; Challenge and The Gauntlet require a passing (or at least submitted) attempt first.",
  },
  {
    title: "Grading & XP",
    body: "Your code (or, for Predict, the real snippet) actually executes in a sandboxed browser worker, and real output is what gets compared — same engine The Forge's Python examples already use. XP scales with difficulty and how close your answer matched.",
  },
];

function buildInitialOrder(challenge) {
  if (!challenge || challenge.type !== "reorder") return [];
  return challenge.shuffled_lines.map((_, i) => i);
}

export default function WorkshopTopicClient() {
  const { topicId } = useParams();
  const router = useRouter();
  const { exposure, loaded: forgeLoaded } = useForge();
  const { loaded: onboardingLoaded, hasSeenMode, markModeSeen } = useOnboarding();
  const { hasCompletedWorkshopChallenge, markWorkshopChallengeComplete } = useProgress();

  const tier = kb.tiers.find((t) => t.id === "expert");
  const topic = getWorkshopTopic(kb, topicId);
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

  const challenge = challenges[index];
  const isReorder = challenge?.type === "reorder";
  const isFix = challenge?.type === "fix";
  const isOutput = challenge?.type === "output";
  const isBuild = challenge?.type === "build";

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
  }, [index, exposure, topicId]);

  if (!tier) return <p>Unknown tier.</p>;
  if (!topic) return <p>Unknown Workshop topic.</p>;

  if (challenges.length === 0) {
    return (
      <div>
        <h1>{topic.title}</h1>
        <div className="banner banner-dim">No challenges have been forged for this topic yet.</div>
        <button className="btn" style={{ marginTop: 16 }} onClick={() => router.push("/workshop")}>
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

  // Not available for "output" challenges — there's no code of the user's
  // own to run; their answer is a typed prediction, checked only on Submit.
  async function runCode() {
    if (isOutput) return;
    setRunning(true);
    const execResult = await runPython(currentCode());
    setRunning(false);
    setCodeOutput(execResult);
  }

  // Grading always goes through real Pyodide execution and
  // lib/gradeCode.js's gradeCodeOutput() — the same engine The Forge's
  // Python examples use — but what gets executed and what gets compared
  // differs by type:
  //  - reorder/fix/build: run the user's own code, compare its real output
  //    against the authored expected_output.
  //  - output: run the (fixed, unmodified) snippet_code for real instead —
  //    re-verifying it live rather than trusting the authored
  //    expected_output alone — then compare the user's typed prediction
  //    text against that real output, using the exact same comparison
  //    function by wrapping the prediction in an { ok: true, output }
  //    shape gradeCodeOutput already expects.
  async function submitAnswer() {
    setRunning(true);

    if (isOutput) {
      const snippetResult = await runPython(challenge.snippet_code);
      setRunning(false);
      setCodeOutput(snippetResult);
      const actualOutput = snippetResult.ok ? snippetResult.output : challenge.expected_output;
      const result = gradeCodeOutput({ ok: true, output: codeText, error: null }, actualOutput);
      setGradeResult(result);
      setSolutionRevealed(true);
      if (!alreadyCompleted) {
        const xp = forgeExampleXp(exposure, result.tier);
        markWorkshopChallengeComplete(challenge.id, xp, tier.name);
      }
      return;
    }

    const execResult = await runPython(currentCode());
    setRunning(false);
    setCodeOutput(execResult);
    const result = gradeCodeOutput(execResult, challenge.expected_output);
    setGradeResult(result);
    setSolutionRevealed(true);
    if (!alreadyCompleted) {
      const xp = forgeExampleXp(exposure, result.tier);
      markWorkshopChallengeComplete(challenge.id, xp, tier.name);
    }
  }

  return (
    <div>
      <div className="study-toolbar">
        <button className="btn" onClick={() => router.push("/workshop")}>
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
            {!isOutput && (
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
              {isOutput ? "Actual output (revealed after Submit)" : "Output"}
            </p>
            <pre className="forge-terminal">
              {running
                ? "Running…"
                : codeOutput
                ? [codeOutput.output, codeOutput.error ? `Error: ${codeOutput.error}` : ""]
                    .filter(Boolean)
                    .join("\n") || "(no output)"
                : isOutput
                ? "Submit your prediction to reveal the real output."
                : "Click Run or Submit to execute your code."}
            </pre>
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
        <ForgeReferencePane topic={topic} tier={tier} tierId="expert" onClose={() => setReferenceOpen(false)} />
      )}

      {onboardingLoaded && !hasSeenMode("workshop") && (
        <Walkthrough steps={WORKSHOP_INTRO_STEPS} onDone={() => markModeSeen("workshop")} />
      )}
    </div>
  );
}
