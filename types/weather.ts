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
}
