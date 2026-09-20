"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Brain,
  Bug,
  Coffee,
  Headphones,
  Keyboard,
  Laptop,
  Rocket,
} from "lucide-react";
import { MonoLabel, Reveal } from "../SectionChrome";

interface Item {
  icon: LucideIcon;
  name: string;
  rarity: string;
  rarityTone: string;
  desc: string;
}

const ITEMS: Item[] = [
  { icon: Laptop, name: "LAPTOP", rarity: "CORE", rarityTone: "text-cy border-cy/40", desc: "The forge itself. Every mission started here." },
  { icon: Keyboard, name: "KEYBOARD", rarity: "CORE", rarityTone: "text-cy border-cy/40", desc: "200+ WPM of pure intent. Keys gently abused since day one." },
  { icon: Headphones, name: "HEADPHONES", rarity: "CORE", rarityTone: "text-cy border-cy/40", desc: "Focus-field generator. On: world muted, code loud." },
  { icon: Coffee, name: "COFFEE", rarity: "CONSUMABLE", rarityTone: "text-amberish border-amberish/40", desc: "Liquid compile time. Restores +40 stamina per cup." },
  { icon: BookOpen, name: "DOCUMENTATION", rarity: "TOME", rarityTone: "text-viol border-viol/40", desc: "The ancient texts. He actually reads them." },
  { icon: Bug, name: "BUG", rarity: "CURSED", rarityTone: "text-blood border-blood/40", desc: "Follows him everywhere. He keeps it as a pet now." },
  { icon: Brain, name: "CURIOSITY", rarity: "PASSIVE", rarityTone: "text-mint border-mint/40", desc: "Passive Ability: Never stops asking “What if?”" },
  { icon: Rocket, name: "NEXUS BLUEPRINT", rarity: "LEGENDARY", rarityTone: "text-viol border-viol/40", desc: "The dream, sketched in full. Status: still loading…" },
];

export default function Inventory() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <MonoLabel>// CHARACTER INVENTORY</MonoLabel>
              <h3 className="mt-3 font-sans text-2xl font-bold text-zinc-100 sm:text-3xl">
                LOADOUT
              </h3>
            </div>
            <p className="hidden font-mono text-[10px] tracking-[0.24em] text-zinc-600 sm:block">
              HOVER TO INSPECT · 8/8 SLOTS
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal key={item.name} delay={0.05 * i}>
              <div
                tabIndex={0}
                className="group relative border border-line bg-panel/50 p-5 outline-none transition-all duration-300 hover:border-cy/40 hover:bg-panel focus:border-cy/50"
              >
                <item.icon className="h-7 w-7 text-zinc-500 transition-colors duration-300 group-hover:text-cy" />
                <p className="mt-4 font-mono text-xs tracking-[0.2em] text-zinc-300">
                  {item.name}
                </p>
                <span
                  className={`mt-2 inline-block border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.22em] ${item.rarityTone}`}
                >
                  {item.rarity}
                </span>

                {/* inspect tooltip */}
                <div
                  className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 border border-line2 bg-void/95 p-3.5 opacity-0 shadow-xl backdrop-blur transition-all duration-200 group-hover:opacity-100 group-focus:opacity-100"
                  aria-hidden
                >
                  <p className="font-mono text-[10px] tracking-[0.26em] text-cy">
                    {item.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] tracking-[0.2em] text-zinc-600">
                    {item.rarity} ITEM
                  </p>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
