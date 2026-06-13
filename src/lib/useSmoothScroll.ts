import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { appState } from "./store";
import { prefersReducedMotion } from "./useReducedMotion";

/**
 * Sets up Lenis smooth scrolling and wires it into GSAP's ticker so
 * ScrollTrigger stays in perfect sync (no scroll-jank, single rAF loop).
 * Also publishes normalised scroll progress into the shared appState for the
 * WebGL layer. Skips entirely under prefers-reduced-motion — native scrolling
 * stays, ScrollTriggers still fire on the real scroll position.
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    const updateProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      appState.scrollProgress = max > 0 ? window.scrollY / max : 0;
    };

    if (reduced) {
      // No Lenis. Keep ScrollTrigger working off native scroll + track progress.
      window.addEventListener("scroll", updateProgress, { passive: true });
      updateProgress();
      return () => window.removeEventListener("scroll", updateProgress);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
      updateProgress();
    });

    const tick = (time: number) => {
      // gsap ticker time is seconds; Lenis expects ms
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    updateProgress();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
