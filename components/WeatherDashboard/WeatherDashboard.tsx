import { WeatherData } from '@/types/weather';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import HourlyForecast from './HourlyForecast/HourlyForecast';

const WeatherDashboard = ({weatherData} : {weatherData : WeatherData}) => {
  return (
    <div>
      <CurrentWeather weatherData={weatherData}/>
      <HourlyForecast weatherData={weatherData}/>
    </div>
  )
}

export default WeatherDashboard