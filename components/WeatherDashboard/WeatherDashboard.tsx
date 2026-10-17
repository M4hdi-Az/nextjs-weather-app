import { WeatherData } from '@/types/weather';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import HourlyForecast from './HourlyForecast/HourlyForecast';
import DailyForecast from './DailyForecast/DailyForecast';

const WeatherDashboard = ({weatherData} : {weatherData : WeatherData}) => {
  return (
    <div>
      <CurrentWeather weatherData={weatherData}/>
      <HourlyForecast weatherData={weatherData}/>
      <DailyForecast weatherData={weatherData}/>
    </div>
  )
}

export default WeatherDashboard