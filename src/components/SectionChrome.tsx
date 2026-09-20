"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 34,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Corners({
  className = "",
  tone = "border-cy/40",
}: {
  className?: string;
  tone?: string;
}) {
  const c = `absolute h-3 w-3 ${tone}`;
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

export function Tag({
  children,
  tone = "text-cy border-cy/30 bg-cy/5",
  className = "",
}: {
  children: ReactNode;
  tone?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] tracking-[0.22em] ${tone} ${className}`}
    >
      {children}
    </span>
  );
}

export function ChapterHead({
  id,
  index,
  file,
  title,
  sub,
  accent = "text-cy",
}: {
  id?: string;
  index: string;
  file: string;
  title: ReactNode;
  sub?: string;
  accent?: string;
}) {
  return (
    <div id={id} className="relative mb-14 scroll-mt-28 md:mb-20">
      <Reveal y={16}>
        <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-zinc-500">
          <span className={accent}>{index}</span>
          <span className="hairline flex-1" />
          <span className="shrink-0">FILE: {file}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 font-sans text-4xl font-bold leading-[1.02] tracking-tight text-zinc-100 sm:text-6xl md:text-7xl">
          {title}
        </h2>
      </Reveal>
      {sub ? (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl font-mono text-sm leading-relaxed text-zinc-500">
            {sub}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function MonoLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.32em] text-zinc-500 ${className}`}
    >
      {children}
    </p>
  );
}
