export type City = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
};

export type CitySearchResponse = {
  results?: City[];
  generationtime_ms: number;
};

export type CurrentWeather = {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  surface_pressure: number;
  visibility: number;
};

export type HourlyWeather = {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
};

export type DailyWeather = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
};

export type WeatherData = {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
};

export type GetWeatherFn = (lat: number, lon: number) => Promise<void>;

export type HourlyData = {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
};