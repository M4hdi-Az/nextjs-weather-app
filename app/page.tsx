"use client";
import WeatherDashboard from "@/components/WeatherDashboard/WeatherDashboard";
import WeatherLoading from "@/components/WeatherSearch/WeatherLoading";
import WeatherSearch from "@/components/WeatherSearch/WeatherSearch";
import { useWeatherStore } from "@/store/useWeatherStore";
function page() {

const weatherData = useWeatherStore((state) => state.weatherData)
const isLoading = useWeatherStore((state) => state.isLoading)

  return (
    <>
      <WeatherSearch
      />
      {isLoading ? (<WeatherLoading message="Fetching live weather updates.."/>) : weatherData ? (<WeatherDashboard  />) : null}
    </>
  );
}

export default page;
