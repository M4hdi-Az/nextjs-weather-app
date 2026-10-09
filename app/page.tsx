"use client";
import WeatherDashboard from "@/components/WeatherDashboard/WeatherDashboard";
import WeatherSearch from "@/components/WeatherSearch/WeatherSearch";
import { useCitySearch } from "@/hooks/useCitySearch";
import { useWeather } from "@/hooks/useWeather";

function page() {
  const {
    searchInput,
    searchInputHandler,
    suggestedCities,
    clearSuggestedCities,
  } = useCitySearch();
  const { getWeather, weatherData } = useWeather();

  return (
    <>
      <WeatherSearch
        searchInput={searchInput}
        searchInputHandler={searchInputHandler}
        suggestedCities={suggestedCities}
        getWeather={getWeather}
        clearSuggestedCities={clearSuggestedCities}
      />
      {weatherData && <WeatherDashboard weatherData={weatherData} />}
    </>
  );
}

export default page;
