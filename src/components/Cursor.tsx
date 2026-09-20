"use client";

import { useEffect, useRef, useState } from "react";

/** Custom crosshair cursor — desktop (fine pointer) only. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = e.target as HTMLElement | null;
      const hit = t?.closest("a, button, [role='button'], input, textarea, [data-cursor]");
      hovering = !!hit;
      if (labelRef.current) {
        const txt = hit?.getAttribute("data-cursor") ?? "";
        labelRef.current.textContent = txt;
        labelRef.current.style.opacity = txt ? "1" : "0";
      }
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${
          hovering ? 1.9 : 1
        })`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-cy"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[199] h-8 w-8 rounded-full border border-cy/50 transition-[border-color] duration-200"
        aria-hidden
      />
      <div
        ref={labelRef}
        className="pointer-events-none fixed bottom-6 left-1/2 z-[198] -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-cy/80 opacity-0 transition-opacity"
        aria-hidden
      />
    </>
  );
}
