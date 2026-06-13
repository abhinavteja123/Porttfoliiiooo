/**
 * Zero-WebGL fallback for reduced-motion and low-power devices. A pure-CSS
 * iridescent gradient orb with a soft blur — keeps the Liquid Light identity
 * without a render loop. Animation collapses automatically under
 * prefers-reduced-motion (see index.css global rule).
 */
export function StaticBlob() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 blur-2xl"
        style={{
          background:
            "conic-gradient(from 90deg, #6E8BFF, #FF8FB1, #8FF0C8, #6E8BFF)",
          animation: "spin 22s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: translate(-50%, -50%) rotate(360deg); } }`}</style>
    </div>
  );
}
