import { useEffect, useState } from "react";

/**
 * Tiered device capability. Mobile / low-power devices get a lighter 3D path
 * (fewer particles, no transmission, capped DPR). Breakpoint 768px + a coarse
 * pointer heuristic.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

/** One-shot check for whether we should even mount the heavy WebGL scene. */
export function isLowPowerDevice(): boolean {
  if (typeof window === "undefined") return true;
  const coarse = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  const fewCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  const smallMem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return coarse && (fewCores || (typeof smallMem === "number" && smallMem <= 4));
}
