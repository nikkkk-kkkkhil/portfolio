import { useEffect, useId, useRef } from "react";

interface MaskProps {
  className?: string;
  accent?: string;
  reactive?: boolean;
  variant?: "full" | "shadow";
  scan?: boolean;
  float?: boolean;
  label?: string;
}

/**
 * THE MASK — the identity of the entire site.
 * Cursor-reactive tilt + gaze, animated sheen, scanning line, glowing eyes.
 * The face is never revealed; there is only the mask.
 */
export default function Mask({
  className = "",
  accent = "#67e8f9",
  reactive = false,
  variant = "full",
  scan = true,
  float = false,
  label = "The mask of The Masked Man",
}: MaskProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const sheenRef = useRef<SVGRectElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ids = {
    face: `mm-face-${uid}`,
    edge: `mm-edge-${uid}`,
    sheen: `mm-sheen-${uid}`,
    scan: `mm-scan-${uid}`,
    halo: `mm-halo-${uid}`,
    glow: `mm-glow-${uid}`,
    clip: `mm-clip-${uid}`,
  };

  useEffect(() => {
    if (!reactive) return;
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.current.x = Math.max(-1, Math.min(1, (e.clientX - cx) / 420));
      target.current.y = Math.max(-1, Math.min(1, (e.clientY - cy) / 420));
    };
    let raf = 0;
    const cur = { x: 0, y: 0 };
    const loop = () => {
      cur.x += (target.current.x - cur.x) * 0.08;
      cur.y += (target.current.y - cur.y) * 0.08;
      if (tiltRef.current) {
        tiltRef.current.style.transform = `perspective(700px) rotateY(${
          cur.x * 9
        }deg) rotateX(${cur.y * -7}deg)`;
      }
      if (eyesRef.current) {
        eyesRef.current.style.transform = `translate(${cur.x * 3.4}px, ${
          cur.y * 2.4
        }px)`;
      }
      if (sheenRef.current) {
        sheenRef.current.setAttribute("x", String(30 + cur.x * 46));
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reactive]);

  const shadow = variant === "shadow";

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={label}
      className={`${float ? "animate-floaty" : ""} ${className}`}
      style={{ ["--maska" as string]: accent }}
    >
      <div ref={tiltRef} className="will-change-transform">
        <svg viewBox="0 0 220 270" className="h-full w-full">
          <defs>
            <linearGradient id={ids.face} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={shadow ? "#0a0d12" : "#1b212a"} />
              <stop offset="0.55" stopColor={shadow ? "#07090d" : "#12161d"} />
              <stop offset="1" stopColor={shadow ? "#04060a" : "#0a0d12"} />
            </linearGradient>
            <linearGradient id={ids.edge} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(226,241,247,0.5)" />
              <stop offset="0.3" stopColor="rgba(226,241,247,0.06)" />
              <stop offset="1" stopColor="var(--maska)" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id={ids.sheen} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.14" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={ids.scan} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--maska)" stopOpacity="0" />
              <stop offset="0.5" stopColor="var(--maska)" stopOpacity="0.5" />
              <stop offset="1" stopColor="var(--maska)" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={ids.halo} cx="0.5" cy="0.42" r="0.6">
              <stop offset="0" stopColor="var(--maska)" stopOpacity="0.22" />
              <stop offset="1" stopColor="var(--maska)" stopOpacity="0" />
            </radialGradient>
            <filter id={ids.glow} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="3.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id={ids.clip}>
              <path d="M110 22 L168 54 L178 102 L158 158 L126 210 L110 222 L94 210 L62 158 L42 102 L52 54 Z" />
            </clipPath>
          </defs>

          {/* halo */}
          <ellipse cx="110" cy="120" rx="104" ry="112" fill={`url(#${ids.halo})`} />

          {/* hood silhouette */}
          <path
            d="M110 4 C62 4 36 42 30 92 C24 142 34 190 58 226 L50 268 L170 268 L162 226 C186 190 196 142 190 92 C184 42 158 4 110 4 Z"
            fill="#06080c"
            stroke="rgba(148,163,184,0.12)"
            strokeWidth="1"
          />

          {/* face plate */}
          <path
            d="M110 22 L168 54 L178 102 L158 158 L126 210 L110 222 L94 210 L62 158 L42 102 L52 54 Z"
            fill={`url(#${ids.face})`}
            stroke={`url(#${ids.edge})`}
            strokeWidth="1.4"
          />

          {/* inner plate */}
          <path
            d="M110 36 L152 62 L160 100 L146 142 L122 186 L110 196 L98 186 L74 142 L60 100 L68 62 Z"
            fill="none"
            stroke="rgba(226,241,247,0.09)"
            strokeWidth="1"
          />

          {/* forehead mark + ridge */}
          <path
            d="M110 32 L122 50 L110 68 L98 50 Z"
            fill="var(--maska)"
            opacity={shadow ? 0.16 : 0.28}
          />
          <line
            x1="110"
            y1="68"
            x2="110"
            y2="92"
            stroke="var(--maska)"
            strokeOpacity="0.45"
            strokeWidth="1"
          />

          {/* temple circuits */}
          <path d="M56 88 L66 94" stroke="rgba(226,241,247,0.14)" strokeWidth="1" />
          <path d="M164 88 L154 94" stroke="rgba(226,241,247,0.14)" strokeWidth="1" />
          <circle cx="54" cy="86" r="1.6" fill="var(--maska)" opacity="0.5" />
          <circle cx="166" cy="86" r="1.6" fill="var(--maska)" opacity="0.5" />

          {/* eye sockets */}
          <path d="M64 104 L98 97 L102 110 L70 117 Z" fill="#05070a" stroke="rgba(226,241,247,0.16)" strokeWidth="0.8" />
          <path d="M156 104 L122 97 L118 110 L150 117 Z" fill="#05070a" stroke="rgba(226,241,247,0.16)" strokeWidth="0.8" />

          {/* glowing eye slits — gaze-follows group */}
          <g ref={eyesRef}>
            <path d="M70 106 L94 101 L96.5 107.5 L73 113 Z" fill="var(--maska)" filter={`url(#${ids.glow})`} className="animate-flicker" />
            <path d="M150 106 L126 101 L123.5 107.5 L147 113 Z" fill="var(--maska)" filter={`url(#${ids.glow})`} className="animate-flicker" />
          </g>

          {/* cheek plates */}
          <path d="M62 124 L88 121 L82 152 L66 160" fill="none" stroke="var(--maska)" strokeOpacity="0.22" strokeWidth="1" />
          <path d="M158 124 L132 121 L138 152 L154 160" fill="none" stroke="var(--maska)" strokeOpacity="0.22" strokeWidth="1" />

          {/* nose bridge */}
          <path d="M110 112 L102 150 L110 160 L118 150 Z" fill="#0b0e13" stroke="rgba(226,241,247,0.12)" strokeWidth="0.8" />

          {/* mouth vents */}
          <g stroke="rgba(226,241,247,0.28)" strokeWidth="1.4" strokeLinecap="round">
            <line x1="97" y1="172" x2="123" y2="172" />
            <line x1="100" y1="181" x2="120" y2="181" />
            <line x1="104" y1="190" x2="116" y2="190" />
          </g>

          {/* chin */}
          <path d="M98 200 L110 209 L122 200" fill="none" stroke="rgba(226,241,247,0.14)" strokeWidth="1" />

          {/* animated sheen + scanline, clipped to face */}
          <g clipPath={`url(#${ids.clip})`}>
            <rect
              ref={sheenRef}
              x="30"
              y="10"
              width="60"
              height="220"
              fill={`url(#${ids.sheen})`}
              transform="skewX(-14)"
            />
            {scan && (
              <rect
                x="40"
                y="0"
                width="140"
                height="16"
                fill={`url(#${ids.scan})`}
                className="animate-scan-y"
              />
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
