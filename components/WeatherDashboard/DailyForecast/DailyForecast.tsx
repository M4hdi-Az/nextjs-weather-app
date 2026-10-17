"use client";

import React from "react";
import { formatDailyForecast } from "../../../utils/weatherHelpers";
import { CONDITIONS } from "@/constants/weatherConditions";

export default function DailyForecast({ weatherData }: { weatherData: any }) {
  const dailydata = formatDailyForecast(weatherData.daily);

  if (!dailydata || dailydata.length === 0) return null;

  // محاسبه حداقل و حداکثر دمای کل هفته برای رسم نوار پیشرفت نسبی دما
  const allMin = Math.min(...dailydata.map((d: any) => d.minTemp));
  const allMax = Math.max(...dailydata.map((d: any) => d.maxTemp));
  const range = allMax - allMin || 1;

  return (
    <div className="max-w-5xl  rounded-[2rem] border border-white/40 bg-white/30 p-6 mb-48 mx-auto sm:p-7 text-slate-700 shadow-xl backdrop-blur-md">
      {/* عنوان بخش */}
      <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-5 px-1">
        7-Day Forecast
      </h3>

      {/* لیست عمودی */}
      <div className="flex flex-col gap-3">
        {dailydata.map((item: any, index: number) => {
          // خواندن کد وضعیت هوای روز مربوطه
          const code = Number(item.code ?? 0); 
          const conditionObj: any = CONDITIONS[code] || CONDITIONS[0];
          
          // استخراج ایمن آیکون
          const rawIcon = conditionObj?.icon;
          const IconComponent: any = Array.isArray(rawIcon) ? rawIcon[0] : rawIcon;
          
          // استخراج ایمن لیبل
          const rawLabel = conditionObj?.label;
          const labelText = Array.isArray(rawLabel) ? rawLabel[0] : (rawLabel || "Sunny");

          // محاسبات برای نوار پیشرفت دمای بین min و max
          const leftPercent = ((item.minTemp - allMin) / range) * 100;
          const widthPercent = ((item.maxTemp - item.minTemp) / range) * 100;

          return (
            <div
              key={item.date || index}
              className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/20 hover:bg-white/30 transition-all border border-white/25 shadow-sm"
            >
              {/* ۱. روز هفته */}
              <div className="w-24 text-base sm:text-lg font-semibold text-slate-800 capitalize">
                {item.day}
              </div>

              {/* ۲. آیکون و وضعیت هوا */}
              <div className="flex items-center gap-3 w-44 sm:w-52">
                {IconComponent && <IconComponent className="w-6 h-6 text-sky-500 shrink-0" />}
                <span className="text-sm sm:text-base text-slate-700 font-medium truncate">{labelText}</span>
              </div>

              {/* ۳. نوار پیشرفت دما */}
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

              {/* ۴. نمایش دماها (ماکسیمم / مینیمم) */}
              <div className="text-base sm:text-lg font-bold text-slate-800 text-right min-w-[90px]">
                {Math.round(item.maxTemp)}° <span className="text-slate-400 font-normal text-sm sm:text-base">/ {Math.round(item.minTemp)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}