"use client";

import { ChapterHead, Reveal } from "../SectionChrome";
import Mask from "../Mask";

const LINES = [
  "He could have shown his face.",
  "But he chose not to.",
  "The mask became a boundary between who people thought he was — and who he was becoming.",
  "The world saw a mask. He saw freedom.",
  "Because behind the mask, he didn't have to prove anything.",
  "His work could speak first.",
];

export default function WhyMask() {
  return (
    <section className="relative overflow-hidden py-28 md:py-44">
      {/* light beams */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-cy/20 to-transparent"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-10%] h-[130%] w-[42rem] -translate-x-1/2 rotate-[18deg] bg-gradient-to-b from-transparent via-cy/[0.04] to-transparent"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-10%] h-[130%] w-[30rem] -translate-x-1/2 -rotate-[14deg] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <ChapterHead
          index="CHAPTER 03"
          file="IDENTITY.SYS"
          title={
            <>
              WHY THE MASK
              <span className="block">NEVER COMES OFF.</span>
            </>
          }
        />

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-cy/15"
              />
              <Mask reactive float accent="#e2f1f7" className="mx-auto w-60 sm:w-80" />
            </div>
          </Reveal>

          <div className="order-1 space-y-6 lg:order-2">
            {LINES.map((l, i) => (
              <Reveal key={i} delay={0.08 * i} y={22}>
                <p
                  className={`leading-relaxed ${
                    i === LINES.length - 1
                      ? "text-xl text-zinc-100 sm:text-2xl"
                      : "text-lg text-zinc-400 sm:text-xl"
                  }`}
                >
                  {l}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-28 space-y-4 text-center md:mt-36">
          <Reveal>
            <p className="text-outline font-sans text-[clamp(1.8rem,5.6vw,4.6rem)] font-bold leading-tight tracking-tight">
              “DON&apos;T LOOK FOR MY FACE.”
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-sans text-[clamp(1.8rem,5.6vw,4.6rem)] font-bold leading-tight tracking-tight text-zinc-100">
              “LOOK AT <span className="text-glow-cy text-cy">WHAT I BUILD.</span>”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
