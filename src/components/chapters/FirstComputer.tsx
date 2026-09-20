"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { ChapterHead, Reveal, MonoLabel } from "../SectionChrome";

interface ScriptItem {
  kind: "cmd" | "dim" | "code" | "run" | "err" | "retry" | "ok";
  text: string;
}

const SCRIPT: ScriptItem[] = [
  { kind: "cmd", text: "./first_contact" },
  { kind: "dim", text: "loading blank editor ..." },
  { kind: "code", text: 'print("HELLO WORLD")' },
  { kind: "run", text: "RUN ▸" },
  { kind: "err", text: "ERROR." },
  { kind: "retry", text: "TRY AGAIN." },
  { kind: "dim", text: "[ key pressed ]" },
  { kind: "err", text: "ERROR." },
  { kind: "retry", text: "TRY AGAIN." },
  { kind: "dim", text: "[ key pressed ]" },
  { kind: "ok", text: "SUCCESS." },
];

const PARAS = [
  "One day, he discovered something different.",
  "A computer. A programming language. A blank editor. And an error message.",
  "For the first time, something was challenging him without judging him.",
  "The computer didn't care who he was. It only cared whether the code worked.",
];

function LineView({ item, typed, active }: { item: ScriptItem; typed?: string; active: boolean }) {
  const text = item.kind === "code" && active ? (typed ?? "") : item.text;
  const cls =
    item.kind === "err"
      ? "text-blood text-lg tracking-[0.2em]"
      : item.kind === "retry"
        ? "text-amberish tracking-[0.2em]"
        : item.kind === "ok"
          ? "text-mint text-2xl tracking-[0.25em] text-glow-cy"
          : item.kind === "run"
            ? "text-zinc-200"
            : item.kind === "dim"
              ? "text-zinc-600"
              : item.kind === "cmd"
                ? "text-cy"
                : "text-zinc-300";
  return (
    <p className={`font-mono ${cls}`}>
      {item.kind === "cmd" && <span className="mr-2 text-zinc-600">$</span>}
      {text}
      {active && item.kind === "code" && <span className="caret" />}
    </p>
  );
}

export default function FirstComputer() {
  const secRef = useRef<HTMLDivElement>(null);
  const inView = useInView(secRef, { once: true, margin: "-30% 0px" });
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const done = step >= SCRIPT.length;

  useEffect(() => {
    if (!inView || done) return;
    const item = SCRIPT[step];
    if (item.kind === "code") {
      if (typed < item.text.length) {
        const t = setTimeout(() => setTyped((c) => c + 1), 55);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setStep((s) => s + 1), 500);
      return () => clearTimeout(t);
    }
    const delay =
      item.kind === "err" ? 900 : item.kind === "retry" ? 800 : item.kind === "ok" ? 700 : 550;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [inView, step, typed, done]);

  const replay = () => {
    setStep(0);
    setTyped(0);
  };

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04101a]/40 to-transparent"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5" ref={secRef}>
        <ChapterHead
          index="CHAPTER 02"
          file="FIRST_CONTACT.LOG"
          title={
            <>
              THEN HE FOUND <span className="text-glow-cy text-cy">CODE.</span>
            </>
          }
        />

        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div className="space-y-7">
            {PARAS.map((p, i) => (
              <Reveal key={i} delay={0.06 * i}>
                <p className="text-lg leading-relaxed text-zinc-400 sm:text-xl">
                  {i === 3 ? (
                    <>
                      The computer didn&apos;t care who he was.{" "}
                      <span className="text-zinc-100">
                        It only cared whether the code worked.
                      </span>
                    </>
                  ) : (
                    p
                  )}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="border-l-2 border-cy/40 bg-cy/5 p-5 font-mono text-xs leading-6 text-zinc-400">
                <p className="text-cy">OBSERVATION —</p>
                <p className="mt-1">
                  A broken program didn&apos;t laugh at him. An error didn&apos;t judge
                  him. A compiler didn&apos;t care about his appearance. It simply said:{" "}
                  <span className="text-zinc-100">try again.</span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* monitor */}
          <Reveal delay={0.15}>
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-2xl bg-cy/5 blur-2xl"
                aria-hidden
              />
              <div className="relative rounded-t-xl border border-line2 bg-panel2 p-2">
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blood/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amberish/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
                  <span className="ml-3 font-mono text-[10px] tracking-[0.25em] text-zinc-600">
                    FIRST_EDITOR.EXE
                  </span>
                  {done && (
                    <button
                      onClick={replay}
                      className="ml-auto flex items-center gap-1.5 border border-line px-2 py-1 font-mono text-[10px] tracking-[0.2em] text-zinc-500 transition-colors hover:border-cy/40 hover:text-cy"
                      aria-label="Replay sequence"
                    >
                      <RotateCcw className="h-3 w-3" /> REPLAY
                    </button>
                  )}
                </div>
                <div className="min-h-[19rem] rounded-b-lg border-t border-line bg-black/70 p-5 text-sm leading-8 sm:min-h-[21rem]">
                  {SCRIPT.slice(0, Math.min(step + 1, SCRIPT.length)).map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <LineView
                        item={item}
                        active={i === step && !done}
                        typed={SCRIPT[step]?.kind === "code" ? SCRIPT[step].text.slice(0, typed) : undefined}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="mx-auto h-8 w-24 border-x border-b border-line2 bg-panel" aria-hidden />
              <div className="mx-auto h-2 w-48 border border-line2 bg-panel2" aria-hidden />
            </div>
          </Reveal>
        </div>

        {/* the beginning */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={done ? { opacity: 1, letterSpacing: "0.06em" } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 text-center font-sans text-3xl font-bold text-zinc-100 sm:text-5xl md:text-6xl"
        >
          THAT WAS <span className="text-glow-cy text-cy">THE BEGINNING.</span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center"
        >
          <MonoLabel>again. and again. and again.</MonoLabel>
        </motion.div>
      </div>
    </section>
  );
}
