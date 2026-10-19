"use client";

import { memo, useEffect, useMemo, useState, type CSSProperties } from "react";
import { useWeatherStore } from "@/store/useWeatherStore";
import '@/app/globals.css'

type Condition = "clear" | "cloudy" | "rain" | "snow" | "storm";
type Period = "day" | "night";

interface Theme {
  gradient: string;
  base: string;
  cloudColor: string;
  cloudOpacity: number;
  bodyOpacity: number;
}

const THEMES: Record<Condition, Record<Period, Theme>> = {
  clear: {
    day: {
      gradient: "from-sky-400 via-sky-300 to-blue-200",
      base: "bg-sky-300",
      cloudColor: "text-white",
      cloudOpacity: 0.4,
      bodyOpacity: 1,
    },
    night: {
      gradient: "from-slate-950 via-indigo-950 to-slate-800",
      base: "bg-indigo-950",
      cloudColor: "text-slate-400",
      cloudOpacity: 0.12,
      bodyOpacity: 1,
    },
  },
  cloudy: {
    day: {
      gradient: "from-slate-400 via-slate-300 to-sky-200",
      base: "bg-slate-300",
      cloudColor: "text-slate-50",
      cloudOpacity: 0.9,
      bodyOpacity: 0.45,
    },
    night: {
      gradient: "from-slate-900 via-slate-800 to-slate-700",
      base: "bg-slate-800",
      cloudColor: "text-slate-500",
      cloudOpacity: 0.8,
      bodyOpacity: 0.3,
    },
  },
  rain: {
    day: {
      gradient: "from-slate-700 via-slate-600 to-blue-500",
      base: "bg-slate-600",
      cloudColor: "text-slate-300",
      cloudOpacity: 0.95,
      bodyOpacity: 0.15,
    },
    night: {
      gradient: "from-slate-950 via-slate-900 to-blue-950",
      base: "bg-slate-900",
      cloudColor: "text-slate-600",
      cloudOpacity: 0.9,
      bodyOpacity: 0.1,
    },
  },
  snow: {
    day: {
      gradient: "from-slate-300 via-sky-200 to-blue-100",
      base: "bg-sky-200",
      cloudColor: "text-white",
      cloudOpacity: 0.9,
      bodyOpacity: 0.3,
    },
    night: {
      gradient: "from-slate-800 via-slate-600 to-sky-700",
      base: "bg-slate-600",
      cloudColor: "text-slate-300",
      cloudOpacity: 0.75,
      bodyOpacity: 0.25,
    },
  },
  storm: {
    day: {
      gradient: "from-slate-800 via-purple-900 to-slate-700",
      base: "bg-purple-900",
      cloudColor: "text-slate-500",
      cloudOpacity: 1,
      bodyOpacity: 0,
    },
    night: {
      gradient: "from-slate-950 via-purple-950 to-slate-900",
      base: "bg-purple-950",
      cloudColor: "text-slate-700",
      cloudOpacity: 1,
      bodyOpacity: 0,
    },
  },
};

const CONDITIONS = Object.keys(THEMES) as Condition[];
const PERIODS: Period[] = ["day", "night"];

const CLOUDY_OPACITY_BY_CODE: Record<number, number> = {
  1: 0.5,
  2: 0.7,
  3: 0.9,
  45: 0.95,
  48: 0.95, 
}

function getCondition(code: number | undefined | null): Condition {
  if (code === undefined || code === null) return "clear"; // default / no city searched
  if (code === 0) return "clear";
  if (code === 1 || code === 2 || code === 3 || code === 45 || code === 48) return "cloudy";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code === 95 || code === 96 || code === 99) return "storm";
  return "clear"; 
}

const CLOUDS = [
  { anim: "animate-cloud-slow", pos: "top-[10%] w-72", factor: 1, delay: "-30s" },
  { anim: "animate-cloud-medium", pos: "top-[26%] w-52", factor: 0.8, delay: "-12s" },
  { anim: "animate-cloud-fast", pos: "top-[44%] w-40", factor: 0.6, delay: "-5s" },
  { anim: "animate-cloud-slow", pos: "top-[62%] w-64", factor: 0.7, delay: "-70s" },
] as const;

