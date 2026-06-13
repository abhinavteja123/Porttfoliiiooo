import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/useReducedMotion";

/**
 * Custom cursor: a precise dot + a lagging ring that grows over interactive
 * elements (anything that is a link, button, or carries [data-cursor]).
 * Only active on fine pointers; never hijacks keyboard users.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    document.body.setAttribute("data-custom-cursor", "on");
    const reduced = prefersReducedMotion();

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (reduced) ring.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      hovering = !!t.closest("a, button, [data-cursor]");
      ring.dataset.hover = hovering ? "true" : "false";
    };

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    if (!reduced) raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      document.body.removeAttribute("data-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        data-hover="false"
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-ink/40 transition-[width,height,background-color,border-color] duration-300 ease-expo data-[hover=true]:h-16 data-[hover=true]:w-16 data-[hover=true]:border-iris-a data-[hover=true]:bg-iris-a/10"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
