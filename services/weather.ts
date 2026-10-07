export const searchCities = async (query: string) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=4&language=en&format=json`,
  );
  const data = await res.json();
  return data;
};
