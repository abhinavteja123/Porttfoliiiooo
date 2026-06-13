import { lazy, Suspense } from "react";
import { StaticBlob } from "./StaticBlob";
import { useReducedMotion } from "../lib/useReducedMotion";
import { isLowPowerDevice } from "../lib/useIsMobile";

// Heavy 3D stack is code-split: it only loads after the hero paints and only
// on capable, motion-OK devices.
const Scene = lazy(() => import("./Scene"));

/**
 * Fixed full-viewport background layer that sits behind all DOM sections.
 * Chooses the WebGL scene or the CSS fallback based on capability + motion
 * preference.
 */
export function BackgroundCanvas() {
  const reduced = useReducedMotion();
  const lowPower = isLowPowerDevice();

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      {reduced || lowPower ? (
        <StaticBlob />
      ) : (
        <Suspense fallback={<StaticBlob />}>
          <Scene />
        </Suspense>
      )}
    </div>
  );
}
