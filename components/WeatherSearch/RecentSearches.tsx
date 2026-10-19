import { useWeatherStore } from "@/store/useWeatherStore";

function RecentSearches({name, lat, lon} : {name: string; lat: number, lon: number}) {

    const getWeather = useWeatherStore((state) => state.getWeather);

  return (
    <div onClick={() => getWeather(lat, lon)} className=" px-5 py-3 rounded-xl bg-blue-400/20  backdrop-blur-sm cursor-pointer dark:text-white hover:bg-blue-400/60">
        {name}
    </div>
  )
}

export default RecentSearches