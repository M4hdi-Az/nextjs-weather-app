import { WeatherData } from '@/types/weather';
import CurrentWeather from './CurrentWeather';

const WeatherDashboard = ({weatherData} : {weatherData : WeatherData}) => {
  return (
    <div>
      <CurrentWeather weatherData={weatherData}/>
    </div>
  )
}

export default WeatherDashboard