function Cloud() {
  return (
    <svg viewBox="0 0 200 100" fill="currentColor" className="h-auto w-full">
      <circle cx="60" cy="62" r="30" />
      <circle cx="98" cy="46" r="38" />
      <circle cx="142" cy="60" r="32" />
      <rect x="32" y="60" width="145" height="32" rx="16" />
    </svg>
  );
}


interface Raindrop {
  id: number;
  left: number;
  length: number;
  width: number; 
  opacity: number;
  duration: number;
  delay: number; 
}

interface Snowflake {
  id: number;
  left: number;
  size: number;
  opacity: number;
  fallDuration: number;
  fallDelay: number;
  sway: number;
  swayDuration: number;
  swayDelay: number;
}

const MAX_RAINDROPS = 140;
const RAIN_COUNT = 90;
const SNOW_COUNT = 70;


function createRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PHI = 0.6180339887;
const round = (n: number, digits = 2) => Number(n.toFixed(digits));

const spread = (i: number, rng: () => number) =>
  round(((i * PHI) % 1) * 100 + (rng() - 0.5) * 0.8);

function generateRaindrops(count: number): Raindrop[] {
  const rng = createRng(0x5eed01);
  return Array.from({ length: count }, (_, i) => {
    const depth = rng(); 
    const duration = round(1.05 - depth * 0.5);
    return {
      id: i,
      left: spread(i, rng),
      length: round(14 + depth * 20, 0),
      width: depth > 0.65 ? 2 : 1,
      opacity: round(0.25 + depth * 0.45),
      duration,
      delay: round(-rng() * duration),
    };
  });
}

function generateSnowflakes(count: number): Snowflake[] {
  const rng = createRng(0x5eed02);
  return Array.from({ length: count }, (_, i) => {
    const depth = rng();
    const fallDuration = round(16 - depth * 8 + rng() * 2, 1);
    return {
      id: i,
      left: spread(i, rng),
      size: round(2 + depth * 5, 1),
      opacity: round(0.45 + depth * 0.5),
      fallDuration,
      fallDelay: round(-rng() * fallDuration, 1),
      sway: round(8 + rng() * 28, 0),
      swayDuration: round(2.5 + rng() * 3, 1),
      swayDelay: round(-rng() * 5, 1),
    };
  });
}

