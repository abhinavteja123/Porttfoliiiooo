import { KineticText } from "./KineticText";

/** Consistent section header: index, kinetic title, accent rule. */
export function SectionHeading({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-12 flex flex-col gap-4 sm:mb-16">
      <div className="flex items-center gap-4" data-reveal>
        <span className="font-sans text-fluid-sm tabular-nums text-iris-a">{index}</span>
        <span className="h-px w-12 bg-iris" />
        {kicker && (
          <span className="font-sans text-fluid-sm uppercase tracking-[0.25em] text-ink-soft">
            {kicker}
          </span>
        )}
      </div>
      <KineticText
        as="h2"
        onScroll
        text={title}
        className="font-display text-fluid-xl font-semibold tracking-tight"
      />
    </div>
  );
}
