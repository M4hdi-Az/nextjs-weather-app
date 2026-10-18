import { DailyData, HourlyData } from "@/types/weather";

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

export const formatDailyForecast = (dailyData : DailyData) => {
 return dailyData.time.map((timeString: string, index: number) => {
    const date = new Date(timeString);
    const dayName = date.toLocaleDateString("en-US",{weekday: "short"});

    const isTody= index === 0;

    return {
      date: timeString,
      day: isTody ? 'today' : dayName,
      minTemp: dailyData.temperature_2m_min[index],
      maxTemp: dailyData.temperature_2m_max[index],
      code: dailyData.weather_code[index]
    }
  }) 
}

const calculateDayProgress = (sunriseIso: string, sunsetIso: string, currentTimeIso: string) => {
  if (!sunriseIso || !sunsetIso) return 50;
  
  const now = currentTimeIso ? new Date(currentTimeIso).getTime() : new Date().getTime()
  const sunrise = new Date(sunriseIso).getTime();
  const sunset = new Date(sunsetIso).getTime();

  if (now <= sunrise) return 0;
  if (now >= sunset) return 100;

  const totalDaylight = sunset - sunrise;
  const elapsed = now - sunrise;
  
  return Math.min(Math.max(Math.round((elapsed / totalDaylight) * 100), 0), 100);
};

const formatTime = (isoString: string) => {
  if (!isoString) return "00:00";
  return isoString.split("T")[1].substring(0, 5);
};

export const processWeatherData = (rawData: any) => {
  const daily = rawData.daily;
  const current = rawData.current; // 👈 نقطه شبنم از اینجا خوانده می‌شود

  // ۱. طلوع و غروب (اندیس 0 مربوط به روز جاری است)
  const sunriseIso = daily?.sunrise ? daily.sunrise[0] : "";
  const sunsetIso = daily?.sunset ? daily.sunset[0] : "";
  const sunrise = formatTime(sunriseIso);
  const sunset = formatTime(sunsetIso);
  const currentTimeIso = current?.time ? current.time : "";
  const dayProgress = calculateDayProgress(sunriseIso, sunsetIso, currentTimeIso);

  // ۲. شاخص UV (بیشترین مقدار روزانه)
  const uvIndex = daily?.uv_index_max ? daily.uv_index_max[0] : 0;

  // ۳. نقطه شبنم لحظه‌ای (از بخش current)
  const dewPoint = current?.dew_point_2m !== undefined ? current.dew_point_2m : 0;

  // ۴. مجموع بارش روزانه
  const precipitation = daily?.precipitation_sum ? daily.precipitation_sum[0] : 0;

  return {
    sunrise,
    sunset,
    dayProgress,
    uvIndex,
    dewPoint,
    precipitation,
  };
};

export const getUvInfo = (val: number) => {
    if (val < 3)
      return {
        label: "Low",
        note: "No protection needed.",
        color: "bg-emerald-500/15 text-emerald-800",
      };
    if (val < 6)
      return {
        label: "Moderate",
        note: "Wear sunscreen if outside.",
        color: "bg-amber-400/25 text-amber-900",
      };
    if (val < 8)
      return {
        label: "High",
        note: "Use SPF 30+ and find shade.",
        color: "bg-orange-500/15 text-orange-900",
      };
    return {
      label: "Very high",
      note: "Limit midday sun.",
      color: "bg-red-500/15 text-red-900",
    };
  };

  export const getDewPointInfo = (val: number) => {
    if (val < 10)
      return {
        label: "Dry",
        note: "Crisp and dry air.",
        color: "bg-cyan-500/15 text-cyan-900",
      };
    if (val < 16)
      return {
        label: "Comfortable",
        note: "Pleasant air, nothing sticky.",
        color: "bg-emerald-500/15 text-emerald-800",
      };
    if (val < 20)
      return {
        label: "Humid",
        note: "A little sticky in the sun.",
        color: "bg-amber-400/25 text-amber-900",
      };
    return {
      label: "Muggy",
      note: "Heavy and sticky air.",
      color: "bg-rose-500/15 text-rose-900",
    };
  };

export  const getRainInfo = (val: number) => {
    if (val < 0.1) return { label: "No rain", note: "A dry day." };
    if (val < 5)
      return { label: "Light rain", note: "Light showers expected." };
    return { label: "Moderate rain", note: "Steady rain. Take an umbrella." };
  };