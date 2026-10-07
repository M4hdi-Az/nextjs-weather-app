"use client"
import { searchCities } from "@/services/weather";
import { City } from "@/types/weather";
import { useEffect, useState } from "react";

export function useCitySearch() {

  const [suggestedCities, setSuggestedCities] = useState<City[]>([]);
  const [searchInput, setSearchInput] = useState("");

  
  useEffect(() => {
    if(!searchInput.trim()) {
      setSuggestedCities([])
      return;
    }
    const timer = setTimeout(() => {
      const getSuggestedCitys = async () => {
        const data = await searchCities(searchInput)
        setSuggestedCities(data.results || [])
      }
      getSuggestedCitys()
    }, 500);
    return () => clearTimeout(timer)
  }, [searchInput])

  const searchInputHandler = (value: string) => {
    setSearchInput(value)
  }

  const clearSuggestedCities = () => {
    setSuggestedCities([])
  }

  return {searchInputHandler, suggestedCities, searchInput, clearSuggestedCities}
}