"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useExperience } from "./ExperienceProvider";
import Mask from "./Mask";

interface BootLine {
  t: string;
  result?: string;
  tone?: "red" | "cy";
}

const LINES: BootLine[] = [
  { t: "INITIALIZING..." },
  { t: "IDENTITY SEARCH...", result: "FAILED.", tone: "red" },
  { t: "FACIAL IDENTIFICATION...", result: "DENIED.", tone: "red" },
  { t: "SUBJECT REFUSES FACIAL IDENTIFICATION." },
  { t: "MASK DETECTED.", tone: "cy" },
  { t: "ACCESSING MEMORY..." },
];

export default function Boot() {
  const { enter } = useExperience();
  const [lineIdx, setLineIdx] = useState(0);
  const [chars, setChars] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [doneLines, setDoneLines] = useState<BootLine[]>([]);
  const [stage, setStage] = useState(0); // 0 typing · 1 file · 2 figure · 3 title · 4 tag · 5 ready
  const [leaving, setLeaving] = useState(false);

  // typewriter
  useEffect(() => {
    if (lineIdx >= LINES.length) {
      const t = setTimeout(() => setStage((s) => (s >= 1 ? s : 1)), 650);
      return () => clearTimeout(t);
    }
    const line = LINES[lineIdx];
    if (chars < line.t.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 14 + Math.random() * 22);
      return () => clearTimeout(t);
    }
    if (line.result && !showResult) {
      const t = setTimeout(() => setShowResult(true), 420);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDoneLines((d) => [...d, line]);
      setLineIdx((i) => i + 1);
      setChars(0);
      setShowResult(false);
    }, 480);
    return () => clearTimeout(t);
  }, [lineIdx, chars, showResult]);

  // staged reveals after typing
  useEffect(() => {
    if (stage === 0 || stage >= 5) return;
    const t = setTimeout(
      () => setStage((s) => s + 1),
      stage === 1 ? 1300 : stage === 2 ? 1400 : stage === 3 ? 1100 : 900,
    );
    return () => clearTimeout(t);
  }, [stage]);

  const skip = () => {
    setDoneLines(LINES);
    setLineIdx(LINES.length);
    setStage(5);
  };

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
    window.scrollTo({ top: 0, behavior: "auto" });
    setTimeout(enter, 900);
  };

  const typing = lineIdx < LINES.length;

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex flex-col bg-void"
      animate={leaving ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: leaving ? "none" : "auto" }}
      aria-label="Boot sequence"
    >
      <div className="grid-bg-far absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 font-mono text-[10px] tracking-[0.3em] text-zinc-600">
        <span>TMM://BIOS v1.0</span>
        <span className="hidden sm:block">MEMORY: ENCRYPTED</span>
        <span>FACE: RESTRICTED</span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6">
        {/* terminal lines */}
        <div className="min-h-[11rem] font-mono text-sm leading-8 sm:text-base">
          {doneLines.map((l, i) => (
            <p key={i} className="text-zinc-500">
              <span className="mr-3 text-zinc-700">&gt;</span>
              {l.t}
              {l.result && (
                <span className={l.tone === "red" ? "ml-3 text-blood" : "ml-3 text-cy"}>
                  {l.result}
                </span>
              )}
            </p>
          ))}
          {typing && (
            <p className="text-zinc-300">
              <span className="mr-3 text-zinc-700">&gt;</span>
              {LINES[lineIdx].t.slice(0, chars)}
              {!showResult && <span className="caret" />}
              {showResult && LINES[lineIdx].result && (
                <span
                  className={
                    LINES[lineIdx].tone === "red"
                      ? "ml-3 text-blood"
                      : "ml-3 text-cy"
                  }
                >
                  {LINES[lineIdx].result}
                </span>
              )}
            </p>
          )}
        </div>

        {/* memory file */}
        <motion.div
          initial={false}
          animate={stage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          className="mt-10 w-fit border border-line bg-panel/70 px-6 py-4 font-mono text-xs leading-6 tracking-[0.18em] text-zinc-400"
        >
          <p>
            <span className="text-zinc-600">FILE</span> MEMORY_001.MEM
          </p>
          <p>
            <span className="text-zinc-600">STATUS</span>{" "}
            <span className="text-amberish">CLASSIFIED</span>
          </p>
          <p>
            <span className="text-zinc-600">SUBJECT</span>{" "}
            <span className="text-cy">UNKNOWN // MASKED</span>
          </p>
        </motion.div>

        {/* figure */}
        <motion.div
          initial={false}
          animate={stage >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-0 top-1/2 hidden w-72 -translate-y-1/2 md:block lg:w-96"
        >
          <Mask variant="shadow" scan={false} className="mx-auto w-4/5" />
        </motion.div>

        {/* title */}
        <div className="mt-12">
          {stage >= 3 && (
            <h1 className="font-sans text-5xl font-bold leading-[0.95] tracking-tight text-zinc-100 sm:text-7xl">
              {"THE MASKED MAN".split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.045, duration: 0.5 }}
                  className={i < 4 ? "text-zinc-100" : "text-glow-cy text-cy"}
                >
                  {ch}
                </motion.span>
              ))}
            </h1>
          )}
          <motion.div
            initial={false}
            animate={stage >= 4 ? { opacity: 1 } : { opacity: 0 }}
            className="mt-6 space-y-1 font-mono text-sm leading-7 text-zinc-500"
          >
            <p>Nobody knew his name.</p>
            <p>Nobody asked about his dreams.</p>
            <p className="text-zinc-300">So he started building them.</p>
          </motion.div>

          <motion.div
            initial={false}
            animate={stage >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            className="mt-12"
          >
            <button
              onClick={handleEnter}
              data-cursor="ENTER"
              className="group relative border border-cy/50 bg-cy/5 px-8 py-4 font-mono text-sm tracking-[0.35em] text-cy transition-all hover:bg-cy/15 hover:shadow-[0_0_40px_-8px_rgba(103,232,249,0.5)]"
            >
              [ ENTER HIS WORLD ]
              <span className="absolute -bottom-6 left-0 font-mono text-[10px] tracking-[0.25em] text-zinc-600 transition-colors group-hover:text-zinc-400">
                LEVEL 01 — PRESS TO CONTINUE
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* footer */}
      <div className="relative z-10 flex items-center justify-between p-5 font-mono text-[10px] tracking-[0.3em] text-zinc-600">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-cy" />
          AWAITING INPUT
        </span>
        {stage < 5 && (
          <button
            onClick={skip}
            className="border border-line px-3 py-1.5 text-zinc-500 transition-colors hover:border-line2 hover:text-zinc-300"
          >
            SKIP SEQUENCE ▸▸
          </button>
        )}
      </div>
    </motion.div>
  );
}
