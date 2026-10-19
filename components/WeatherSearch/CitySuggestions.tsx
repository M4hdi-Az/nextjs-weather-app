import { useWeatherStore } from "@/store/useWeatherStore";
import CitySuggestionItem from "./CitySuggestionItem";

const CitySuggestions = () => {
  
    const suggestedCities = useWeatherStore((state) => state.suggestedCities);

  return (
    <div className="absolute mt-1 top-14 p-3 z-50 bg-white/50 backdrop-blur-3xl rounded-b-2xl w-[95%]">
      <ul>
        {suggestedCities.map((city) => (
          <li className="px-3 py-2 border-b rounded-b-sm border-zinc-400 hover:bg-white/80" key={city.id}>
            <CitySuggestionItem city={city}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySuggestions;