function useFadedMount(active: boolean, ms = 1000) {
  const [mounted, setMounted] = useState(active);
  const [visible, setVisible] = useState(active);

  useEffect(() => {
    if (active) {
      setMounted(true);
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    setVisible(false);
    const timer = setTimeout(() => setMounted(false), ms);
    return () => clearTimeout(timer);
  }, [active, ms]);

  return { mounted, visible };
}

const RainLayer = memo(function RainLayer({
  drops,
  count,
  speed,
  visible,
}: {
  drops: Raindrop[];
  count: number;
  speed: number;
  visible: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:hidden ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ "--rain-speed": speed } as CSSProperties}
    >
      {drops.slice(0, count).map((d) => (
        <span
          key={d.id}
          className="animate-rain absolute top-0 rounded-full bg-gradient-to-b from-transparent to-sky-200 shadow-[0_0_6px_1px_rgba(186,230,253,0.45)]"
          style={{
            left: `${d.left}%`,
            width: `${d.width}px`,
            height: `${d.length}px`,
            opacity: d.opacity,
            animationDuration: `calc(${d.duration}s * var(--rain-speed, 1))`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

const SnowLayer = memo(function SnowLayer({
  flakes,
  visible,
}: {
  flakes: Snowflake[];
  visible: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:hidden ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {flakes.map((f) => (
        <span
          key={f.id}
          className="animate-snow absolute top-0"
          style={{
            left: `${f.left}%`,
            animationDuration: `${f.fallDuration}s`,
            animationDelay: `${f.fallDelay}s`,
          }}
        >
          <span
            className="animate-snow-sway block rounded-full bg-white shadow-[0_0_2px_1px_rgba(255,255,255,0.8),0_1px_3px_rgba(71,85,105,0.3)]"
            style={
              {
                width: f.size,
                height: f.size,
                opacity: f.opacity,
                "--sway": `${f.sway}px`,
                animationDuration: `${f.swayDuration}s`,
                animationDelay: `${f.swayDelay}s`,
              } as CSSProperties
            }
          />
        </span>
      ))}
    </div>
  );
});


export default function AnimatedBackground() {
  const weatherData = useWeatherStore((state) => state.weatherData);
  const weatherCode = weatherData?.current?.weather_code;
  const isDay = weatherData?.current?.is_day ?? 1;

  const condition = getCondition(weatherCode);
  const period: Period = isDay ? "day" : "night";
  const theme = THEMES[condition][period];

  const cloudOpacity =
    condition === "cloudy" && period === "day" && weatherCode !== undefined
      ? CLOUDY_OPACITY_BY_CODE[weatherCode] ?? theme.cloudOpacity
      : theme.cloudOpacity;

  const showSun = period === "day";
  const showMoon = period === "night";

  const raindrops = useMemo(() => generateRaindrops(MAX_RAINDROPS), []);
  const snowflakes = useMemo(() => generateSnowflakes(SNOW_COUNT), []);

  const isStorm = condition === "storm";
  const rain = useFadedMount(condition === "rain" || isStorm);
  const snow = useFadedMount(condition === "snow");

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000 motion-reduce:transition-none ${theme.base}`}
    >

      {CONDITIONS.flatMap((c) =>
        PERIODS.map((p) => (
          <div
            key={`${c}-${p}`}
            className={`absolute inset-0 bg-gradient-to-b ${THEMES[c][p].gradient} transition-opacity duration-1000 motion-reduce:transition-none ${
              c === condition && p === period ? "opacity-100" : "opacity-0"
            }`}
          />
        ))
      )}

      <div
        className={`absolute right-[12%] top-[9%] h-24 w-24 rounded-full bg-amber-300 shadow-[0_0_80px_30px_rgba(251,191,36,0.5)] transition-all duration-1000 motion-reduce:transition-none sm:h-28 sm:w-28 ${
          showSun ? "translate-y-0" : "translate-y-24"
        }`}
        style={{ opacity: showSun ? theme.bodyOpacity : 0 }}
      />

      <div
        className={`absolute right-[14%] top-[10%] h-20 w-20 rounded-full bg-slate-100 shadow-[0_0_60px_16px_rgba(226,232,240,0.3)] transition-all duration-1000 motion-reduce:transition-none sm:h-24 sm:w-24 ${
          showMoon ? "translate-y-0" : "translate-y-24"
        }`}
        style={{ opacity: showMoon ? theme.bodyOpacity : 0 }}
      >
        <span className="absolute left-[22%] top-[30%] h-[18%] w-[18%] rounded-full bg-slate-300/60" />
        <span className="absolute left-[55%] top-[52%] h-[24%] w-[24%] rounded-full bg-slate-300/50" />
        <span className="absolute left-[30%] top-[66%] h-[12%] w-[12%] rounded-full bg-slate-300/60" />
      </div>

      {CLOUDS.map((cloud, i) => (
        <div
          key={i}
          className={`absolute left-0 ${cloud.pos} ${cloud.anim} ${theme.cloudColor} transition-[color,opacity] duration-1000 motion-reduce:transition-none`}
          style={{
            opacity: cloudOpacity * cloud.factor,
            animationDelay: cloud.delay,
          }}
        >
          <Cloud />
        </div>
      ))}

      {rain.mounted && (
        <RainLayer
          drops={raindrops}
          count={isStorm ? MAX_RAINDROPS : RAIN_COUNT}
          speed={isStorm ? 0.7 : 1}
          visible={rain.visible}
        />
      )}

      {snow.mounted && <SnowLayer flakes={snowflakes} visible={snow.visible} />}

      <style jsx global>{`
       
      `}</style>
    </div>
  );
}
