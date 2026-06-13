import { Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { LiquidBlob } from "./LiquidBlob";
import { appState } from "../lib/store";
import { useIsMobile } from "../lib/useIsMobile";

/** Smooths the raw pointer into appState.pointerLerp and drifts the camera. */
function Rig() {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const k = Math.min(1, delta * 2.2);
    appState.pointerLerp.x += (appState.pointer.x - appState.pointerLerp.x) * k;
    appState.pointerLerp.y += (appState.pointer.y - appState.pointerLerp.y) * k;

    // Subtle parallax drift; camera always looks at origin.
    const tx = appState.pointerLerp.x * 0.5;
    const ty = appState.pointerLerp.y * 0.4;
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene() {
  const isMobile = useIsMobile();

  // Global pointer tracking (normalised -1..1). Lives outside the canvas so it
  // keeps working regardless of where the cursor is on the page.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      appState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      appState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      className="!fixed inset-0"
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 0, 4], fov: 35 }}
      style={{ background: "transparent" }}
    >
      {/* Cream in-canvas background: the EffectComposer renders opaque, so we
          paint the brand base here rather than relying on a transparent buffer.
          Keeps the light theme correct and text readable. */}
      <color attach="background" args={["#F4F2EC"]} />
      <Suspense fallback={null}>
        <Rig />
        <LiquidBlob detail={isMobile ? 24 : 64} />
        <EffectComposer multisampling={isMobile ? 0 : 4}>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.5}
            mipmapBlur
          />
          <Noise blendFunction={BlendFunction.OVERLAY} opacity={isMobile ? 0.05 : 0.09} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
