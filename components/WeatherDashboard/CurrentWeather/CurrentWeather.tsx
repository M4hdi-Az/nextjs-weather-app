import {
  CurrentWeather as CurrentWeatherData,
  WeatherData,
} from "@/types/weather";
import { Thermometer, Wind, Droplets, Gauge, Eye } from "lucide-react";
import Compass from "./Compass";

import {
  CONDITIONS,
  UNKNOWN_CONDITION,
  THEMES,
  PRESSURE_RANGE,
} from "@/constants/weatherConditions";
import {
  clamp,
  roundTemp,
  formatNumber,
  getDirection,
  describeWind,
  describeHumidity,
  describePressure,
  rateVisibility,
} from "@/utils/weatherHelpers";

const CurrentWeather = ({ weatherData }: { weatherData: WeatherData }) => {
  const {
    apparent_temperature,
    is_day,
    relative_humidity_2m,
    surface_pressure,
    temperature_2m,
    visibility,
    weather_code,
    wind_direction_10m,
    wind_speed_10m,
  }: CurrentWeatherData = weatherData.current;

  const isDay = is_day === 1;
  const condition = CONDITIONS[weather_code] ?? UNKNOWN_CONDITION;
  const theme = THEMES[condition.group];
  const ConditionIcon = condition.icon[isDay ? 0 : 1];
  const conditionLabel =
    typeof condition.label === "string"
      ? condition.label
      : condition.label[isDay ? 0 : 1];

  const temperature = roundTemp(temperature_2m);
  const feelsLike = roundTemp(apparent_temperature);

  const direction = getDirection(wind_direction_10m);

  const humidity = clamp(relative_humidity_2m, 0, 100);
  const pressureMarker =
    clamp(
      (surface_pressure - PRESSURE_RANGE.min) /
        (PRESSURE_RANGE.max - PRESSURE_RANGE.min),
      0,
      1
    ) * 100;

  const visibilityKm = visibility / 1000;
  const visibilityRating = rateVisibility(visibilityKm);

  return (
    <section
      aria-label="Current weather"
      className="mx-auto mb-48 grid w-full max-w-5xl gap-4 lg:grid-cols-5"
    >
      {/* Hero */}
      <div className="flex min-h-72 flex-col justify-between gap-10 rounded-[2rem] p-6 sm:p-8 lg:col-span-2 bg-white/30 backdrop-blur-md border border-white/50 shadow-lg shadow-sky-500/10 text-slate-800">
        <div className="flex items-start justify-between gap-4">
          <h2 className="sr-only">Current weather</h2>
          <ConditionIcon
            className={`ml-auto size-16 shrink-0 sm:size-20 ${theme.accentText}`}
            strokeWidth={1.25}
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-[6.5rem] font-semibold leading-[0.85] tracking-tighter tabular-nums sm:text-[8rem] text-sky-950">
            {temperature}°
          </p>
          <p className="mt-5 text-2xl font-medium text-slate-800">
            {conditionLabel}
          </p>
          <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/60 bg-sky-100/60 px-3.5 py-1.5 text-sm font-medium text-sky-950">
            <Thermometer className="size-4 text-amber-600" aria-hidden="true" />
            Feels Like {feelsLike}°
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-3">
        {/* Wind */}
        <div className="col-span-2 sm:col-span-3 rounded-3xl bg-white/30 backdrop-blur-md border border-white/50 p-6 shadow-lg shadow-sky-500/10 text-slate-800">
          <div className="flex items-center gap-2 text-slate-600">
            <Wind className="size-4 text-blue-600" />
            <span className="text-sm font-medium">
              Wind speed and direction
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-sky-950">
                  {formatNumber(wind_speed_10m)}
                </span>
                <span className="text-sm font-medium text-slate-600">km/h</span>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                {describeWind(wind_speed_10m)}
              </p>
              <p className="mt-2 text-sm text-slate-700">
                from {direction.name}
              </p>
            </div>

            <Compass
              degrees={wind_direction_10m}
              accentText={theme.accentText}
              label={`Wind from the ${direction.name} (${direction.abbr}), ${Math.round(wind_direction_10m)} degrees`}
            />
          </div>
        </div>

        {/* Humidity */}
        <div className="flex flex-col justify-between rounded-3xl bg-white/30 backdrop-blur-md border border-white/50 p-6 shadow-lg shadow-sky-500/10 text-slate-800">
          <div className="flex items-center gap-2 text-slate-600">
            <Droplets className="size-4 text-sky-600" />
            <span className="text-sm font-medium">Humidity</span>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-sky-950">
                {formatNumber(humidity)}
              </span>
              <span className="text-sm font-medium text-slate-600">%</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {describeHumidity(humidity)}
            </p>
          </div>

          <div
            className="mt-auto pt-5"
            role="meter"
            aria-label="Relative humidity"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={humidity}
          >
            <div className="h-1.5 overflow-hidden rounded-full bg-sky-950/10">
              <div
                className="h-full rounded-full bg-sky-600"
                style={{ width: `${humidity}%` }}
              />
            </div>
          </div>
        </div>

        {/* Pressure */}
        <div className="flex flex-col justify-between rounded-3xl bg-white/30 backdrop-blur-md border border-white/50 p-6 shadow-lg shadow-sky-500/10 text-slate-800">
          <div className="flex items-center gap-2 text-slate-600">
            <Gauge className="size-4 text-indigo-600" />
            <span className="text-sm font-medium">Surface pressure</span>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-sky-950 font-sans">
                {formatNumber(surface_pressure)}
              </span>
              <span className="text-sm font-medium text-slate-600">hPa</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {describePressure(surface_pressure)}
            </p>
          </div>

          <div className="mt-auto pt-5">
            <div className="relative h-1.5 rounded-full bg-sky-950/10">
              <span
                aria-hidden="true"
                className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white bg-sky-600"
                style={{ left: `${pressureMarker}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-700">
              <span>low</span>
              <span>high</span>
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="flex flex-col justify-between rounded-3xl bg-white/30 backdrop-blur-md border border-white/50 p-6 shadow-lg shadow-sky-500/10 text-slate-800 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 text-slate-600">
            <Eye className="size-4 text-teal-600" />
            <span className="text-sm font-medium">visibility</span>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-sky-950">
                {formatNumber(visibilityKm, 1)}
              </span>
              <span className="text-sm font-medium text-slate-600">km</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {visibilityRating.label}
            </p>
          </div>

          <div className="mt-auto pt-5" aria-hidden="true">
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full ${
                    i < visibilityRating.level
                      ? theme.accentBg
                      : "bg-sky-950/10"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;