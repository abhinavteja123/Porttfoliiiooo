import { useState } from "react";
import { sections, identity } from "../data/content";
import { useMagnetic } from "../lib/useMagnetic";

function NavLink({ id, label }: { id: string; label: string }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.4);
  return (
    <a
      ref={ref}
      href={`#${id}`}
      data-cursor
      className="relative inline-block px-1 py-1 text-fluid-sm text-ink-soft transition-colors hover:text-ink"
    >
      {label}
    </a>
  );
}

/** Minimal fixed nav: name mark + anchor links. Collapses to a menu on mobile. */
export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="section-shell flex items-center justify-between py-5" aria-label="Primary">
        <a href="#hero" className="font-display text-fluid-base font-semibold tracking-tight">
          AT<span className="text-iris-a">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {sections.slice(1).map((s) => (
            <NavLink key={s.id} id={s.id} label={s.label} />
          ))}
        </div>

        <a
          href={`mailto:${identity.email}`}
          data-cursor
          className="hidden rounded-full border border-ink/15 px-4 py-2 text-fluid-sm transition-colors hover:bg-ink hover:text-cream md:inline-block"
        >
          Let's talk
        </a>

        <button
          className="md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-[2px] w-7 bg-ink transition-transform" />
          <span className="mt-1.5 block h-[2px] w-7 bg-ink" />
        </button>
      </nav>

      {open && (
        <div className="glass mx-4 rounded-2xl p-6 md:hidden">
          <ul className="flex flex-col gap-3">
            {sections.slice(1).map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block py-1 text-fluid-lg"
                  onClick={() => setOpen(false)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
