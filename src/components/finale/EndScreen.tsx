"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Radio, RefreshCcw, Send } from "lucide-react";
import Mask from "../Mask";
import { NexusMark } from "../sections/Nexus";
import { Corners, MonoLabel, Reveal } from "../SectionChrome";
import { useExperience } from "../ExperienceProvider";
import { scrollToId } from "../Nav";

const EPILOGUE = [
  "YOU NEVER SAW HIS FACE.",
  "BUT YOU SAW HIS STORY.",
  "YOU SAW HIS STRUGGLE.",
  "YOU SAW HIS CODE.",
  "YOU SAW HIS DREAM.",
  "AND MAYBE...",
  "THAT'S ENOUGH.",
];

function Teaser() {
  return (
    <section className="relative overflow-hidden border-t border-line/60 py-28 md:py-36">
      <div
        className="absolute left-1/2 top-1/2 h-[40vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-viol/[0.06] blur-[120px]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <div className="animate-flicker inline-block">
            <NexusMark className="h-16 w-16" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="mt-6 bg-gradient-to-b from-white to-viol bg-clip-text font-sans text-5xl font-bold tracking-tight text-transparent md:text-7xl">
            NEXUS
          </h3>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mx-auto mt-6 w-fit border border-line bg-panel/60 px-6 py-4 text-left font-mono text-xs leading-7 tracking-[0.18em]">
            <p>
              <span className="text-zinc-600">PROJECT STATUS:</span>{" "}
              <span className="text-blood">NOT BUILT YET.</span>
            </p>
            <p>
              <span className="text-zinc-600">VISION:</span>{" "}
              <span className="text-mint">ALIVE.</span>
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 font-sans text-3xl font-bold italic text-zinc-100 md:text-5xl">
            “ONE DAY.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FinalScreen() {
  const { reEnter } = useExperience();
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <Image
        src="/images/walk-away.jpg"
        alt="A masked figure walking away into a futuristic corridor of light"
        fill
        sizes="100vw"
        className="object-cover opacity-35"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void/40 to-void" aria-hidden />
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <MonoLabel>// EPILOGUE — THE WALK AWAY</MonoLabel>
        </Reveal>
        <div className="mt-10 space-y-3">
          {EPILOGUE.map((l, i) => (
            <Reveal key={l} delay={0.08 * i}>
              <p
                className={`font-sans font-bold tracking-tight ${
                  i === EPILOGUE.length - 1
                    ? "text-glow-cy pt-4 text-3xl text-cy md:text-5xl"
                    : i >= EPILOGUE.length - 2
                      ? "text-2xl text-zinc-200 md:text-3xl"
                      : "text-xl text-zinc-400 md:text-2xl"
                }`}
              >
                {l}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16">
            <Mask scan accent="#67e8f9" className="mx-auto w-28" />
            <h3 className="mt-6 font-sans text-4xl font-bold tracking-tight text-zinc-100 md:text-6xl">
              THE MASKED MAN
            </h3>
            <div className="mt-5 font-mono text-xs leading-7 tracking-[0.3em] text-zinc-500">
              <p>
                LEVEL 01 — <span className="text-mint">COMPLETE</span>
              </p>
              <p>
                NEXT CHAPTER — <span className="text-amberish">UNKNOWN</span>
              </p>
            </div>
            <button
              onClick={reEnter}
              data-cursor="REPLAY"
              className="mt-10 inline-flex items-center gap-3 border border-line px-7 py-3.5 font-mono text-xs tracking-[0.3em] text-zinc-400 transition-all hover:border-cy/50 hover:text-cy"
            >
              <RefreshCcw className="h-4 w-4" /> ENTER THE WORLD AGAIN
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Signal() {
  const [callsign, setCallsign] = useState("");
  const [frequency, setFrequency] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/signal")
      .then((r) => r.json())
      .then((d) => setCount(d.count ?? 0))
      .catch(() => setCount(null));
  }, [state]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/signal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callsign, frequency, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Transmission failed.");
      setState("sent");
      setCallsign("");
      setFrequency("");
      setMessage("");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Transmission failed.");
    }
  };

  return (
    <section id="signal" className="relative scroll-mt-24 border-t border-line/60 py-24 md:py-32">
      <div className="grid-bg-far absolute inset-0 opacity-40" aria-hidden />
      <div className="relative z-10 mx-auto max-w-3xl px-5">
        <Reveal>
          <div className="flex items-center gap-3">
            <Radio className="h-5 w-5 text-cy" />
            <MonoLabel>// POST-CREDITS SCENE — OPEN CHANNEL</MonoLabel>
          </div>
          <h3 className="mt-4 font-sans text-3xl font-bold text-zinc-100 sm:text-4xl">
            TRANSMIT A SIGNAL
          </h3>
          <p className="mt-3 max-w-xl text-zinc-500">
            He reads everything. He replies when there is something worth saying.
            {count !== null && (
              <span className="ml-2 font-mono text-xs text-cy/80">
                [{count} SIGNAL{count === 1 ? "" : "S"} RECEIVED SO FAR]
              </span>
            )}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="relative mt-10 border border-line bg-panel/60 p-6 md:p-8">
            <Corners />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="callsign" className="font-mono text-[10px] tracking-[0.28em] text-zinc-500">
                  CALLSIGN (NAME) *
                </label>
                <input
                  id="callsign"
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  required
                  maxLength={80}
                  placeholder="WHO ARE YOU?"
                  className="mt-2 w-full border border-line bg-void/70 px-4 py-3 font-mono text-sm text-zinc-200 placeholder:text-zinc-700 focus:border-cy/60 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="frequency" className="font-mono text-[10px] tracking-[0.28em] text-zinc-500">
                  FREQUENCY (EMAIL — OPTIONAL)
                </label>
                <input
                  id="frequency"
                  type="email"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="IF YOU WANT A REPLY"
                  className="mt-2 w-full border border-line bg-void/70 px-4 py-3 font-mono text-sm text-zinc-200 placeholder:text-zinc-700 focus:border-cy/60 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="message" className="font-mono text-[10px] tracking-[0.28em] text-zinc-500">
                MESSAGE *
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                minLength={4}
                maxLength={2000}
                rows={5}
                placeholder="SPEAK. THE MASK LISTENS."
                className="mt-2 w-full resize-none border border-line bg-void/70 px-4 py-3 font-mono text-sm text-zinc-200 placeholder:text-zinc-700 focus:border-cy/60 focus:outline-none"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={state === "sending"}
                data-cursor="TRANSMIT"
                className="flex items-center gap-2.5 border border-cy/50 bg-cy/10 px-6 py-3 font-mono text-xs tracking-[0.28em] text-cy transition-all hover:bg-cy/20 disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                {state === "sending" ? "TRANSMITTING..." : "TRANSMIT"}
              </button>
              {state === "sent" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs text-mint">
                  SIGNAL RECEIVED. HE WILL SEE IT.
                </motion.p>
              )}
              {state === "error" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs text-blood">
                  {error}
                </motion.p>
              )}
            </div>
            <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-zinc-700">
              SIGNALS ARE STORED SERVER-SIDE. NO TRACKING. NO NOISE.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Colophon() {
  const { setTerminalOpen } = useExperience();
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line/60 bg-black/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-12 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 64 72" className="h-8 w-8" aria-hidden>
            <path d="M32 4 L56 15 L60 31 L52 48 L40 62 L32 67 L24 62 L12 48 L4 31 L8 15 Z" fill="#0d1116" stroke="#67e8f9" strokeOpacity="0.6" strokeWidth="1.6" />
            <path d="M17 30 L29 27.6 L30 31 L18.4 33.4 Z" fill="#67e8f9" />
            <path d="M47 30 L35 27.6 L34 31 L45.6 33.4 Z" fill="#67e8f9" />
          </svg>
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-zinc-300">
              THE MASKED<span className="text-cy">MAN</span>
            </p>
            <p className="font-mono text-[10px] tracking-[0.2em] text-zinc-600">
              © {year} — BUILT IN THE DARK. SHIPPED IN SILENCE.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.24em] text-zinc-500" aria-label="Footer">
          {["STORY", "SKILLS", "MISSIONS", "NEXUS", "FUTURE"].map((l) => (
            <button key={l} onClick={() => scrollToId(l.toLowerCase())} className="transition-colors hover:text-cy">
              {l}
            </button>
          ))}
        </nav>

        <div className="text-center md:text-right">
          <button
            onClick={() => setTerminalOpen(true)}
            className="font-mono text-[10px] tracking-[0.2em] text-zinc-600 transition-colors hover:text-cy"
            data-cursor="SECRET"
          >
            PSST — THERE IS A TERMINAL HIDDEN IN THIS WORLD.
            <br />
            IT ANSWERS TO THE <span className="border border-line px-1 text-cy">`</span> KEY.
          </button>
          <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-zinc-700">
            FACE: RESTRICTED · MASK: PERMANENT
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function EndScreen() {
  return (
    <>
      <Teaser />
      <FinalScreen />
      <Signal />
      <Colophon />
    </>
  );
}
