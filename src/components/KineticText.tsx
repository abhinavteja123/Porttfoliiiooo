import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/useReducedMotion";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  /** delay before the stagger begins (s) */
  delay?: number;
  /** play on scroll-into-view instead of on mount */
  onScroll?: boolean;
  ariaLabel?: string;
};

/**
 * Splits text into per-character spans and reveals them with a rising,
 * weight-shifting stagger — the site's kinetic-typography signature. The full
 * string stays in an aria-label so screen readers get clean text, and under
 * reduced motion characters appear immediately.
 */
export function KineticText({
  text,
  className = "",
  as = "span",
  delay = 0,
  onScroll = false,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLElement>("[data-char]");
    if (!chars.length) return;

    if (prefersReducedMotion()) {
      gsap.set(chars, { yPercent: 0, autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 120, autoAlpha: 0, rotateZ: 6 });
      gsap.to(chars, {
        yPercent: 0,
        autoAlpha: 1,
        rotateZ: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.035,
        delay,
        scrollTrigger: onScroll ? { trigger: el, start: "top 85%", once: true } : undefined,
      });
    }, el);
    return () => ctx.revert();
  }, [text, delay, onScroll]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ display: "inline-block" }}
    >
      <span className="sr-only">{ariaLabel ?? text}</span>
      <span aria-hidden="true" style={{ display: "inline-block" }} data-chars>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <span data-char style={{ display: "inline-block", willChange: "transform" }}>
            {ch === " " ? " " : ch}
          </span>
        </span>
      ))}
      </span>
    </Tag>
  );
}
