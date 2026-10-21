"use client";
import { useWeatherStore } from "@/store/useWeatherStore";
import AnimatedBackground from "../AnimatedBackground";
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
        <h1 className="text-blue-500/60 drop-shadow-xl text-9xl mt-44 mb-16 max-[1233px]:text-7xl max-[694px]:text-5xl max-[464px]:text-[34px] max-[464px]:font-bold  max-[464px]:mb-8 max-[360px]:text-[30px]">
          Discover The Weather
        </h1>
        <div className="relative flex flex-col items-center w-xl h-14 text-2xl max-[635px]:w-95% max-[600]:w-[450px] max-[464]:w-[370px] max-[390]:w-[330px]">
          <input
            className="absolute w-full h-14 bg-white/60 backdrop-blur-md text-2xl pl-2 rounded-2xl outline-0 max-[400px]:h-12 max-[390]:h-10"
            type="text"
            placeholder="Search city..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              searchInputHandler(e.target.value)
            }
            value={searchInput}
          />

          <div onClick={getLocation} className="hover:*:scale-120 flex justify-center items-center border-l-2 border-dashed border-l-blue-400 absolute right-0 h-full w-28 rounded-r-2xl text-center cursor-pointer max-[464px]:w-16 max-[464px]:h-12 ">
           <MapPinSearch className="w-8 h-8 text-blue-500 transition-transform max-[464px]:w-7 max-[464px]:h-7" />
          </div>
          {suggestedCities.length && (
            <CitySuggestions/>
          )}
        </div>
        <div className="flex gap-5 justify-center w-50% max-[740px]:w-full flex-wrap mx-auto">
          {recentSearches.map(item => <RecentSearches key={item.name} {...item}/>)}         
        </div>
        <h3 className="text-blue-900/80 text-2xl text-center dark:text-blue-300 max-[615]:w-90% max-[500]:text-xl max-[400]:text-lg">
          Enter a city name or use your location to get live updates.
        </h3>
      </div>
    </>
  );
};

export default WeatherSearch;
