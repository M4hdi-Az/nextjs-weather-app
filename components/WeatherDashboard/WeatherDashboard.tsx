import { WeatherData } from '@/types/weather';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import HourlyForecast from './HourlyForecast/HourlyForecast';
import DailyForecast from './DailyForecast/DailyForecast';
import WeatherDetails from './WeatherDetails/WeatherDetails';

const WeatherDashboard = ({weatherData} : {weatherData : WeatherData}) => {
  console.log(weatherData);
  
  return (
    <div>
      <CurrentWeather weatherData={weatherData}/>
      <HourlyForecast weatherData={weatherData}/>
      <DailyForecast weatherData={weatherData}/>
      <WeatherDetails weatherData={weatherData}/>
    </div>
  )
}

export default WeatherDashboard