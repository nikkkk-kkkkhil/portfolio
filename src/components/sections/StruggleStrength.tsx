"use client";

import { Reveal } from "../SectionChrome";
import Mask from "../Mask";

const LEFT = [
  "Quiet.",
  "Alone.",
  "Different.",
  "The student nobody talked to.",
  "The person people made fun of.",
  "The person who didn't fit in.",
];

const RIGHT = [
  "A developer.",
  "A problem solver.",
  "A creator.",
  "A full-stack engineer.",
  "A dream.",
  "A future.",
];

export default function StruggleStrength() {
  return (
    <section className="relative overflow-hidden py-28 md:py-44">
      <div className="grid-bg-far absolute inset-0 opacity-40" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <Reveal>
          <p className="text-center font-mono text-[11px] tracking-[0.34em] text-zinc-500">
            // STRUGGLE → STRENGTH — SAME YEARS, TWO TRUTHS
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:grid-cols-2 md:gap-0">
          {/* center seam with mask */}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-line2 to-transparent md:block"
          />
          <div className="absolute left-1/2 top-1/2 z-10 hidden h-20 w-16 -translate-x-1/2 -translate-y-1/2 md:block">
            <Mask scan={false} accent="#67e8f9" />
          </div>

          <div className="md:pr-16">
            <Reveal>
              <h3 className="text-right font-mono text-xs tracking-[0.3em] text-zinc-600 md:text-left">
                WHAT THE WORLD SAW
              </h3>
            </Reveal>
            <div className="mt-8 space-y-5">
              {LEFT.map((l, i) => (
                <Reveal key={l} delay={0.06 * i}>
                  <p className="text-xl text-zinc-600 line-through decoration-zinc-700/60 decoration-1 sm:text-2xl">
                    {l}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:pl-16 md:text-right">
            <Reveal>
              <h3 className="font-mono text-xs tracking-[0.3em] text-cy md:text-right">
                WHAT HE WAS BUILDING
              </h3>
            </Reveal>
            <div className="mt-8 space-y-5">
              {RIGHT.map((r, i) => (
                <Reveal key={r} delay={0.06 * i}>
                  <p className="text-xl text-zinc-100 sm:text-2xl">
                    {r}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-32 space-y-5 text-center md:mt-44">
          <Reveal>
            <p className="text-outline font-sans text-[clamp(1.7rem,5vw,4.2rem)] font-bold tracking-tight">
              THEY SAW THE MASK.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-sans text-[clamp(1.7rem,5vw,4.2rem)] font-bold tracking-tight text-zinc-100">
              THEY DIDN&apos;T SEE <span className="text-glow-cy text-cy">THE WORK.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
