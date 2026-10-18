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

  weatherData: WeatherData | null | undefined;
  getWeather: (lat: number, lon: number, cityName?: string) => Promise<void>;

  recentSearches: CitySearch[];
  selectedCity: CitySearch | null;
  addSearch: (name: string, lat: number, lon: number) => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      // ۱. استیت‌ها و توابع مربوط به سرچ شهر
      searchInput: "",
      suggestedCities: [],
      searchTimer: null,

      searchInputHandler: (value: string) => {
        set({ searchInput: value });
        
        // پاک کردن تایمر قبلی (Debounce)
        const oldTimer = get().searchTimer;
        if (oldTimer) clearTimeout(oldTimer);

        if (!value.trim()) {
          set({ suggestedCities: [] });
          return;
        }

        // ایجاد تایمر جدید مشابه هوک خودتان
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

      // ۲. استیت‌ها و توابع مربوط به دریافت هواشناسی
      weatherData: null,
      selectedCity: null,

      getWeather: async (lat: number, lon: number, cityName?: string) => {
        if (!lat && !lon) return;

        try {
          const data = await fetchWeatherData(lat, lon);
          set({ weatherData: data });

          // اگر نام شهر هم ارسال شده بود، به عنوان شهر انتخاب‌شده ثبت و به تاریخچه اضافه شود
          if (cityName) {
            set({ selectedCity: { name: cityName, lat, lon } });
            get().addSearch(cityName, lat, lon);
          }
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },

      // ۳. تاریخچه جستجوها (ذخیره ۵ سرچ آخر)
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
      name: "weather-store-storage", // ذخیره خودکار تاریخچه در localStorage
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    }
  )
);