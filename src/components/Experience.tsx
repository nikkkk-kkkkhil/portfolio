"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ExperienceProvider, { useExperience } from "./ExperienceProvider";
import Cursor from "./Cursor";
import Boot from "./Boot";
import Nav from "./Nav";
import Hero from "./Hero";
import BeforeMask from "./chapters/BeforeMask";
import FirstComputer from "./chapters/FirstComputer";
import WhyMask from "./chapters/WhyMask";
import Transformation from "./chapters/Transformation";
import Skills from "./sections/Skills";
import SystemTree from "./sections/SystemTree";
import Inventory from "./sections/Inventory";
import Missions from "./sections/Missions";
import Bosses from "./sections/Bosses";
import BuildLog from "./sections/BuildLog";
import StruggleStrength from "./sections/StruggleStrength";
import Nexus from "./sections/Nexus";
import FutureMission from "./sections/FutureMission";
import Finale from "./finale/Finale";
import EndScreen from "./finale/EndScreen";
import MissionModal from "./modals/MissionModal";
import NexusOS from "./modals/NexusOS";
import SecretTerminal from "./terminal/SecretTerminal";

function Shell() {
  const { entered, activeMission, closeMission, nexusOpen, terminalOpen } =
    useExperience();

  // global scroll lock — boot, overlays
  useEffect(() => {
    const locked = !entered || !!activeMission || nexusOpen || terminalOpen;
    document.documentElement.style.overflow = locked ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [entered, activeMission, nexusOpen, terminalOpen]);

  // mission modal close channel
  useEffect(() => {
    const close = () => closeMission();
    window.addEventListener("mm:close", close);
    return () => window.removeEventListener("mm:close", close);
  }, [closeMission]);

  return (
    <>
      <Cursor />
      <div className="vignette" aria-hidden />
      <div className="noise-overlay" aria-hidden />

      {!entered && <Boot />}

      {entered && (
        <>
          <Nav />
          <main className="relative">
            <Hero />
            <BeforeMask />
            <FirstComputer />
            <WhyMask />
            <Transformation />
            <Skills />
            <SystemTree />
            <Inventory />
            <Missions />
            <Bosses />
            <BuildLog />
            <StruggleStrength />
            <Nexus />
            <FutureMission />
            <Finale />
            <EndScreen />
          </main>
          <SecretTerminal />
        </>
      )}

      <AnimatePresence>
        {activeMission && (
          <MissionModal key={activeMission.slug} mission={activeMission} />
        )}
      </AnimatePresence>
      <AnimatePresence>{nexusOpen && <NexusOS />}</AnimatePresence>
    </>
  );
}

export default function Experience() {
  return (
    <ExperienceProvider>
      <Shell />
    </ExperienceProvider>
  );
}
