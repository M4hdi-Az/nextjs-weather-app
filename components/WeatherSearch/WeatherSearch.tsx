"use client";
import { useWeatherStore } from "@/store/useWeatherStore";
import AnimatedBackground from "./AnimatedBackground";
import CitySuggestions from "./CitySuggestions";
import RecentSearches from "./RecentSearches";
import {MapPinSearch } from "lucide-react";
import { useGeoLocation } from "@/hooks/useGeoLocation";

const WeatherSearch = () => {

  const searchInputHandler = useWeatherStore((state) => state.searchInputHandler);
  const searchInput = useWeatherStore((state) => state.searchInput);
  const suggestedCities = useWeatherStore((state) => state.suggestedCities);
  const recentSearches = useWeatherStore((state) => state.recentSearches);

  const { getLocation, isLoading } = useGeoLocation();

  return (
    <>
      <AnimatedBackground />
      <div className="h-screen flex flex-col gap-10 items-center">
        <h1 className="text-blue-500/60 drop-shadow-xl text-9xl mt-44 mb-16">
          Discover The Weather
        </h1>
        <div className="relative flex flex-col items-center w-xl h-14 text-2xl">
          <input
            className="absolute w-full h-14 bg-white/80 backdrop-blur-md text-2xl pl-2 rounded-2xl border border-blue-800 outline-0"
            type="text"
            placeholder="Search city..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              searchInputHandler(e.target.value)
            }
            value={searchInput}
          />

          <div onClick={getLocation} className="flex justify-center items-center border-l-2 border-dashed border-l-blue-400 absolute right-0 h-full w-28 rounded-r-2xl text-center cursor-pointer">
           <MapPinSearch className="w-8 h-8 text-blue-500 transition-transform group-hover:scale-110" />
          </div>
          {suggestedCities.length && (
            <CitySuggestions/>
          )}
        </div>
        <div className="flex gap-5 w-50%">
          {recentSearches.map(item => <RecentSearches key={item.name} {...item}/>)}         
        </div>
        <h3 className="text-blue-900/80 text-2xl">
          Enter a city name or use your location to get live updates.
        </h3>
      </div>
    </>
  );
};

export default WeatherSearch;
