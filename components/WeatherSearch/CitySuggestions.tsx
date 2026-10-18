import { City, CitySearch, GetWeatherFn } from "@/types/weather";
import CitySuggestionItem from "./CitySuggestionItem";

const CitySuggestions = ({
  cities,
  getWeather,
  clearSuggestedCities,
  addSearch
}: {
  cities: City[];
  getWeather: GetWeatherFn;
  clearSuggestedCities: () => void;
  addSearch : (name: string, lat: number | string, lon: number | string) => void;
}) => {
  return (
    <div className="absolute mt-1 top-14 p-3 z-50 bg-white/50 backdrop-blur-3xl rounded-b-2xl w-[95%]">
      <ul>
        {cities.map((city) => (
          <li className="px-3 py-2 border-b border-zinc-400" key={city.id}>
            <CitySuggestionItem
              city={city}
              getWeather={getWeather}
              clearSuggestedCities={clearSuggestedCities}
              addSearch={addSearch}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySuggestions;
