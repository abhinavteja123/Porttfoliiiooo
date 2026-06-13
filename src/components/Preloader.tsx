import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { appState } from "../lib/store";
import { prefersReducedMotion } from "../lib/useReducedMotion";

/**
 * Cinematic intro: an animated percentage counter + filling iris line, then a
 * gooey mask wipe that lifts to reveal the hero. Sets appState.entered so the
 * 3D blob "wakes up" only after the reveal. Reduced motion = quick fade.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const root = rootRef.current!;
    const reduced = prefersReducedMotion();

    const finish = () => {
      appState.entered = true;
      onDone();
    };

    if (reduced) {
      setPct(100);
      gsap.to(root, {
        autoAlpha: 0,
        duration: 0.4,
        onComplete: () => {
          root.style.display = "none";
          finish();
        },
      });
      return;
    }

    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.to(counter, {
      v: 100,
      duration: 2.0,
      ease: "power2.inOut",
      onUpdate: () => setPct(Math.round(counter.v)),
    });
    if (fillRef.current) {
      tl.to(fillRef.current, { scaleX: 1, duration: 2.0, ease: "power2.inOut" }, 0);
    }
    // Gooey wipe up: two stacked panels lift with a slight offset.
    tl.to(
      root.querySelectorAll<HTMLElement>("[data-panel]"),
      {
        yPercent: -100,
        duration: 1.1,
        ease: "expo.inOut",
        stagger: 0.08,
      },
      ">-0.1",
    );
    tl.to(root, { autoAlpha: 0, duration: 0.01 }).set(root, { display: "none" }).add(finish);

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[80]" aria-hidden="true">
      <div data-panel className="absolute inset-0 bg-cream" />
      <div data-panel className="absolute inset-0 flex flex-col items-center justify-center bg-cream">
        <div className="font-display text-[18vw] leading-none text-ink/90 tabular-nums sm:text-[12vw]">
          {pct}
          <span className="align-top text-[4vw] text-iris-a">%</span>
        </div>
        <div className="mt-6 h-[2px] w-[42vw] max-w-md overflow-hidden bg-ink/10">
          <div ref={fillRef} className="h-full w-full origin-left scale-x-0 bg-iris" />
        </div>
        <p className="mt-6 font-sans text-fluid-sm uppercase tracking-[0.3em] text-ink-soft">
          Abhinav Teja
        </p>
      </div>
    </div>
  );
}
