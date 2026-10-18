import SunArc from "./SunArc";
import UVCard from "./UVCard";
import DewPoint from "./DewPoint";
import Precipitation from "./Precipitation";
import { WeatherData } from "@/types/weather";
import { getDewPointInfo, getRainInfo, getUvInfo, processWeatherData } from "@/utils/weatherHelpers";
import { useWeatherStore } from "@/store/useWeatherStore";

export default function WeatherDetails() {

  const weatherData = useWeatherStore((state) => state.weatherData)

const {
    sunrise,
    sunset,
    dayProgress,
    uvIndex,
    dewPoint,
    precipitation,
  } = processWeatherData(weatherData)

  const uv = Math.round(uvIndex);
  const uvInfo = getUvInfo(uv);
  const dew = Math.round(dewPoint);
  const dewInfo = getDewPointInfo(dew);
  const rainInfo = getRainInfo(precipitation);

  return (
    <section className="mx-auto flex justify-center mb-40 max-w-[1380px] flex-wrap gap-4">
      <SunArc progress={dayProgress} sunrise={sunrise} sunset={sunset} />
      <UVCard uvInfo={uvInfo} uv={uv} />
      <DewPoint dew={dew} dewInfo={dewInfo} />
      <Precipitation rainInfo={rainInfo} precipitation={precipitation} />
    </section>
  );
}
