"use client";

import { motion } from "framer-motion";
import { Skull } from "lucide-react";
import { MonoLabel, Reveal } from "../SectionChrome";

const BOSSES = [
  { name: "THE WHITE SCREEN", code: "Missing Component", hp: 100, note: "Spawned at 2 AM. Killed by a missing import." },
  { name: "GIT CONFLICT", code: "<<<<<<< HEAD", hp: 100, note: "Two branches enter. One branch leaves." },
  { name: "THE UNDEFINED VARIABLE", code: "Cannot read properties of undefined", hp: 100, note: "It was defined. Somewhere else." },
  { name: "CSS MONSTER", code: "Why isn't this centered?", hp: 100, note: "Defeated with three lines of flexbox and one tear." },
  { name: "DEADLINE DEMON", code: "SUBMISSION CLOSES AT 9 PM", hp: 100, note: "Submitted at 8:57 PM. Heart rate: critical." },
  { name: "THE VANISHING BUG", code: "Disappears when you debug", hp: "??", note: "STATUS: UNKNOWN. It knows when you're watching." },
];

export default function Bosses() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blood/30 to-transparent"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <Reveal>
          <MonoLabel className="text-blood/80">// OPTIONAL BOSS RUSH — CLEARED</MonoLabel>
          <h3 className="mt-3 font-sans text-3xl font-bold text-zinc-100 sm:text-4xl">
            BOSSES HE HAD TO <span className="text-blood">DEFEAT</span>
          </h3>
          <p className="mt-3 max-w-xl text-zinc-500">
            Every developer knows these. Nobody ships without fighting them first.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BOSSES.map((b, i) => (
            <Reveal key={b.name} delay={0.05 * i}>
              <div className="group relative overflow-hidden border border-blood/25 bg-panel/60 p-5 transition-colors duration-300 hover:border-blood/60">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blood/10 blur-2xl transition-opacity group-hover:opacity-150"
                />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Skull className="h-5 w-5 text-blood/80" />
                    <p className="font-sans text-lg font-bold tracking-tight text-zinc-100">
                      {b.name}
                    </p>
                  </div>
                  {/* defeated stamp */}
                  <motion.span
                    initial={{ opacity: 0, scale: 2.2, rotate: -18 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.12, type: "spring", stiffness: 200, damping: 14 }}
                    className="border-2 border-mint/70 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.24em] text-mint"
                  >
                    DEFEATED
                  </motion.span>
                </div>

                <div className="mt-4 border border-line bg-black/60 px-3.5 py-2.5 font-mono text-xs text-blood/90">
                  {b.code}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between font-mono text-[9px] tracking-[0.2em] text-zinc-600">
                    <span>BOSS HP</span>
                    <span>0 / {b.hp}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full bg-line">
                    <motion.div
                      initial={{ width: "100%" }}
                      whileInView={{ width: "0%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-blood to-blood/50"
                    />
                  </div>
                </div>

                <p className="mt-4 font-mono text-[11px] leading-5 text-zinc-500">
                  {b.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
