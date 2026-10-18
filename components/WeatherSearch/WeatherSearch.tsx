"use client";
import AnimatedBackground from "./AnimatedBackground";
import PopularCitiesIcon from "./RecentSearchs";
import CitySuggestions from "./CitySuggestions";
import { City, CitySearch } from "@/types/weather";
import RecentSearchs from "./RecentSearchs";

const WeatherSearch = ({
  searchInput,
  searchInputHandler,
  suggestedCities,
  getWeather,
  clearSuggestedCities,
  recentSearches,
  addSearch
}: {
  searchInput: string;
  searchInputHandler: (value: string) => void;
  suggestedCities: City[];
  getWeather: (lat: number, lon: number) => Promise<void>;
  clearSuggestedCities: () => void;
  recentSearches: CitySearch[];
  addSearch : (name: string, lat: number | string, lon: number | string) => void;
}) => {
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

          <div className="flex justify-center items-center bg-blue-400 absolute right-0 h-full w-28 rounded-r-2xl text-center cursor-pointer">
            <span className="text-white">find me</span>
          </div>
          {suggestedCities.length && (
            <CitySuggestions
              getWeather={getWeather}
              cities={suggestedCities}
              clearSuggestedCities={clearSuggestedCities}
              addSearch={addSearch}
            />
          )}
        </div>
        <div className="flex gap-5 w-50%">
          {recentSearches.map(item => <RecentSearchs key={item.name} getWeather={getWeather} {...item}/>)}         
        </div>
        <h3 className="text-blue-900/80 text-2xl">
          Enter a city name or use your location to get live updates.
        </h3>
      </div>
    </>
  );
};

export default WeatherSearch;
