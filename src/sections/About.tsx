import { useEffect, useRef } from "react";
import { SectionHeading } from "../components/SectionHeading";
import { about } from "../data/content";
import { useScrollReveal } from "../lib/useScrollReveal";
import { gsap } from "../lib/gsap";
import { prefersReducedMotion } from "../lib/useReducedMotion";

export function About() {
  const scope = useScrollReveal<HTMLDivElement>();
  const portraitRef = useRef<HTMLDivElement>(null);

  // Parallax depth on the portrait as the section scrolls.
  useEffect(() => {
    const el = portraitRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(el.querySelector("[data-portrait-img]"), {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative py-28 sm:py-36" aria-label="About">
      <div ref={scope} className="section-shell">
        <SectionHeading index="01" title="About" kicker="The person behind the pixels" />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                data-reveal
                className="font-display text-fluid-lg leading-snug text-ink first:text-iris"
              >
                {p}
              </p>
            ))}

            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6 sm:max-w-md">
              {about.facts.map((f) => (
                <div key={f.k} data-reveal className="border-t border-ink/10 pt-3">
                  <dt className="font-sans text-fluid-sm uppercase tracking-wider text-ink-soft">
                    {f.k}
                  </dt>
                  <dd className="mt-1 font-sans text-fluid-base text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Portrait through a glass lens. TODO: drop a real /public/portrait.jpg */}
          <div ref={portraitRef} data-reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <div
                data-portrait-img
                className="absolute inset-0 scale-110"
                style={{
                  background:
                    "radial-gradient(120% 120% at 30% 20%, #6E8BFF, transparent 55%), radial-gradient(120% 120% at 80% 90%, #FF8FB1, transparent 55%), #14141A",
                }}
              />
              <div className="glass absolute inset-0 flex items-end p-6">
                <span className="font-sans text-fluid-sm uppercase tracking-[0.25em] text-ink">
                  {/* TODO: replace placeholder portrait */}
                  Portrait — TODO
                </span>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.4rem] bg-iris opacity-30 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
