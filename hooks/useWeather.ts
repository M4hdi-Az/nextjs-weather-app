'use client'
import { fetchWeatherData } from "@/services/weather";
import { WeatherData } from "@/types/weather";
import { useState } from "react";

export function useWeather() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>()
    const getWeather = async (lat: number, lon: number) => {
    if(!lat && !lon) return
    
       const data = await fetchWeatherData(lat ,lon)
       setWeatherData(data);
    }

    return {weatherData, getWeather}
}