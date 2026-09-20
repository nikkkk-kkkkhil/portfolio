"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useExperience } from "../ExperienceProvider";
import { missions } from "@/data/missions";

interface Line {
  t: string;
  cls?: string;
}

const HELP: Line[] = [
  { t: "AVAILABLE COMMANDS:", cls: "text-cy" },
  { t: "  whoami          identify the subject" },
  { t: "  story           the short version" },
  { t: "  mask            about the mask" },
  { t: "  dream           what he dreams of" },
  { t: "  future          request future data" },
  { t: "  nexus           project nexus status" },
  { t: "  missions        list the archive" },
  { t: "  skills          list the loadout" },
  { t: "  sudo reveal-face attempt the forbidden" },
  { t: "  ls · pwd · date · hello · clear · exit" },
];

function respond(raw: string): Line[] | "clear" | "exit" {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return [];
    case "help":
      return HELP;
    case "whoami":
      return [{ t: "THE MASKED MAN", cls: "text-glow-cy text-cy" }];
    case "story":
      return [
        { t: "He was once ignored." },
        { t: "Now he builds.", cls: "text-cy" },
      ];
    case "mask":
      return [{ t: "THE MASK STAYS ON.", cls: "text-zinc-100" }];
    case "dream":
      return [{ t: "NEXUS.", cls: "text-viol" }];
    case "future":
      return [
        { t: "ACCESS DENIED.", cls: "text-blood" },
        { t: "NOT WRITTEN YET.", cls: "text-zinc-400" },
      ];
    case "sudo reveal-face":
      return [
        { t: "PERMISSION DENIED.", cls: "text-blood" },
        { t: "SOME SECRETS ARE MEANT TO STAY SECRET.", cls: "text-zinc-100" },
      ];
    case "reveal-face":
    case "reveal face":
      return [{ t: "nice try.", cls: "text-zinc-500" }];
    case "nexus":
      return [
        { t: "NEXUS", cls: "text-viol" },
        { t: "STATUS: VISION" },
        { t: "CURRENT PHASE: ARCHITECTURE" },
        { t: "FUTURE: BUILDING THE ECOSYSTEM" },
      ];
    case "missions":
      return missions.map((m) => ({
        t: `  TMM-${m.id}  ${m.name.padEnd(14)} — ${m.status}`,
        cls: m.status === "VISION" ? "text-viol" : m.status === "ACTIVE" ? "text-mint" : "text-zinc-400",
      }));
    case "skills":
      return [
        { t: "LANGUAGES · FRONTEND · BACKEND · DATABASE · DEV TOOLS · AI", cls: "text-cy" },
        { t: "see the SKILL ECOSYSTEM section for the full tree." },
      ];
    case "ls":
      return [{ t: "mask.svg   nexus_blueprint.nxs   secrets/   face.jpg" }];
    case "cat face.jpg":
    case "open face.jpg":
      return [{ t: "cat: face.jpg: FILE NOT FOUND — IT NEVER EXISTED.", cls: "text-blood" }];
    case "pwd":
      return [{ t: "/home/masked-man/world" }];
    case "date":
      return [{ t: new Date().toString() }];
    case "hello":
    case "hi":
      return [{ t: "he sees you. metaphorically.", cls: "text-zinc-400" }];
    case "sudo":
      return [{ t: "sudo: a masked user is watching you.", cls: "text-zinc-500" }];
    case "clear":
      return "clear";
    case "exit":
      return "exit";
    default:
      return [
        { t: `unknown command: "${cmd}"`, cls: "text-blood" },
        { t: "type 'help' to list commands.", cls: "text-zinc-600" },
      ];
  }
}

export default function SecretTerminal() {
  const { terminalOpen, setTerminalOpen } = useExperience();
  const [lines, setLines] = useState<Line[]>([]);
  const [booted, setBooted] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // backtick toggles globally
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.key === "`" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        setTerminalOpen(!terminalOpen);
      }
      if (e.key === "Escape" && terminalOpen) setTerminalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [terminalOpen, setTerminalOpen]);

  useEffect(() => {
    if (terminalOpen) {
      if (!booted) {
        setLines([
          { t: "TMM SECURE TERMINAL v1.3 — UNAUTHORIZED ACCESS DETECTED", cls: "text-zinc-600" },
          { t: "identity confirmed: guest. welcome anyway.", cls: "text-zinc-500" },
          { t: "type 'help' to begin.", cls: "text-cy" },
        ]);
        setBooted(true);
      }
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [terminalOpen, booted]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, terminalOpen]);

  const run = () => {
    const cmd = value;
    const out = respond(cmd);
    const echo: Line = { t: `guest@masked-man:~$ ${cmd}`, cls: "text-zinc-600" };
    if (out === "clear") {
      setLines([]);
    } else if (out === "exit") {
      setTerminalOpen(false);
      setLines((l) => [...l, echo, { t: "connection closed.", cls: "text-zinc-600" }]);
    } else {
      setLines((l) => [...l, echo, ...out]);
    }
    if (cmd.trim()) {
      setHistory((h) => [cmd, ...h]);
    }
    setHIdx(-1);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") run();
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(hIdx + 1, history.length - 1);
      if (history[next]) {
        setHIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = hIdx - 1;
      setHIdx(next);
      setValue(next >= 0 ? history[next] : "");
    }
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[135] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[36rem]"
          role="dialog"
          aria-label="Secret terminal"
        >
          <div className="border border-line2 bg-black/95 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <p className="font-mono text-[10px] tracking-[0.26em] text-zinc-500">
                ~/secret — SECURE CHANNEL
              </p>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-700">
                  ` TOGGLES · ESC CLOSES
                </span>
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="text-zinc-500 transition-colors hover:text-blood"
                  aria-label="Close terminal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div
              ref={bodyRef}
              onClick={() => inputRef.current?.focus()}
              className="h-72 cursor-text overflow-y-auto p-4 font-mono text-xs leading-6 sm:h-80"
            >
              {lines.map((l, i) => (
                <p key={i} className={l.cls ?? "text-zinc-300"}>
                  {l.t}
                </p>
              ))}
              <div className="flex items-center">
                <span className="mr-2 shrink-0 text-mint">guest@masked-man:~$</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="w-full bg-transparent text-zinc-100 caret-cy focus:outline-none"
                  aria-label="Terminal input"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
