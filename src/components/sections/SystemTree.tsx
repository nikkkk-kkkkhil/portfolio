"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Cloud, Database, LayoutTemplate, Server } from "lucide-react";
import { ChapterHead, Reveal } from "../SectionChrome";

function VLine({ h = "h-10" }: { h?: string }) {
  return (
    <div className={`relative mx-auto w-px overflow-hidden ${h}`} aria-hidden>
      <div className="absolute inset-0 bg-line2" />
      <div className="absolute inset-x-0 top-0 h-3 animate-scan-y bg-cy/80 blur-[1px]" />
    </div>
  );
}

function Node({
  children,
  core = false,
  icon,
  delay = 0,
}: {
  children: ReactNode;
  core?: boolean;
  icon?: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-fit border px-5 py-3 font-mono tracking-[0.22em] transition-colors ${
        core
          ? "border-cy/60 bg-cy/10 text-cy shadow-[0_0_50px_-12px_rgba(103,232,249,0.5)]"
          : "border-line bg-panel/80 text-zinc-300 hover:border-cy/40"
      }`}
    >
      <span className="flex items-center gap-2.5">
        {icon}
        {children}
      </span>
    </motion.div>
  );
}

function Branch({
  title,
  items,
  icon,
  delay = 0,
}: {
  title: string;
  items: string[];
  icon: ReactNode;
  delay?: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <Node icon={icon} delay={delay}>{title}</Node>
      <VLine h="h-6" />
      <div className="flex flex-col gap-2">
        {items.map((it, i) => (
          <motion.span
            key={it}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.1 + i * 0.08 }}
            className="border border-line/70 bg-void/60 px-3 py-1.5 text-center font-mono text-[10px] tracking-[0.2em] text-zinc-500"
          >
            {it}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function Split({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div aria-hidden className="absolute left-1/4 right-1/4 top-0 h-px bg-line2" />
      <div aria-hidden className="absolute left-1/4 top-0 h-8 w-px -translate-x-1/2 bg-line2" />
      <div aria-hidden className="absolute right-1/4 top-0 h-8 w-px translate-x-1/2 bg-line2" />
      <div className="grid grid-cols-2 gap-4 pt-8 sm:gap-8">{children}</div>
    </div>
  );
}

export default function SystemTree() {
  return (
    <section id="system" className="relative scroll-mt-24 overflow-hidden py-28 md:py-40">
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <ChapterHead
          index="CHAPTER 06"
          file="ARCHITECTURE.SYS"
          title={
            <>
              HE DOESN&apos;T JUST WRITE CODE.
              <span className="text-glow-cy block text-cy">HE BUILDS SYSTEMS.</span>
            </>
          }
          sub="The full-stack map — every layer touched, every layer connected. Animated nodes: the actual stack behind the missions."
        />

        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Node core delay={0}>
              <svg viewBox="0 0 64 72" className="h-5 w-5" aria-hidden>
                <path
                  d="M32 4 L56 15 L60 31 L52 48 L40 62 L32 67 L24 62 L12 48 L4 31 L8 15 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path d="M17 30 L29 27.6 L30 31 L18.4 33.4 Z" fill="currentColor" />
                <path d="M47 30 L35 27.6 L34 31 L45.6 33.4 Z" fill="currentColor" />
              </svg>
              THE MASKED MAN
            </Node>
          </div>

          <VLine />

          <Split>
            <Branch
              title="FRONTEND"
              icon={<LayoutTemplate className="h-4 w-4" />}
              items={["REACT / JS", "TAILWIND", "HTML / CSS"]}
              delay={0.1}
            />
            <Branch
              title="BACKEND"
              icon={<Server className="h-4 w-4" />}
              items={["NODE.JS", "EXPRESS", "REST APIS"]}
              delay={0.2}
            />
          </Split>

          <VLine h="h-12" />

          <div className="flex flex-col items-center">
            <Node icon={<Database className="h-4 w-4" />} delay={0.1}>
              DATABASE
            </Node>
            <VLine h="h-5" />
            <div className="flex gap-2">
              {["MONGODB", "MONGOOSE"].map((d, i) => (
                <motion.span
                  key={d}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="border border-line/70 bg-void/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-zinc-500"
                >
                  {d}
                </motion.span>
              ))}
            </div>
          </div>

          <VLine />

          <Split>
            <Branch
              title="AI"
              icon={<BrainCircuit className="h-4 w-4" />}
              items={["GEMINI API", "AI SYSTEMS", "PREDICTION"]}
              delay={0.15}
            />
            <Branch
              title="DEPLOYMENT"
              icon={<Cloud className="h-4 w-4" />}
              items={["CLOUD", "CI / CD", "HOSTING"]}
              delay={0.25}
            />
          </Split>
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-16 max-w-xl text-center font-mono text-xs leading-6 tracking-[0.14em] text-zinc-600">
            EVERY MISSION IN THE ARCHIVE RUNS ON SOME SLICE OF THIS MAP.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
