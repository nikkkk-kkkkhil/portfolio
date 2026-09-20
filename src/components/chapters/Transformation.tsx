"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";
import { ChapterHead, Reveal, Tag } from "../SectionChrome";

const STAGES = [
  "ALONE",
  "CURIOUS",
  "BEGINNER",
  "LEARNING",
  "FAILING",
  "DEBUGGING",
  "BUILDING",
  "CREATING",
  "FULL-STACK DEVELOPER",
  "THE MASKED MAN",
];

const LEVELS = [
  { lv: "01", name: "THE BEGINNER", desc: "Learning programming.", xp: 18 },
  { lv: "02", name: "THE BUILDER", desc: "Creating small applications.", xp: 34 },
  { lv: "03", name: "THE DEVELOPER", desc: "Learning frontend and backend development.", xp: 52 },
  { lv: "04", name: "THE ARCHITECT", desc: "Understanding systems, APIs and databases.", xp: 68 },
  { lv: "05", name: "THE CREATOR", desc: "Building complete products.", xp: 84 },
];

export default function Transformation() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.72", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="grid-bg-far absolute inset-0 opacity-50" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <ChapterHead
          index="CHAPTER 04"
          file="EVOLUTION.TREE"
          title="THE TRANSFORMATION."
          sub="Ten stages. No shortcuts. Every stage earned, none skipped."
        />

        {/* timeline */}
        <div ref={lineRef} className="relative mx-auto max-w-3xl py-6">
          <div
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-line md:left-1/2"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-cy/70 via-cy to-viol md:left-1/2"
          />
          {STAGES.map((s, i) => {
            const last = i === STAGES.length - 1;
            const leftSide = i % 2 === 0;
            return (
              <motion.div
                key={s}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-18% 0px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`relative mb-8 flex items-center gap-5 pl-12 md:grid md:grid-cols-[1fr_auto_1fr] md:pl-0 ${
                  last ? "md:mb-0" : ""
                }`}
              >
                <div
                  className={`hidden md:block ${leftSide ? "text-right" : ""}`}
                >
                  {leftSide && (
                    <span
                      className={`font-mono tracking-[0.24em] ${
                        last
                          ? "text-glow-cy text-xl text-cy"
                          : i === STAGES.length - 2
                            ? "text-lg text-zinc-100"
                            : "text-sm text-zinc-400"
                      }`}
                    >
                      {s}
                    </span>
                  )}
                </div>
                <span
                  aria-hidden
                  className={`absolute left-4 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 md:static md:translate-x-0 md:translate-y-0 md:justify-self-center ${
                    last
                      ? "h-5 w-5 border-cy bg-cy/30 shadow-[0_0_24px_rgba(103,232,249,0.7)]"
                      : "border-cy/50 bg-void"
                  }`}
                />
                <div className="md:block">
                  {!leftSide && (
                    <span
                      className={`hidden font-mono tracking-[0.24em] md:inline ${
                        last
                          ? "text-glow-cy text-xl text-cy"
                          : i === STAGES.length - 2
                            ? "text-lg text-zinc-100"
                            : "text-sm text-zinc-400"
                      }`}
                    >
                      {s}
                    </span>
                  )}
                </div>
                {/* mobile label */}
                <span
                  className={`font-mono tracking-[0.22em] md:hidden ${
                    last ? "text-cy" : "text-sm text-zinc-400"
                  }`}
                >
                  {s}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* evolution cards */}
        <div className="mt-28">
          <Reveal>
            <div className="mb-10 flex items-center gap-4">
              <h3 className="font-sans text-2xl font-bold text-zinc-100 sm:text-3xl">
                CHARACTER EVOLUTION
              </h3>
              <Tag tone="text-viol border-viol/30 bg-viol/5">
                <Sparkles className="h-3 w-3" /> RPG MODE
              </Tag>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEVELS.map((l, i) => (
              <Reveal key={l.lv} delay={0.06 * i}>
                <div className="group relative h-full border border-line bg-panel/60 p-5 transition-colors duration-300 hover:border-cy/40">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-600">
                      LEVEL {l.lv}
                    </span>
                    <Shield className="h-4 w-4 text-zinc-700 transition-colors group-hover:text-cy/70" />
                  </div>
                  <p className="mt-3 font-sans text-xl font-bold text-zinc-200">
                    {l.name}
                  </p>
                  <p className="mt-1.5 text-sm text-zinc-500">{l.desc}</p>
                  <div className="mt-5">
                    <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] text-zinc-600">
                      <span>XP</span>
                      <span>{l.xp}%</span>
                    </div>
                    <div className="mt-1.5 h-1 w-full bg-line">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.xp}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gradient-to-r from-cydeep to-cy"
                      />
                    </div>
                  </div>
                  <p className="mt-4 font-mono text-[10px] tracking-[0.24em] text-mint">
                    ✓ CLEARED
                  </p>
                </div>
              </Reveal>
            ))}

            {/* current level */}
            <Reveal delay={0.3} className="sm:col-span-2 lg:col-span-1">
              <div className="relative h-full border border-cy/40 bg-gradient-to-br from-cy/10 via-panel to-panel p-5 panel-glow">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-cy">
                    CURRENT LEVEL
                  </span>
                  <span className="h-2 w-2 animate-blink rounded-full bg-cy" />
                </div>
                <p className="text-glow-cy mt-3 font-sans text-xl font-bold text-cy">
                  THE MASKED MAN
                </p>
                <p className="mt-1.5 text-sm text-zinc-400">
                  Full-stack developer. Dreaming in systems.
                </p>
                <div className="mt-5">
                  <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] text-zinc-500">
                    <span>XP</span>
                    <span className="text-cy">∞</span>
                  </div>
                  <div className="relative mt-1.5 h-1 w-full overflow-hidden bg-line">
                    <div className="shimmer-text absolute inset-0" aria-hidden />
                    <div className="h-full w-2/3 animate-shimmer bg-gradient-to-r from-transparent via-cy to-transparent bg-[length:200%_100%]" />
                  </div>
                </div>
                <p className="mt-4 font-mono text-[10px] tracking-[0.24em] text-amberish">
                  ▸ STATUS: STILL LEVELING UP.
                </p>
                <p className="mt-2 font-mono text-[10px] leading-5 tracking-[0.14em] text-zinc-600">
                  Development is continuous learning. There is no final level.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
