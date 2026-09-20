"use client";

import { motion } from "framer-motion";
import { FileTerminal } from "lucide-react";
import { MonoLabel, Reveal, Corners } from "../SectionChrome";

const LOG: { day: string; text: string; tone?: "err" | "ok" | "dream" }[] = [
  { day: "001", text: "Created first project." },
  { day: "017", text: "First API worked.", tone: "ok" },
  { day: "024", text: "Database connection failed.", tone: "err" },
  { day: "025", text: "Fixed database.", tone: "ok" },
  { day: "032", text: "First full-stack application.", tone: "ok" },
  { day: "047", text: "Discovered authentication bugs.", tone: "err" },
  { day: "048", text: "Fixed authentication.", tone: "ok" },
  { day: "073", text: "Started AI experimentation." },
  { day: "091", text: "Started KisanSetu." },
  { day: "120", text: "Started thinking about NEXUS.", tone: "dream" },
  { day: "121", text: "Realized NEXUS was much bigger than expected.", tone: "dream" },
  { day: "122", text: "Started anyway.", tone: "ok" },
];

export default function BuildLog() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      <div className="relative z-10 mx-auto max-w-5xl px-5">
        <Reveal>
          <MonoLabel>// RECOVERED JOURNAL — PARTIAL DECRYPT</MonoLabel>
          <h3 className="mt-3 font-sans text-3xl font-bold text-zinc-100 sm:text-4xl">
            BUILD LOG
          </h3>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-10 border border-line bg-black/60 p-6 sm:p-8">
            <Corners />
            <div className="mb-6 flex items-center gap-2.5 border-b border-line pb-4 font-mono text-[10px] tracking-[0.28em] text-zinc-600">
              <FileTerminal className="h-4 w-4 text-cy/70" />
              ~/logs/journey.log — tail -12
            </div>
            <div className="space-y-3 font-mono text-sm">
              {LOG.map((l, i) => (
                <motion.p
                  key={l.day}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-6% 0px" }}
                  transition={{ duration: 0.45, delay: 0.03 * i }}
                  className="flex gap-4"
                >
                  <span className="shrink-0 text-cy/70">DAY {l.day}</span>
                  <span
                    className={
                      l.tone === "err"
                        ? "text-blood"
                        : l.tone === "ok"
                          ? "text-mint"
                          : l.tone === "dream"
                            ? "text-viol"
                            : "text-zinc-400"
                    }
                  >
                    {l.text}
                  </span>
                </motion.p>
              ))}
            </div>
            <p className="mt-8 border-t border-line pt-4 font-mono text-[10px] leading-5 tracking-[0.18em] text-zinc-600">
              NOTE: DAY COUNTS ARE NARRATIVE MARKERS FROM THE JOURNEY LOG, NOT CERTIFIED TIMESTAMPS.
              THE PATTERN, HOWEVER, IS REAL: BREAK → FIX → SHIP → REPEAT.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
