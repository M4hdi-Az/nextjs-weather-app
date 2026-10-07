import { City, GetWeatherFn } from "@/types/weather";
import CitySuggestionItem from "./CitySuggestionItem";

const CitySuggestions = ({cities, getWeather, clearSuggestedCities} : {cities : City[], getWeather: GetWeatherFn, clearSuggestedCities : () => void}) => {
  return (
    <div className="absolute mt-1 top-14 p-3 z-50 bg-white/50 backdrop-blur-3xl rounded-b-2xl w-[95%]">
        <ul>
            {cities.map(city => <li className="px-3 py-2 border-b border-zinc-400" key={city.id}><CitySuggestionItem city={city} getWeather={getWeather} clearSuggestedCities={clearSuggestedCities}/></li>)}
        </ul>
    </div>
  )
}

export default CitySuggestions