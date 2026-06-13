import { useState, type FormEvent } from "react";
import { KineticText } from "../components/KineticText";
import { identity } from "../data/content";
import { useMagnetic } from "../lib/useMagnetic";
import { useScrollReveal } from "../lib/useScrollReveal";

function Field({
  id,
  label,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <div className="group relative">
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          required
          placeholder=" "
          className="peer w-full resize-none border-b border-ink/20 bg-transparent py-3 font-sans text-fluid-base outline-none transition-colors focus:border-iris-a"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required
          placeholder=" "
          className="peer w-full border-b border-ink/20 bg-transparent py-3 font-sans text-fluid-base outline-none transition-colors focus:border-iris-a"
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-3 origin-left font-sans text-fluid-base text-ink-soft transition-all duration-300 ease-expo peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-iris-a peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-75"
      >
        {label}
      </label>
      {/* animated focus underline */}
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-iris transition-transform duration-500 ease-expo peer-focus:scale-x-100" />
    </div>
  );
}

function MagneticSubmit({ children }: { children: React.ReactNode }) {
  const ref = useMagnetic<HTMLButtonElement>(0.4);
  return (
    <button
      ref={ref}
      type="submit"
      data-cursor
      className="relative inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-sans text-fluid-base text-cream transition-colors hover:bg-iris-a"
    >
      {children}
    </button>
  );
}

export function Contact() {
  const scope = useScrollReveal<HTMLDivElement>();
  const [sent, setSent] = useState(false);

  // TODO: wire to a real endpoint (Formspree / Resend / your API).
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("email")}`);
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36" aria-label="Contact">
      <div ref={scope} className="section-shell">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <p data-reveal className="mb-4 font-sans text-fluid-sm uppercase tracking-[0.3em] text-iris-a">
              Let's make something
            </p>
            <KineticText
              as="h2"
              onScroll
              text="Get in touch"
              className="font-display text-fluid-2xl font-semibold leading-[0.9]"
            />
            <p data-reveal className="mt-8 max-w-md font-sans text-fluid-lg text-ink-soft">
              Have a project, a role, or a wild idea? I'm always up for work that bends the medium.
            </p>

            <a
              data-reveal
              data-cursor
              href={`mailto:${identity.email}`}
              className="mt-8 inline-block font-display text-fluid-lg text-iris underline-offset-4 hover:underline"
            >
              {identity.email}
            </a>

            <ul data-reveal className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {identity.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor
                    className="font-sans text-fluid-base text-ink-soft transition-colors hover:text-ink"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form data-reveal onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
            <Field id="name" label="Your name" />
            <Field id="email" label="Email" type="email" />
            <Field id="message" label="Message" textarea />
            <div className="mt-2 flex items-center gap-4">
              <MagneticSubmit>
                {sent ? "Opening mail…" : "Send message"}
                <span aria-hidden="true">→</span>
              </MagneticSubmit>
              <span aria-live="polite" className="font-sans text-fluid-sm text-ink-soft">
                {sent ? "Thanks — your mail client should open." : ""}
              </span>
            </div>
          </form>
        </div>
      </div>

      <footer className="section-shell mt-28 flex flex-col items-center gap-2 border-t border-ink/10 pt-10 text-center">
        <span className="font-display text-fluid-lg text-iris">Abhinav Teja</span>
        <span className="font-sans text-fluid-sm text-ink-soft">
          Creative AI Engineer · Immersive · Interactive · Cinematic
        </span>
        <span className="mt-2 font-sans text-fluid-sm text-ink-soft">
          {/* TODO: update year/credits */}© {new Date().getFullYear()} — Built with React, R3F & GSAP
        </span>
      </footer>
    </section>
  );
}
