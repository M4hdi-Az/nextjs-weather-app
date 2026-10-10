import { HourlyData } from "@/types/weather";

export const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export const roundTemp = (n: number) => Math.round(n) || 0;

export const formatNumber = (n: number, maxFractionDigits = 0) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxFractionDigits,
  }).format(n);

export const DIRECTIONS = [
  { abbr: "N", name: "north" },
  { abbr: "NE", name: "northeast" },
  { abbr: "E", name: "east" },
  { abbr: "SE", name: "southeast" },
  { abbr: "S", name: "south" },
  { abbr: "SW", name: "southwest" },
  { abbr: "W", name: "west" },
  { abbr: "NW", name: "northwest" },
] as const;

export function getDirection(degrees: number) {
  const normalized = ((degrees % 360) + 360) % 360;
  return DIRECTIONS[Math.round(normalized / 45) % 8];
}

export function describeWind(kmh: number) {
  if (kmh < 2) return "Calm";
  if (kmh < 12) return "Light breeze";
  if (kmh < 29) return "Moderate breeze";
  if (kmh < 50) return "Strong breeze";
  if (kmh < 89) return "Gale";
  return "Storm";
}

export function describeHumidity(percent: number) {
  if (percent < 30) return "Dry";
  if (percent < 60) return "Comfortable";
  if (percent < 80) return "Humid";
  return "Very humid";
}

export function describePressure(hPa: number) {
  if (hPa < 1000) return "Low";
  if (hPa <= 1020) return "Normal";
  return "High";
}

export function rateVisibility(km: number) {
  if (km < 1) return { level: 1, label: "Very poor" };
  if (km < 4) return { level: 2, label: "Poor" };
  if (km < 10) return { level: 3, label: "Moderate" };
  if (km < 20) return { level: 4, label: "Good" };
  return { level: 5, label: "Excellent" };
}

export const formattedHourlyData = (hourlyData: HourlyData) => {

  const todayStr = new Date().toISOString().split("T")[0];
  return hourlyData.time
    .map((timeString: string, index: number) => {
      return {
        fullTime: timeString,
        time: new Date(timeString).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        temp: Math.round(hourlyData.temperature_2m[index]),
        precipitation: hourlyData.precipitation_probability[index],
      };
    })
    .filter((item) => item.fullTime.startsWith(todayStr));
};
