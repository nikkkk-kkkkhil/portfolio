"use client";

import { ChapterHead, Reveal } from "../SectionChrome";

const PARAS: { text: string; strong?: string }[] = [
  { text: "There was a time when he wasn't “The Masked Man.”" },
  { text: "He was just a student." },
  { text: "Quiet. Different. Often alone.", strong: "Often alone." },
  {
    text: "While everyone around him seemed to have their own group, he struggled to find someone who genuinely wanted to talk to him.",
  },
  { text: "Some classmates made fun of him. Some ignored him. Some never noticed him at all." },
  { text: "He wanted something ordinary.", strong: "Friends. Conversations. A normal life." },
  { text: "But sometimes ordinary things feel impossible when you feel like you don't belong." },
];

/** Abstract, distant classmates — deliberately faceless shapes. */
function Silhouettes() {
  const figures = [
    { left: "58%", h: 130, d: "0s" },
    { left: "68%", h: 150, d: "1.4s" },
    { left: "78%", h: 124, d: "0.8s" },
    { left: "88%", h: 142, d: "2s" },
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-[0.16] blur-[2px] lg:block"
    >
      {figures.map((f, i) => (
        <div
          key={i}
          className="animate-floaty absolute bottom-24 flex flex-col items-center"
          style={{ left: f.left, animationDelay: f.d }}
        >
          <div className="h-8 w-8 rounded-full bg-zinc-500" />
          <div
            className="w-12 rounded-t-2xl bg-zinc-500"
            style={{ height: f.h }}
          />
        </div>
      ))}
      {/* him — apart from the group */}
      <div className="absolute bottom-24 left-[20%] flex flex-col items-center">
        <div className="h-7 w-7 rounded-full bg-zinc-600" />
        <div className="h-32 w-10 rounded-t-2xl bg-zinc-600" />
      </div>
    </div>
  );
}

export default function BeforeMask() {
  return (
    <section id="story" className="relative scroll-mt-24 overflow-hidden py-28 md:py-40">
      <div
        className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#0a0805] to-transparent"
        aria-hidden
      />
      <Silhouettes />

      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <ChapterHead
          index="CHAPTER 01"
          file="SCHOOL_YEARS.LOG"
          accent="text-amberish"
          title={
            <>
              BEFORE THE MASK.
              <span className="mt-3 block text-xl font-normal text-zinc-500 sm:text-2xl md:text-3xl">
                The boy nobody noticed.
              </span>
            </>
          }
        />

        <div className="max-w-2xl space-y-8">
          {PARAS.map((p, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <p className="text-xl leading-relaxed text-zinc-400 sm:text-2xl">
                {p.strong ? (
                  <>
                    {p.text.replace(p.strong, "")}
                    <span className="text-zinc-100">{p.strong}</span>
                  </>
                ) : (
                  p.text
                )}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="mt-6 border-l-2 border-amberish/40 bg-amberish/5 p-5 font-mono text-xs leading-6 text-zinc-500">
              <p className="text-amberish/80">FILE NOTE —</p>
              <p className="mt-1">
                This chapter has no villains, and loneliness is not the hero of this
                story. It is simply where the story starts.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <p
        aria-hidden
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] tracking-[0.5em] text-zinc-700 xl:block"
      >
        SUBJECT: UNNAMED — REDACTED
      </p>
    </section>
  );
}
