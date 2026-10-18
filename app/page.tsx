"use client";
import WeatherDashboard from "@/components/WeatherDashboard/WeatherDashboard";
import WeatherSearch from "@/components/WeatherSearch/WeatherSearch";
import { useWeatherStore } from "@/store/useWeatherStore";
function page() {

const weatherData = useWeatherStore((state) => state.weatherData)

  return (
    <>
      <WeatherSearch
      />
      {weatherData && <WeatherDashboard  />}
    </>
  );
}

export default page;
