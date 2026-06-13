/**
 * Lightweight mutable singleton shared between the DOM layer and the WebGL
 * layer. R3F renders in its own reconciler, so instead of bridging React
 * context across that boundary we write per-frame values here (no re-renders)
 * and read them inside `useFrame`. Updated by Lenis (scroll) and a global
 * pointermove listener.
 */
export const appState = {
  /** Normalised scroll progress through the whole page, 0..1 */
  scrollProgress: 0,
  /** Section index the blob should morph toward (0..N-1) */
  morphTarget: 0,
  /** Pointer in normalised device coords, -1..1 */
  pointer: { x: 0, y: 0 },
  /** Smoothed pointer for inertial effects */
  pointerLerp: { x: 0, y: 0 },
  /** True once the preloader has finished and the hero is revealed */
  entered: false,
};

export type AppState = typeof appState;
