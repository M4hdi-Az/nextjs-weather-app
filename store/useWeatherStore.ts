import { create } from "zustand";
import { persist } from "zustand/middleware";
import { searchCities, fetchWeatherData } from "@/services/weather";
import { City, CitySearch, WeatherData } from "@/types/weather";


interface WeatherStore {
  searchInput: string;
  suggestedCities: City[];
  searchInputHandler: (value: string) => void;
  clearSuggestedCities: () => void;
  searchTimer: NodeJS.Timeout | null;

  isLoading: boolean;
  weatherData: WeatherData | null | undefined;
  getWeather: (lat: number, lon: number, cityName?: string) => Promise<void>;

  recentSearches: CitySearch[];
  selectedCity: CitySearch | null;
  addSearch: (name: string, lat: number, lon: number) => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      searchInput: "",
      suggestedCities: [],
      searchTimer: null,
      isLoading: false,

      searchInputHandler: (value: string) => {
        set({ searchInput: value });
        
        const oldTimer = get().searchTimer;
        if (oldTimer) clearTimeout(oldTimer);

        if (!value.trim()) {
          set({ suggestedCities: [] });
          return;
        }

        const timer = setTimeout(async () => {
          try {
            const data = await searchCities(value);
            set({ suggestedCities: data.results || [] });
          } catch (error) {
            console.error("Error searching cities:", error);
            set({ suggestedCities: [] });
          }
        }, 500);

        set({ searchTimer: timer });
      },

      clearSuggestedCities: () => set({ suggestedCities: [] }),

      weatherData: null,
      selectedCity: null,

      getWeather: async (lat: number, lon: number, cityName?: string) => {
        if (!lat && !lon) return;
        set({ isLoading: true });
        try {
          const data = await fetchWeatherData(lat, lon);
          set({ weatherData: data });

          if (cityName) {
            set({ selectedCity: { name: cityName, lat, lon } })
            get().addSearch(cityName, lat, lon);
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        } finally {
          set({ isLoading: false }); 
        }
      },

      recentSearches: [],

      addSearch: (name: string, lat: number, lon: number) => {
        const currentSearches = get().recentSearches;
        const filtered = currentSearches.filter(
          (item) => item.name.toLowerCase() !== name.toLowerCase()
        );
        const updated = [{ name, lat, lon }, ...filtered].slice(0, 5);
        set({ recentSearches: updated });
      },
    }),
    {
      name: "weather-store-storage",
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
);