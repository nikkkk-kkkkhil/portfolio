"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Mask from "../Mask";

const LINES: { t: string; world: boolean }[] = [
  { t: "They laughed.", world: true },
  { t: "He stayed quiet.", world: false },
  { t: "They ignored him.", world: true },
  { t: "He kept learning.", world: false },
  { t: "They didn't understand him.", world: true },
  { t: "He started building.", world: false },
  { t: "They saw someone alone.", world: true },
  { t: "He saw a future.", world: false },
];

function FLine({
  p,
  from,
  to,
  world,
  children,
}: {
  p: MotionValue<number>;
  from: number;
  to: number;
  world: boolean;
  children: string;
}) {
  const opacity = useTransform(p, [from, from + 0.018, to - 0.014, to], [0, 1, 1, 0]);
  const y = useTransform(p, [from, from + 0.018], [26, 0]);
  const blur = useTransform(p, [from, from + 0.018, to - 0.014, to], [
    "blur(6px)",
    "blur(0px)",
    "blur(0px)",
    "blur(6px)",
  ]);
  return (
    <motion.p
      style={{ opacity, y, filter: blur }}
      className={`absolute inset-x-0 px-6 text-center font-sans font-bold tracking-tight ${
        world
          ? "text-[clamp(1.9rem,5.4vw,4.4rem)] text-zinc-600"
          : "text-glow-cy text-[clamp(1.9rem,5.4vw,4.4rem)] text-zinc-100"
      }`}
    >
      {children}
    </motion.p>
  );
}

export default function Finale() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const dim = useTransform(p, [0, 0.06], [0, 0.96]);
  const labelO = useTransform(p, [0, 0.05], [1, 0]);

  // "AND THEN HE PUT ON THE MASK."
  const phraseO = useTransform(p, [0.545, 0.565, 0.635, 0.655], [0, 1, 1, 0]);
  // the mask itself
  const maskO = useTransform(p, [0.63, 0.68, 0.8, 0.86], [0, 1, 1, 0]);
  const maskS = useTransform(p, [0.63, 0.72], [0.7, 1]);
  const maskY = useTransform(p, [0.63, 0.72], [80, 0]);
  // final statements
  const s1O = useTransform(p, [0.71, 0.73, 0.775, 0.795], [0, 1, 1, 0]);
  const s2O = useTransform(p, [0.8, 0.82, 0.875, 0.895], [0, 1, 1, 0]);
  const endO = useTransform(p, [0.9, 0.93], [0, 1]);
  const endY = useTransform(p, [0.9, 0.95], [30, 0]);

  const STEP = 0.0575;
  const START = 0.055;

  return (
    <section ref={ref} className="relative h-[560vh]" aria-label="Final scene">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* darkness closes in */}
        <motion.div style={{ opacity: dim }} className="absolute inset-0 z-10 bg-black" aria-hidden />

        <motion.p
          style={{ opacity: labelO }}
          className="absolute left-1/2 top-10 z-20 -translate-x-1/2 font-mono text-[11px] tracking-[0.4em] text-zinc-600"
        >
          // FINAL SCENE — NO MORE CHAPTERS, JUST TRUTH
        </motion.p>

        <div className="relative z-20 h-full w-full">
          {LINES.map((l, i) => (
            <FLine
              key={l.t}
              p={p}
              from={START + i * STEP}
              to={START + i * STEP + 0.052}
              world={l.world}
            >
              {l.t}
            </FLine>
          ))}

          <motion.p
            style={{ opacity: phraseO }}
            className="absolute inset-x-0 top-[22%] px-6 text-center font-mono text-sm tracking-[0.5em] text-zinc-400 md:text-lg"
          >
            AND THEN HE PUT ON THE MASK.
          </motion.p>

          <motion.div
            style={{ opacity: maskO, scale: maskS, y: maskY }}
            className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center"
          >
            <div className="relative">
              <div className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-cy/40" aria-hidden />
              <Mask variant="shadow" className="w-44 md:w-56" />
            </div>
          </motion.div>

          <motion.p
            style={{ opacity: s1O }}
            className="text-outline absolute inset-x-0 top-[24%] px-6 text-center font-sans text-[clamp(1.6rem,4.6vw,3.8rem)] font-bold tracking-tight"
          >
            HE STOPPED TRYING TO BE SEEN.
          </motion.p>
          <motion.p
            style={{ opacity: s2O }}
            className="absolute inset-x-0 top-[24%] px-6 text-center font-sans text-[clamp(1.6rem,4.6vw,3.8rem)] font-bold tracking-tight text-zinc-100"
          >
            HE STARTED BUILDING SOMETHING{" "}
            <span className="text-glow-cy text-cy">WORTH SEEING.</span>
          </motion.p>

          <motion.div style={{ opacity: endO, y: endY }} className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center">
            <p className="shimmer-text font-sans text-[clamp(2.2rem,6.5vw,5.5rem)] font-bold tracking-tight">
              THE STORY ISN&apos;T OVER.
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.4em] text-zinc-600">
              SCROLL — THERE IS ONE MORE THING
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
