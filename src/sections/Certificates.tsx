import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "../components/SectionHeading";
import { certificates, type Certificate } from "../data/content";
import { useScrollReveal } from "../lib/useScrollReveal";
import { prefersReducedMotion } from "../lib/useReducedMotion";

function TiltCard({ cert, onOpen }: { cert: Certificate; onOpen: (c: Certificate) => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateZ(6px)`;
  };
  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  };

  return (
    <button
      ref={ref}
      data-reveal
      data-cursor
      onPointerMove={onMove}
      onPointerLeave={reset}
      onClick={() => onOpen(cert)}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl text-left transition-transform duration-300 ease-expo will-change-transform"
      style={{ background: `linear-gradient(135deg, hsl(${cert.hue} 80% 72%), hsl(${cert.hue + 50} 80% 74%))` }}
      aria-label={`View certificate: ${cert.title}`}
    >
      <div className="glass absolute inset-3 flex flex-col justify-between rounded-xl p-4">
        <span className="font-sans text-fluid-sm uppercase tracking-[0.2em] text-ink-soft">
          {cert.issuer}
        </span>
        <div>
          <h3 className="font-display text-fluid-base font-semibold leading-tight">{cert.title}</h3>
          <span className="font-sans text-fluid-sm text-ink-soft">{cert.year}</span>
        </div>
      </div>
      <span className="absolute right-4 top-4 text-fluid-sm text-ink/50 opacity-0 transition-opacity group-hover:opacity-100">
        ⤢
      </span>
    </button>
  );
}

export function Certificates() {
  const scope = useScrollReveal<HTMLDivElement>("[data-reveal]", { stagger: 0.08 });
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="relative py-28 sm:py-36" aria-label="Certificates">
      <div ref={scope} className="section-shell">
        <SectionHeading index="05" title="Certificates" kicker="Proof of work" />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-7">
          {certificates.map((c) => (
            <TiltCard key={c.title} cert={c} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} certificate`}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="glass relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* TODO: replace gradient with the real certificate scan */}
              <div
                className="aspect-[4/3] w-full"
                style={{
                  background: `linear-gradient(135deg, hsl(${active.hue} 80% 72%), hsl(${active.hue + 50} 80% 74%))`,
                }}
              />
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-display text-fluid-lg font-semibold">{active.title}</h3>
                  <p className="font-sans text-fluid-sm text-ink-soft">
                    {active.issuer} · {active.year}
                  </p>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-ink text-cream"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
