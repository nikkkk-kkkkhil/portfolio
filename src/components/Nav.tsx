"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, TerminalSquare, X } from "lucide-react";
import { useExperience } from "./ExperienceProvider";

const LINKS = [
  { label: "STORY", href: "story" },
  { label: "SKILLS", href: "skills" },
  { label: "SYSTEM", href: "system" },
  { label: "MISSIONS", href: "missions" },
  { label: "NEXUS", href: "nexus" },
  { label: "FUTURE", href: "future" },
];

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top, behavior: "smooth" });
}

function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden>
      <path
        d="M32 4 L56 15 L60 31 L52 48 L40 62 L32 67 L24 62 L12 48 L4 31 L8 15 Z"
        fill="#0d1116"
        stroke="#67e8f9"
        strokeOpacity="0.6"
        strokeWidth="1.6"
      />
      <path d="M17 30 L29 27.6 L30 31 L18.4 33.4 Z" fill="#67e8f9" />
      <path d="M47 30 L35 27.6 L34 31 L45.6 33.4 Z" fill="#67e8f9" />
    </svg>
  );
}

export default function Nav() {
  const { setTerminalOpen } = useExperience();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[101] h-0.5 origin-left bg-cy/70"
        style={{ scaleX: scrollYProgress }}
        aria-hidden
      />
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "border-b border-line/80 bg-void/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <Mark className="h-7 w-7 transition-transform duration-500 group-hover:rotate-[8deg]" />
            <span className="font-mono text-xs tracking-[0.3em] text-zinc-300">
              MASKED<span className="text-cy">MAN</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Chapters">
            {LINKS.map((l, i) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="group font-mono text-[11px] tracking-[0.26em] text-zinc-500 transition-colors hover:text-cy"
              >
                <span className="mr-1.5 text-zinc-700 group-hover:text-cy/60">
                  0{i + 1}
                </span>
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <span className="hidden items-center gap-2 border border-line px-2.5 py-1.5 font-mono text-[10px] tracking-[0.22em] text-zinc-500 lg:flex">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-mint" />
              STATUS: BUILDING
            </span>
            <button
              onClick={() => setTerminalOpen(true)}
              className="border border-line p-2 text-zinc-500 transition-colors hover:border-cy/40 hover:text-cy"
              aria-label="Open secret terminal"
              title="Open secret terminal"
            >
              <TerminalSquare className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="border border-line p-2 text-zinc-400 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99] flex flex-col justify-center bg-void/95 px-8 backdrop-blur-lg md:hidden"
          >
            <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
            <p className="relative mb-8 font-mono text-[11px] tracking-[0.34em] text-zinc-600">
              // CHAPTER SELECT
            </p>
            {LINKS.map((l, i) => (
              <motion.button
                key={l.href}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.4 }}
                onClick={() => go(l.href)}
                className="relative border-b border-line/60 py-4 text-left font-sans text-3xl font-bold tracking-tight text-zinc-200 transition-colors hover:text-cy"
              >
                <span className="mr-4 font-mono text-xs text-cy/60">0{i + 1}</span>
                {l.label}
              </motion.button>
            ))}
            <p className="relative mt-10 font-mono text-[10px] tracking-[0.3em] text-zinc-600">
              FACE: RESTRICTED · STATUS: BUILDING
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
