"use client";

import { motion } from "framer-motion";
import { Hexagon, LogIn } from "lucide-react";
import { ChapterHead, Reveal, Tag } from "../SectionChrome";
import { useExperience } from "../ExperienceProvider";

const MODULES = [
  "AI ASSISTANT",
  "PRODUCTIVITY",
  "LEARNING",
  "CODING",
  "PROJECT MGMT",
  "NOTES",
  "CALENDAR",
  "TASK MGMT",
  "COMMUNICATION",
  "FILES",
  "ANALYTICS",
  "AUTOMATION",
  "DEVELOPER TOOLS",
];

const WHY = [
  "He spent years feeling disconnected from the world.",
  "So he imagined building a digital world that connected everything he needed.",
  "A place to learn. A place to build. A place to think. A place to organize. A place where an idea could become a project.",
  "NEXUS isn't finished. It might take years. But every impossible project begins as something that doesn't exist yet.",
];

export function NexusMark({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <polygon
        points="50,4 90,27 90,73 50,96 10,73 10,27"
        fill="rgba(167,139,250,0.06)"
        stroke="#a78bfa"
        strokeWidth="1.6"
      />
      <polygon
        points="50,18 78,34 78,66 50,82 22,66 22,34"
        fill="none"
        stroke="rgba(167,139,250,0.35)"
        strokeWidth="1"
      />
      <path
        d="M36 64 V36 L64 64 V36"
        fill="none"
        stroke="#67e8f9"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="4" r="2.4" fill="#a78bfa" />
      <circle cx="90" cy="73" r="2.4" fill="#a78bfa" />
      <circle cx="10" cy="73" r="2.4" fill="#a78bfa" />
    </svg>
  );
}

export default function Nexus() {
  const { setNexusOpen } = useExperience();

  return (
    <section id="nexus" className="relative scroll-mt-24 overflow-hidden py-28 md:py-44">
      {/* ambience */}
      <div
        className="absolute left-1/2 top-1/4 h-[70vh] w-[80vw] -translate-x-1/2 rounded-full bg-viol/[0.07] blur-[140px]"
        aria-hidden
      />
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <ChapterHead
          index="CHAPTER 08"
          file="THE_DREAM.NXS"
          accent="text-viol"
          title={
            <>
              THE DREAM HAS <span className="text-viol">A NAME.</span>
            </>
          }
        />

        {/* hero of the dream */}
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="animate-none">
                <NexusMark className="h-24 w-24 md:h-32 md:w-32" />
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-8 bg-gradient-to-b from-white via-viol to-cy bg-clip-text font-sans text-[clamp(4rem,14vw,11rem)] font-bold leading-none tracking-tight text-transparent">
              NEXUS
            </h3>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 text-xl italic text-zinc-300 sm:text-2xl">
              “One digital world. Everything you need.”
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Tag tone="text-viol border-viol/40 bg-viol/10">STATUS: VISION</Tag>
              <Tag tone="text-zinc-300 border-line bg-void/60">PHASE: ARCHITECTURE</Tag>
              <Tag tone="text-zinc-300 border-line bg-void/60">FUTURE: BUILDING THE ECOSYSTEM</Tag>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <button
              onClick={() => setNexusOpen(true)}
              data-cursor="BOOT"
              className="group mt-12 flex items-center gap-3 border border-viol/60 bg-viol/15 px-9 py-4 font-mono text-sm tracking-[0.32em] text-viol transition-all hover:bg-viol/25 hover:shadow-[0_0_50px_-10px_rgba(167,139,250,0.6)]"
            >
              <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              ENTER NEXUS
            </button>
          </Reveal>
          <Reveal delay={0.36}>
            <p className="mt-4 font-mono text-[10px] tracking-[0.26em] text-zinc-600">
              INTERACTIVE CONCEPT PREVIEW — A VISION, HONESTLY LABELLED. NOT A FINISHED PRODUCT.
            </p>
          </Reveal>
        </div>

        {/* module constellation */}
        <div className="mt-24">
          <Reveal>
            <p className="text-center font-mono text-[11px] tracking-[0.3em] text-zinc-500">
              // 13 MODULES — ONE CONNECTED WORLD
            </p>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {MODULES.map((m, i) => (
              <motion.div
                key={m}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 * i, duration: 0.5 }}
                className={`flex items-center gap-2.5 border px-4 py-3.5 font-mono text-[11px] tracking-[0.18em] transition-colors ${
                  i % 4 === 0
                    ? "border-viol/30 bg-viol/[0.06] text-viol/90"
                    : "border-line bg-panel/50 text-zinc-400 hover:border-viol/30 hover:text-zinc-200"
                } ${i === 0 ? "col-span-2 justify-center border-viol/50 bg-viol/10 text-viol" : ""}`}
              >
                <Hexagon className="h-3.5 w-3.5 shrink-0 opacity-60" />
                {m}
              </motion.div>
            ))}
          </div>
        </div>

        {/* why nexus */}
        <div className="mx-auto mt-28 max-w-3xl">
          <Reveal>
            <h4 className="text-center font-sans text-3xl font-bold text-zinc-100 sm:text-4xl">
              WHY NEXUS?
            </h4>
          </Reveal>
          <div className="mt-10 space-y-7">
            {WHY.map((w, i) => (
              <Reveal key={i} delay={0.06 * i}>
                <p
                  className={`text-center leading-relaxed ${
                    i === WHY.length - 1
                      ? "text-xl text-zinc-100 sm:text-2xl"
                      : "text-lg text-zinc-400 sm:text-xl"
                  }`}
                >
                  {i === WHY.length - 1 ? (
                    <>
                      NEXUS isn&apos;t finished. It might take years. But{" "}
                      <span className="text-viol">
                        every impossible project begins as something that doesn&apos;t exist yet.
                      </span>
                    </>
                  ) : (
                    w
                  )}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
