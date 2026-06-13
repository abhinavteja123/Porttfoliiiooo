import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { prefersReducedMotion } from "./useReducedMotion";

/**
 * Shared reveal grammar for the whole site: children matching `selector`
 * (default `[data-reveal]`) rise + fade + unclip in a stagger as the container
 * scrolls into view. One vocabulary everywhere = a consistent motion language.
 * Under reduced motion everything is simply made visible immediately.
 */
export function useScrollReveal<T extends HTMLElement>(
  selector = "[data-reveal]",
  opts: { y?: number; stagger?: number; start?: string } = {},
) {
  const scope = useRef<T>(null);
  const { y = 40, stagger = 0.09, start = "top 80%" } = opts;

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { autoAlpha: 1, y: 0, clipPath: "none" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y, clipPath: "inset(0 0 100% 0)" },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "expo.out",
          stagger,
          scrollTrigger: { trigger: root, start, once: true },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [selector, y, stagger, start]);

  return scope;
}

export { ScrollTrigger };
