"use client";

import { CitySearch } from "@/types/weather";
import { useEffect, useState } from "react";



const STORAGE_KEY = "recent_weather_searches";

export function useRecentSearches() {
  const [recentSearches,setRecentSearches] = useState<CitySearch[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if(saved){
        try{
            setRecentSearches(JSON.parse(saved))
        }catch(e){
            console.error("Failed to parse recent searches", e)
        }
    }

  }, [])

 const addSearch = (name: string, lat: number | string, lon: number | string) => {
  setRecentSearches((prev) => {
    const filtered = prev.filter(
      (item) => item.name.toLowerCase() !== name.toLowerCase()
    );
    
    const updated = [
      { 
        name, 
        lat: Number(lat), 
        lon: Number(lon) 
      }, 
      ...filtered
    ].slice(0, 5);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  });
};

  return { recentSearches, addSearch };

}
