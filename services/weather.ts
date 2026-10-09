export const searchCities = async (query: string) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=4&language=en&format=json`,
  );
  const data = await res.json();
  return data;
};

export const fetchWeatherData = async (lat: number, lon: number) => {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
      "surface_pressure",
      "visibility",
    ].join(","),
    hourly: [
      "temperature_2m",
      "weather_code",
      "precipitation_probability",
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "uv_index_max",
    ].join(","),
    wind_speed_unit: "kmh", // 👈 اضافه شد: تضمین دریافت سرعت باد بر حسب km/h
    timezone: "auto",
  });

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
  );
  
  if (!res.ok) throw new Error("Failed to fetch weather data");
  
  const data = await res.json();
  return data;
};