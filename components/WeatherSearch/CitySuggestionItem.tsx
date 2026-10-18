import { City, CitySearch, GetWeatherFn } from "@/types/weather";

const CitySuggestionItem = (
  {
    city,
    getWeather,
    clearSuggestedCities,
    addSearch,
  }: { city: City; getWeather: GetWeatherFn; clearSuggestedCities: () => void ,
  addSearch: (name: string, lat: number | string, lon: number | string) => void,},
 
) => {
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
