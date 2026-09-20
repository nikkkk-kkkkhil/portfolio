"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Crosshair, Lock, Target } from "lucide-react";
import { ChapterHead, Reveal, Tag } from "../SectionChrome";

const FOCUS = ["FULL-STACK", "DSA", "AI", "SYSTEM DESIGN", "PROJECTS", "HACKATHONS"];

const QUESTS = [
  "ADVANCED SYSTEM DESIGN",
  "CLOUD ARCHITECTURE",
  "OPEN SOURCE",
  "ADVANCED AI",
  "LARGE-SCALE APPLICATIONS",
  "NEXUS v1",
  "NEXUS AI",
  "NEXUS ECOSYSTEM",
];

const BLOCKS = 12;
const FILLED = 8;

export default function FutureMission() {
  const [locked, setLocked] = useState<string | null>(null);

  return (
    <section id="future" className="relative scroll-mt-24 overflow-hidden py-28 md:py-40">
      <div
        className="absolute right-[-10%] bottom-0 h-[40vh] w-[40vw] rounded-full bg-cydeep/10 blur-[130px]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <ChapterHead
          index="CHAPTER 09"
          file="QUEST_BOARD.SYS"
          title={
            <>
              THE STORY <span className="text-outline">CONTINUES.</span>
            </>
          }
        />

        {/* current mission */}
        <Reveal>
          <div className="grid border border-line lg:grid-cols-[1.2fr_0.8fr]">
            <div className="border-b border-line p-7 md:p-10 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-mint" />
                <p className="font-mono text-xs tracking-[0.3em] text-zinc-500">CURRENT MISSION</p>
                <Tag tone="text-mint border-mint/40 bg-mint/5">
                  <span className="h-1.5 w-1.5 animate-blink rounded-full bg-mint" /> ACTIVE
                </Tag>
              </div>
              <h3 className="mt-6 font-sans text-3xl font-bold leading-tight text-zinc-100 md:text-4xl">
                Become an exceptional
                <span className="block">software developer.</span>
              </h3>
              <p className="mt-4 font-mono text-sm leading-7 text-zinc-400">
                <span className="text-zinc-600">SECONDARY OBJECTIVE:</span>{" "}
                <span className="text-viol">Build NEXUS.</span>
              </p>
              <div className="mt-7">
                <p className="font-mono text-[10px] tracking-[0.28em] text-zinc-600">CURRENT FOCUS</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FOCUS.map((f) => (
                    <span
                      key={f}
                      className="border border-line bg-panel/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-zinc-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center bg-panel/40 p-7 md:p-10">
              <p className="font-mono text-[10px] tracking-[0.28em] text-zinc-600">
                JOURNEY PROGRESS
              </p>
              <div className="mt-4 flex gap-1.5" aria-label="Journey progress visualization">
                {Array.from({ length: BLOCKS }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scaleY: 0.3 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    className={`h-8 flex-1 origin-bottom ${
                      i < FILLED
                        ? "bg-gradient-to-t from-cydeep to-cy shadow-[0_0_14px_rgba(103,232,249,0.35)]"
                        : "bg-line2"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 font-mono text-xs tracking-[0.3em] text-zinc-400">
                ████████░░░░ <span className="text-zinc-600">LEVEL 01 — IN PROGRESS</span>
              </p>
              <p className="mt-5 border-l-2 border-amberish/50 pl-4 font-mono text-[10px] leading-5 tracking-[0.16em] text-zinc-500">
                PERSONAL PROGRESS — NOT A PROFESSIONAL CERTIFICATION.
                <br />
                THE BAR MOVES BECAUSE HE DOES.
              </p>
            </div>
          </div>
        </Reveal>

        {/* future quests */}
        <div className="mt-24">
          <Reveal>
            <div className="flex items-center gap-3">
              <Crosshair className="h-5 w-5 text-zinc-500" />
              <h3 className="font-sans text-2xl font-bold text-zinc-100 sm:text-3xl">
                FUTURE QUESTS
              </h3>
            </div>
            <p className="mt-2 font-mono text-[11px] tracking-[0.24em] text-zinc-600">
              LOCKED UNTIL THE STORY REACHES THEM. CLICK TO TRY ANYWAY.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {QUESTS.map((q, i) => (
              <Reveal key={q} delay={0.04 * i}>
                <motion.button
                  onClick={() => setLocked(locked === q ? null : q)}
                  animate={locked === q ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`flex w-full items-center justify-between gap-3 border p-5 text-left transition-colors ${
                    locked === q
                      ? "border-blood/50 bg-blood/5"
                      : "border-line/70 bg-panel/40 hover:border-line2"
                  }`}
                  data-cursor="LOCKED"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] text-zinc-500">
                    {q}
                  </span>
                  <Lock className={`h-4 w-4 shrink-0 ${locked === q ? "text-blood" : "text-zinc-600"}`} />
                </motion.button>
              </Reveal>
            ))}
          </div>

          <AnimatePresence>
            {locked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 border border-blood/40 bg-blood/5 p-5 font-mono text-sm leading-7"
              >
                <p className="text-blood">QUEST LOCKED.</p>
                <p className="text-zinc-400">The story is still being written.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
