"use client";
import WeatherDashboard from "@/components/WeatherDashboard/WeatherDashboard";
import WeatherSearch from "@/components/WeatherSearch/WeatherSearch";
import { useCitySearch } from "@/hooks/useCitySearch";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useWeather } from "@/hooks/useWeather";

function page() {
  const {
    searchInput,
    searchInputHandler,
    suggestedCities,
    clearSuggestedCities,
  } = useCitySearch();
  const { getWeather, weatherData } = useWeather();

  const { recentSearches, addSearch } = useRecentSearches();
console.log(recentSearches)
  return (
    <>
      <WeatherSearch
        searchInput={searchInput}
        searchInputHandler={searchInputHandler}
        suggestedCities={suggestedCities}
        getWeather={getWeather}
        clearSuggestedCities={clearSuggestedCities}
        recentSearches={recentSearches}
        addSearch={addSearch}
      />
      {weatherData && <WeatherDashboard weatherData={weatherData} />}
    </>
  );
}

export default page;
