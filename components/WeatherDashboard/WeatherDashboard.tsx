
import CurrentWeather from './CurrentWeather/CurrentWeather';
import HourlyForecast from './HourlyForecast/HourlyForecast';
import DailyForecast from './DailyForecast/DailyForecast';
import WeatherDetails from './WeatherDetails/WeatherDetails';

const WeatherDashboard = () => {
  
  return (
    <div>
      <CurrentWeather/>
      <HourlyForecast/>
      <DailyForecast/>
      <WeatherDetails/>
    </div>
  )
}

export default WeatherDashboard