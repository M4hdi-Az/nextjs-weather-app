import { GetWeatherFn } from "@/types/weather";

function RecentSearchs({name, lat, lon ,getWeather} : {name: string; getWeather: GetWeatherFn; lat: number, lon: number}) {

  return (
    <div onClick={() => getWeather(lat, lon)} className=" px-5 py-3 rounded-xl bg-blue-400/20  backdrop-blur-sm cursor-pointer">
        {name}
    </div>
  )
}

export default RecentSearchs