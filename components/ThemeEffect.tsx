
"use client";

import { useEffect } from "react";
import { useWeatherStore } from "@/store/useWeatherStore";

export default function ThemeEffect() {
  const weatherData = useWeatherStore((state) => state.weatherData);

  useEffect(() => {
    const isDay = weatherData?.current?.is_day;
    const rootElement = document.documentElement;

    if (isDay === 0) {
      rootElement.classList.add("dark");
    } else {
      rootElement.classList.remove("dark");
    }
  }, [weatherData]);

  return null; 
}