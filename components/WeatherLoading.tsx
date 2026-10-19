"use client";

import { CloudSun, Loader2 } from "lucide-react";

interface WeatherLoadingProps {
  message?: string;
}

export default function WeatherLoading({
  message = "Fetching weather information...",
}: WeatherLoadingProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-md p-4 animate-fade-in"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center justify-center gap-5 rounded-3xl border border-white/60 bg-white/40 px-8 py-10 shadow-2xl shadow-sky-500/20 backdrop-blur-xl max-w-sm w-full text-center">
        
        <div className="relative flex size-20 items-center justify-center rounded-2xl bg-white/50 border border-white/80 shadow-inner">
          <CloudSun className="size-10 animate-bounce text-sky-600" />
          <span className="absolute -inset-2 animate-ping rounded-3xl bg-sky-400/20" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Loader2 className="size-5 animate-spin text-sky-700" />
            <h3 className="text-lg font-semibold text-slate-800">
              Please wait
            </h3>
          </div>
          <p className="text-sm font-medium text-slate-600">{message}</p>
        </div>

        <div className="w-full h-1.5 overflow-hidden rounded-full bg-slate-200/50 mt-2">
          <div className="h-full w-full animate-pulse rounded-full bg-sky-500" />
        </div>
      </div>
    </div>
  );
}