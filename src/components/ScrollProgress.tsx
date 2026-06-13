import { useEffect, useRef } from "react";
import { appState } from "../lib/store";

/** Thin iridescent progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const el = ref.current;
      if (el) el.style.transform = `scaleX(${appState.scrollProgress})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-50 h-[3px] w-full bg-transparent"
      role="progressbar"
      aria-label="Page scroll progress"
    >
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-iris"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
