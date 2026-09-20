"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getMission, type Mission } from "@/data/missions";

interface ExperienceState {
  entered: boolean;
  enter: () => void;
  reEnter: () => void;
  activeMission: Mission | null;
  openMission: (slug: string) => void;
  closeMission: () => void;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  nexusOpen: boolean;
  setNexusOpen: (v: boolean) => void;
}

const Ctx = createContext<ExperienceState | null>(null);

export function useExperience() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useExperience outside provider");
  return ctx;
}

export default function ExperienceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [entered, setEntered] = useState(false);
  const [missionSlug, setMissionSlug] = useState<string | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [nexusOpen, setNexusOpen] = useState(false);

  const enter = useCallback(() => setEntered(true), []);
  const reEnter = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setEntered(false);
  }, []);
  const openMission = useCallback((slug: string) => setMissionSlug(slug), []);
  const closeMission = useCallback(() => setMissionSlug(null), []);

  const value = useMemo<ExperienceState>(
    () => ({
      entered,
      enter,
      reEnter,
      activeMission: missionSlug ? (getMission(missionSlug) ?? null) : null,
      openMission,
      closeMission,
      terminalOpen,
      setTerminalOpen,
      nexusOpen,
      setNexusOpen,
    }),
    [
      entered,
      enter,
      reEnter,
      missionSlug,
      openMission,
      closeMission,
      terminalOpen,
      nexusOpen,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
