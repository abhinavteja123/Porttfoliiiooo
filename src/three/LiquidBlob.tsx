import { useMemo, useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./glsl";
import { appState } from "../lib/store";

/** Brand colours as linear-ish vec3s. */
const COLOR_A = new THREE.Color("#6E8BFF");
const COLOR_B = new THREE.Color("#FF8FB1");
const COLOR_C = new THREE.Color("#8FF0C8");

const LiquidMaterial = shaderMaterial(
  {
    uTime: 0,
    uAmp: 0.22,
    uFreq: 1.1,
    uMorph: 0,
    uFade: 1,
    uPointer: new THREE.Vector3(0, 0, 1),
    uPointerAmp: 0.0,
    uColorA: COLOR_A.clone(),
    uColorB: COLOR_B.clone(),
    uColorC: COLOR_C.clone(),
  },
  vertexShader,
  fragmentShader,
);

extend({ LiquidMaterial });

type Uniforms = {
  uTime: { value: number };
  uMorph: { value: number };
  uFade: { value: number };
  uPointer: { value: THREE.Vector3 };
  uPointerAmp: { value: number };
};

export function LiquidBlob({ detail = 64 }: { detail?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial & { uniforms: Uniforms }>(null);
  const pointer3 = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const targetMorph = useRef(0);

  useFrame((_, delta) => {
    const mat = matRef.current;
    const mesh = meshRef.current;
    if (!mat || !mesh) return;

    mat.uniforms.uTime.value += delta;

    // Scroll progress -> morph, eased.
    targetMorph.current = appState.scrollProgress;
    mat.uniforms.uMorph.value +=
      (targetMorph.current - mat.uniforms.uMorph.value) * Math.min(1, delta * 2.5);

    // Pointer -> object-space direction + bulge, smoothed.
    const px = appState.pointerLerp.x;
    const py = appState.pointerLerp.y;
    pointer3.set(px, py, 0.8).normalize();
    mat.uniforms.uPointer.value.lerp(pointer3, Math.min(1, delta * 3));
    const targetAmp = appState.entered ? 0.14 : 0.0;
    mat.uniforms.uPointerAmp.value +=
      (targetAmp - mat.uniforms.uPointerAmp.value) * Math.min(1, delta * 2);

    // Idle rotation + gentle pointer-following tilt.
    mesh.rotation.y += delta * 0.12;
    mesh.rotation.x += (py * 0.25 - mesh.rotation.x) * Math.min(1, delta * 1.5);

    // Breathe + scale down slightly as you scroll deeper.
    const breathe = 1 + Math.sin(mat.uniforms.uTime.value * 0.6) * 0.015;
    const s = breathe * (1 - appState.scrollProgress * 0.18);
    mesh.scale.setScalar(s);

    // Fade the blob back to an ambient presence after the hero so the text-heavy
    // sections stay readable. Full in the hero, ~0.2 by mid-page.
    const fade = Math.max(0.18, 1 - appState.scrollProgress * 1.7);
    mat.uniforms.uFade.value += (fade - mat.uniforms.uFade.value) * Math.min(1, delta * 3);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.25, detail]} />
      {/* @ts-expect-error custom material element registered via extend() */}
      <liquidMaterial ref={matRef} transparent depthWrite={false} />
    </mesh>
  );
}
