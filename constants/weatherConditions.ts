import {
  LucideIcon,
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  Snowflake,
  CloudSunRain,
  CloudMoonRain,
  CloudLightning,
  CloudHail,
} from "lucide-react";

export type Group = "clear" | "cloudy" | "fog" | "rain" | "snow" | "storm";

export type Condition = {
  group: Group;
  label: string | readonly [string, string];
  icon: readonly [LucideIcon, LucideIcon];
};

export interface HeroTone {
  card: string;
  chip: string;
}

const tone = (tint: string, chip: string): HeroTone => ({
  card: `${tint} text-sky-950`,
  chip,
});

export const CONDITIONS: Record<number, Condition> = {
  0: { group: "clear", label: ["Sunny", "Clear"], icon: [Sun, Moon] },
  1: { group: "clear", label: ["Mostly sunny", "Mostly clear"], icon: [Sun, Moon] },
  2: { group: "cloudy", label: "Partly cloudy", icon: [CloudSun, CloudMoon] },
  3: { group: "cloudy", label: "Overcast", icon: [Cloud, Cloud] },
  45: { group: "fog", label: "Fog", icon: [CloudFog, CloudFog] },
  48: { group: "fog", label: "Freezing fog", icon: [CloudFog, CloudFog] },
  51: { group: "rain", label: "Light drizzle", icon: [CloudDrizzle, CloudDrizzle] },
  53: { group: "rain", label: "Drizzle", icon: [CloudDrizzle, CloudDrizzle] },
  55: { group: "rain", label: "Heavy drizzle", icon: [CloudDrizzle, CloudDrizzle] },
  56: { group: "rain", label: "Light freezing drizzle", icon: [CloudDrizzle, CloudDrizzle] },
  57: { group: "rain", label: "Freezing drizzle", icon: [CloudDrizzle, CloudDrizzle] },
  61: { group: "rain", label: "Light rain", icon: [CloudRain, CloudRain] },
  63: { group: "rain", label: "Rain", icon: [CloudRain, CloudRain] },
  65: { group: "rain", label: "Heavy rain", icon: [CloudRainWind, CloudRainWind] },
  66: { group: "rain", label: "Light freezing rain", icon: [CloudRain, CloudRain] },
  67: { group: "rain", label: "Freezing rain", icon: [CloudRainWind, CloudRainWind] },
  71: { group: "snow", label: "Light snow", icon: [CloudSnow, CloudSnow] },
  73: { group: "snow", label: "Snow", icon: [CloudSnow, CloudSnow] },
  75: { group: "snow", label: "Heavy snow", icon: [Snowflake, Snowflake] },
  77: { group: "snow", label: "Snow grains", icon: [Snowflake, Snowflake] },
  80: { group: "rain", label: "Light showers", icon: [CloudSunRain, CloudMoonRain] },
  81: { group: "rain", label: "Showers", icon: [CloudSunRain, CloudMoonRain] },
  82: { group: "rain", label: "Violent showers", icon: [CloudRainWind, CloudRainWind] },
  85: { group: "snow", label: "Light snow showers", icon: [CloudSnow, CloudSnow] },
  86: { group: "snow", label: "Heavy snow showers", icon: [Snowflake, Snowflake] },
  95: { group: "storm", label: "Thunderstorm", icon: [CloudLightning, CloudLightning] },
  96: { group: "storm", label: "Thunderstorm with hail", icon: [CloudHail, CloudHail] },
  99: { group: "storm", label: "Severe thunderstorm with hail", icon: [CloudHail, CloudHail] },
};

export const UNKNOWN_CONDITION: Condition = {
  group: "cloudy",
  label: "Unknown conditions",
  icon: [Cloud, Cloud],
};

const CHIP_DAY = "bg-sky-400/50";
const CHIP_NIGHT = "bg-blue-400/60";

export interface Theme {
  accentText: string;
  accentBg: string;
  day: HeroTone;
  night: HeroTone;
}

export const THEMES: Record<Group, Theme> = {
  clear: {
    accentText: "text-blue-600",
    accentBg: "bg-blue-600",
    day: tone("bg-sky-100/40", CHIP_DAY),
    night: tone("bg-indigo-100/40", CHIP_NIGHT),
  },
  cloudy: {
    accentText: "text-slate-600",
    accentBg: "bg-slate-500",
    day: tone("bg-slate-100/40", CHIP_DAY),
    night: tone("bg-slate-200/40", CHIP_NIGHT),
  },
  fog: {
    accentText: "text-slate-600",
    accentBg: "bg-slate-500",
    day: tone("bg-white/40", CHIP_DAY),
    night: tone("bg-slate-200/40", CHIP_NIGHT),
  },
  rain: {
    accentText: "text-cyan-700",
    accentBg: "bg-cyan-600",
    day: tone("bg-cyan-100/40", CHIP_DAY),
    night: tone("bg-cyan-200/40", CHIP_NIGHT),
  },
  snow: {
    accentText: "text-sky-600",
    accentBg: "bg-sky-500",
    day: tone("bg-white/45", CHIP_DAY),
    night: tone("bg-sky-200/40", CHIP_NIGHT),
  },
  storm: {
    accentText: "text-indigo-600",
    accentBg: "bg-indigo-600",
    day: tone("bg-indigo-100/40", CHIP_DAY),
    night: tone("bg-indigo-200/40", CHIP_NIGHT),
  },
};

export const PRESSURE_RANGE = { min: 980, max: 1040 } as const;