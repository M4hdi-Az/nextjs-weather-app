import { useState } from "react";
import { useWeatherStore } from "@/store/useWeatherStore";

export function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const fetchWeather = useWeatherStore((state) => state.getWeather); 

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند.");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
        await fetchWeather(latitude, longitude);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
        alert("دسترسی به لوکیشن رد شد.");
      },
      { enableHighAccuracy: true }
    );
  };

  return { getLocation, isLoading };
}