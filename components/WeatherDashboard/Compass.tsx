import { Navigation2 } from "lucide-react";

const COMPASS_LABELS = [
  ["N", "left-1/2 top-1.5 -translate-x-1/2"],
  ["E", "right-2 top-1/2 -translate-y-1/2"],
  ["S", "bottom-1.5 left-1/2 -translate-x-1/2"],
  ["W", "left-2 top-1/2 -translate-y-1/2"],
] as const;

function Compass({
  degrees,
  accentText,
  label,
}: {
  degrees: number;
  accentText: string;
  label: string;
}) {
  // Meteorological wind direction is where the wind comes FROM.
  // The arrow shows where it is heading, so it is turned 180°.
const rotation = (((degrees + 180) % 360) + 360) % 360;

  return (
    <div
      role="img"
      aria-label={label}
      className="relative size-24 shrink-0 rounded-full border border-white/60 bg-white/30 sm:size-28"
    >
      {COMPASS_LABELS.map(([letter, position]) => (
        <span
          key={letter}
          aria-hidden="true"
          className={`absolute text-xs leading-none ${position} ${
            letter === "N" ? "font-semibold text-sky-950" : "font-medium text-slate-700"
          }`}
        >
          {letter}
        </span>
      ))}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Navigation2 className={`size-9 fill-current ${accentText}`} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default Compass;