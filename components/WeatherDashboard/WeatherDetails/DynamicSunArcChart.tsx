export interface DynamicSunArcChartProps {
  /**
   * How far the sun has travelled from sunrise (0) to sunset (100).
   * Values outside 0–100, and non-finite values, are clamped to the nearest end.
   */
  progress: number;
}

/* Geometry of the semi-ellipse, in SVG user units (viewBox 0 0 200 70). */
const CX = 100; // ellipse centre x
const CY = 60; // ellipse centre y — also the horizon line
const RX = 90; // horizontal radius
const RY = 50; // vertical radius

const ARC_START_X = CX - RX; // sunrise point (10, 60)
const ARC_END_X = CX + RX; // sunset point (190, 60)

/** The full trajectory, drawn left to right over the top (sweep-flag = 1). */
const ARC_PATH = `M ${ARC_START_X} ${CY} A ${RX} ${RY} 0 0 1 ${ARC_END_X} ${CY}`;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

export default function DynamicSunArcChart({ progress }: DynamicSunArcChartProps) {
  const t = clamp01(Number.isFinite(progress) ? progress / 100 : 0);

  // Place the sun on the ellipse. At t = 0 the angle is π (left end, sunrise),
  // at t = 0.5 it is π/2 (top of the arc), at t = 1 it is 0 (right end, sunset).
  const angle = Math.PI * (1 - t);
  const sunX = (CX + RX * Math.cos(angle)).toFixed(2);
  const sunY = (CY - RY * Math.sin(angle)).toFixed(2);

  // The travelled part of the trajectory is a sub-arc of the same ellipse that
  // ends exactly at the sun. It spans at most half the ellipse, so large-arc = 0.
  // (A stroke-dasharray fill would drift from the sun: on an ellipse, equal angle
  // steps are not equal lengths along the curve.)
  const travelledPath = `M ${ARC_START_X} ${CY} A ${RX} ${RY} 0 0 1 ${sunX} ${sunY}`;

  return (
    <svg
      viewBox="0 0 200 70"
      role="img"
      aria-label={`The sun is ${Math.round(t * 100)}% of the way from sunrise to sunset`}
      className="block h-auto w-full overflow-visible"
    >
      {/* Horizon */}
      <line
        x1="0"
        y1={CY}
        x2="200"
        y2={CY}
        strokeWidth="1"
        strokeDasharray="4 4"
        className="stroke-slate-300"
      />

      {/* Full trajectory: stays dashed and grey ahead of the sun */}
      <path
        d={ARC_PATH}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 4"
        className="stroke-slate-400"
      />

      {/* Travelled part: solid amber, drawn over the dashes behind the sun */}
      {t > 0 && (
        <path
          d={travelledPath}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          className="stroke-amber-400"
        />
      )}

      {/* Sunrise and sunset points */}
      <circle cx={ARC_START_X} cy={CY} r="3.5" className="fill-amber-500" />
      <circle cx={ARC_END_X} cy={CY} r="3.5" className="fill-indigo-500" />

      {/* The sun */}
      <circle
        cx={sunX}
        cy={sunY}
        r="7"
        strokeWidth="2.5"
        className="fill-amber-400 stroke-white"
        style={{ filter: "drop-shadow(0 1.5px 2px rgba(15, 23, 42, 0.35))" }}
      />
    </svg>
  );
}
