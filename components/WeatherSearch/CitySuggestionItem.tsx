import { useWeatherStore } from "@/store/useWeatherStore";
import {City} from "@/types/weather";

const CitySuggestionItem = ({city} : {city: City}) => {

   const getWeather = useWeatherStore((state) => state.getWeather);
   const addSearch = useWeatherStore((state) => state.addSearch);
   const clearSuggestedCities = useWeatherStore((state) => state.clearSuggestedCities);

  const handelSelectedCity = (city: City) => {
    getWeather(city.latitude, city.longitude);
    clearSuggestedCities();
    addSearch(city.name, city.latitude, city.longitude);
  };

  return (
    <div
      onClick={() => handelSelectedCity(city)}
      className="w-full h-full flex justify-between cursor-pointer"
    >
      {" "}
      <span>{city.name}</span>{" "}
      <span className="text-zinc-800 text-[18px] mt-1">{`${city.country} ,${city.admin1}`}</span>
    </div>
  );
};

export default CitySuggestionItem;
