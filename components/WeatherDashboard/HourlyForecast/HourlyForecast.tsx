"use client";

import { formattedHourlyData } from "@/utils/weatherHelpers";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { useWeatherStore } from "@/store/useWeatherStore";
import SectionHeader from "@/components/common/SectionHeader";

export default function HourlyForecast() {
  const weatherData = useWeatherStore((state) => state.weatherData);
  const { hourly } = weatherData as any;
  const hourlyData = formattedHourlyData(hourly);

  return (
    <>
      <SectionHeader title="Hourly Forecast" />
      <section className="max-w-7xl rounded-3xl bg-white/30 backdrop-blur-md border border-white/50 p-6 max-[970]:px-0 max-[970]:py-2 mb-48 mx-auto shadow-lg shadow-sky-500/10">
        <div className="h-[500px] w-full max-[900]:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                opacity={0.5}     
              />
              <XAxis
                dataKey="time"
                stroke="#282e38"
                fontSize={12}
              />

              <YAxis yAxisId="temp" stroke="#0284c7" unit="°" fontSize={20} />

              <YAxis
                yAxisId="rain"
                orientation="right"
                stroke="#0ea5e9"
                unit="%"
                domain={[0, 100]}
                fontSize={12}
              />

              <Tooltip content={<CustomTooltip />} />

              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temp"
                stroke="#0284c7"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
                animationDuration={2500}
                animationEasing="ease-in-out"
              />

              <Line
                yAxisId="rain"
                type="monotone"
                dataKey="precipitation"
                stroke="#38bdf8"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                isAnimationActive={true}
                animationDuration={2500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
}
