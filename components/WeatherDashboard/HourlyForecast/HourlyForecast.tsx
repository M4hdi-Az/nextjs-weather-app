"use client";

import { WeatherData } from "@/types/weather";
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

export default function HourlyForecast({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  const { hourly } = weatherData;
  const hourlyData = formattedHourlyData(hourly)

  return (
    <div className="max-w-7xl rounded-3xl bg-white/30 backdrop-blur-md border border-white/50 p-6 mx-auto shadow-lg shadow-sky-500/10">
      <h3 className="text-lg font-medium text-slate-600 mb-4">
        Hourly Forecast
      </h3>

      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hourlyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              opacity={0.5}
            />
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} />

            <YAxis yAxisId="temp" stroke="#0284c7" unit="°" fontSize={12} />

            <YAxis
              yAxisId="rain"
              orientation="right"
              stroke="#0ea5e9"
              unit="%"
              domain={[0, 100]}
              fontSize={12}
            />

            <Tooltip content={<CustomTooltip/>}/>

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
    </div>
  );
}
