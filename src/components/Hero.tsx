"use client";

import { motion } from "framer-motion";
import { ChevronDown, FolderOpen, ScrollText } from "lucide-react";
import Mask from "./Mask";
import { Corners } from "./SectionChrome";
import { scrollToId } from "./Nav";

const PROFILE = `╔════════════════════════════════╗
║        CLASSIFIED PROFILE      ║
╠════════════════════════════════╣
║ CODENAME: THE MASKED MAN       ║
║ CLASS: FULL-STACK DEVELOPER    ║
║ LEVEL: 01                      ║
║ SPECIALIZATION: SOFTWARE       ║
║ STATUS: BUILDING               ║
║ FACE: RESTRICTED               ║
║ MISSION: CREATE THE IMPOSSIBLE ║
╚════════════════════════════════╝`;

const STATS = [
  { k: "LEVEL", v: "01" },
  { k: "MISSIONS", v: "010" },
  { k: "FACE", v: "RESTRICTED" },
  { k: "STATUS", v: "BUILDING" },
];

const CHIPS = [
  { label: "REACT", x: "-8%", y: "12%", d: "0s" },
  { label: "NODE.JS", x: "78%", y: "6%", d: "1.2s" },
  { label: "MONGODB", x: "84%", y: "58%", d: "2.1s" },
  { label: "GEMINI API", x: "-14%", y: "64%", d: "0.7s" },
  { label: "EXPRESS", x: "64%", y: "88%", d: "1.7s" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div
        className="absolute left-1/2 top-[-20%] h-[60vh] w-[90vw] -translate-x-1/2 rounded-full bg-cydeep/20 blur-[120px]"
        aria-hidden
      />
      <div
        className="perspective-floor absolute bottom-[-30vh] left-1/2 h-[60vh] w-[160vw] -translate-x-1/2 grid-bg-far opacity-50 masking-fade-b"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* left — identity */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-mono text-[11px] tracking-[0.34em] text-zinc-500"
          >
            MEMORY FILE 001 // DECLASSIFIED — SUBJECT PROFILE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-sans font-bold leading-[0.92] tracking-tight"
          >
            <span className="block text-[clamp(3rem,9vw,7.5rem)] text-zinc-100">
              THE MASKED
            </span>
            <span className="text-outline block text-[clamp(3rem,9vw,7.5rem)]">
              MAN<span className="text-cy" style={{ WebkitTextStroke: "0px" }}>.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400"
          >
            Full-stack developer. He builds systems in the dark —{" "}
            <span className="text-zinc-100">frontend to database, idea to deployment</span>.
            The face stays hidden. The work speaks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToId("story")}
              data-cursor="CH.01"
              className="flex items-center gap-2.5 border border-cy/50 bg-cy/10 px-6 py-3.5 font-mono text-xs tracking-[0.28em] text-cy transition-all hover:bg-cy/20"
            >
              <ScrollText className="h-4 w-4" /> BEGIN THE STORY
            </button>
            <button
              onClick={() => scrollToId("missions")}
              data-cursor="ARCHIVE"
              className="flex items-center gap-2.5 border border-line px-6 py-3.5 font-mono text-xs tracking-[0.28em] text-zinc-400 transition-all hover:border-line2 hover:text-zinc-100"
            >
              <FolderOpen className="h-4 w-4" /> MISSION ARCHIVE
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-12 grid max-w-xl grid-cols-2 border border-line sm:grid-cols-4"
          >
            {STATS.map((s, i) => (
              <div
                key={s.k}
                className={`px-4 py-3.5 ${i !== 0 ? "border-l border-line" : ""} ${
                  i >= 2 ? "border-t border-line sm:border-t-0" : ""
                }`}
              >
                <p className="font-mono text-[10px] tracking-[0.26em] text-zinc-600">{s.k}</p>
                <p className={`mt-1 font-mono text-sm ${i === 3 ? "text-mint" : "text-zinc-200"}`}>
                  {s.v}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* right — the mask */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative">
            <div
              className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cy/10"
              aria-hidden
            />
            <div
              className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-cy/25"
              aria-hidden
            />
            <Mask reactive float className="mx-auto w-64 sm:w-80 lg:w-[22rem]" />
            {CHIPS.map((c) => (
              <motion.span
                key={c.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + Math.random() * 0.4 }}
                className="animate-floaty absolute hidden border border-line bg-void/80 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.22em] text-cy/80 backdrop-blur-sm md:block"
                style={{ left: c.x, top: c.y, animationDelay: c.d }}
              >
                ▸ {c.label}
              </motion.span>
            ))}
          </div>

          <motion.pre
            initial={{ opacity: 0, y: 24, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -1.2 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            className="ascii-box relative z-10 mx-auto -mt-4 w-fit border border-line bg-panel/90 p-4 text-[9px] text-zinc-400 panel-glow sm:text-[11px]"
          >
            <Corners />
            {PROFILE}
          </motion.pre>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollToId("story")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.34em] text-zinc-600 transition-colors hover:text-cy"
        aria-label="Scroll to the story"
      >
        SCROLL TO DECRYPT
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
