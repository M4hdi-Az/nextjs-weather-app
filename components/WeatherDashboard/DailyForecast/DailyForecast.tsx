"use client";

import { useWeatherStore } from "@/store/useWeatherStore";
import { formatDailyForecast } from "../../../utils/weatherHelpers";
import { CONDITIONS } from "@/constants/weatherConditions";
import SectionHeader from "@/components/common/SectionHeader";

export default function DailyForecast() {
  const weatherData = useWeatherStore((state) => state.weatherData);

  const { daily } = weatherData as any;
  const dailydata = formatDailyForecast(daily);

  if (!dailydata || dailydata.length === 0) return null;

  const allMin = Math.min(...dailydata.map((d: any) => d.minTemp));
  const allMax = Math.max(...dailydata.map((d: any) => d.maxTemp));
  const range = allMax - allMin || 1;

  return (
    <>
      {" "}
      <SectionHeader title="Daily Forecast" />{" "}
      <div className="max-w-5xl  rounded-[2rem] border border-white/40 bg-white/30 p-6 mb-48 mx-auto sm:p-7 text-slate-700 shadow-xl backdrop-blur-md max-[1020px]:mx-8 max-[400px]:mx-2">
        <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-5 px-1">
          7-Day Forecast
        </h3>

        <div className="flex flex-col gap-3">
          {dailydata.map((item: any, index: number) => {
            const code = Number(item.code ?? 0);
            const conditionObj: any = CONDITIONS[code] || CONDITIONS[0];

            const rawIcon = conditionObj?.icon;
            const IconComponent: any = Array.isArray(rawIcon)
              ? rawIcon[0]
              : rawIcon;

            const rawLabel = conditionObj?.label;
            const labelText = Array.isArray(rawLabel)
              ? rawLabel[0]
              : rawLabel || "Sunny";

            const leftPercent = ((item.minTemp - allMin) / range) * 100;
            const widthPercent = ((item.maxTemp - item.minTemp) / range) * 100;

            return (
              <div
                key={item.date || index}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/20 hover:bg-white/30 transition-all border border-white/25 shadow-sm "
              >
                <div className="w-24 text-base sm:text-lg font-semibold text-slate-800 capitalize">
                  {item.day}
                </div>

                <div className="flex items-center gap-3 w-44 sm:w-52">
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 text-sky-500 shrink-0" />
                  )}
                  <span className="text-sm sm:text-base text-slate-700 font-medium truncate">
                    {labelText}
                  </span>
                </div>

                <div className="flex-1 mx-6 hidden sm:block">
                  <div className="relative h-2 w-full bg-slate-200/60 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${Math.max(widthPercent, 10)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="text-base sm:text-lg font-bold text-slate-800 text-right w-[90px]">
                  {Math.round(item.maxTemp)}°{" "}
                  <span className="text-slate-700 font-normal text-sm sm:text-base">
                    / {Math.round(item.minTemp)}°
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
