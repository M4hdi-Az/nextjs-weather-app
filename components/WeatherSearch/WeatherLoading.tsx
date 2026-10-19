"use client";

import React from "react";
import { CloudSun, Compass, Droplets, Eye, Gauge, Wind } from "lucide-react";

interface WeatherLoadingProps {
  message?: string;
}

export default function WeatherLoading({
  message = "Updating weather telemetry...",
}: WeatherLoadingProps) {
  return (
    <div
      className="relative mx-auto min-h-[650px] w-full max-w-5xl animate-fade-in p-4 sm:p-6"
      aria-busy="true"
      aria-live="polite"
    >
      {/* ------------------ Floating Glass Header Loading ------------------ */}
      <div className="relative mb-12 flex items-center gap-4">
        {/* Accent Bar */}
        <div className="h-14 w-1.5 animate-pulse rounded-full bg-sky-500/80 shadow-md shadow-sky-500/30" />

        <div className="flex flex-col gap-2">
          {/* Title Skeleton */}
          <div className="h-10 w-64 animate-pulse rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm" />
          {/* Subtitle Skeleton */}
          <div className="h-4 w-36 animate-pulse rounded-lg bg-white/30 backdrop-blur-sm" />
        </div>
      </div>

      {/* ------------------ Central Status Badge / Spinner ------------------ */}
      <div className="mb-10 flex items-center justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/60 bg-white/40 px-5 py-2.5 shadow-lg shadow-sky-500/10 backdrop-blur-md transition-all">
          <div className="relative flex size-6 items-center justify-center">
            <CloudSun className="size-6 animate-bounce text-sky-600" />
            <span className="absolute -inset-1 animate-ping rounded-full bg-sky-400/20" />
          </div>
          <span className="text-sm font-medium tracking-wide text-slate-700">
            {message}
          </span>
        </div>
      </div>

      {/* ------------------ Dashboard Cards Skeleton Grid ------------------ */}
      <div className="grid w-full gap-4 lg:grid-cols-5">
        {/* Hero Card Skeleton */}
        <div className="flex min-h-[300px] flex-col justify-between rounded-[2rem] border border-white/50 bg-white/30 p-6 shadow-lg shadow-sky-500/10 backdrop-blur-md sm:p-8 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div className="h-4 w-24 animate-pulse rounded-md bg-slate-300/40" />
            <div className="size-16 animate-pulse rounded-full bg-sky-400/20 backdrop-blur-sm sm:size-20" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="h-24 w-44 animate-pulse rounded-3xl bg-slate-300/40" />
            <div className="h-7 w-32 animate-pulse rounded-xl bg-slate-300/40" />
            <div className="h-8 w-36 animate-pulse rounded-full bg-white/50 border border-white/60" />
          </div>
        </div>

        {/* Metrics Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-3">
          {/* Wind Speed Card */}
          <div className="col-span-2 flex flex-col justify-between rounded-3xl border border-white/50 bg-white/30 p-6 shadow-lg shadow-sky-500/10 backdrop-blur-md sm:col-span-3">
            <div className="flex items-center gap-2 text-slate-600">
              <Wind className="size-4 animate-spin text-blue-600" style={{ animationDuration: "3s" }} />
              <span className="text-sm font-medium">Wind speed and direction</span>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="h-10 w-28 animate-pulse rounded-2xl bg-slate-300/40" />
                <div className="h-4 w-20 animate-pulse rounded-lg bg-slate-300/30" />
                <div className="h-4 w-24 animate-pulse rounded-lg bg-slate-300/30" />
              </div>

              <div className="flex size-20 items-center justify-center rounded-full border border-white/60 bg-white/20 p-2 shadow-inner">
                <Compass className="size-10 animate-pulse text-slate-400" />
              </div>
            </div>
          </div>

          {/* Humidity Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/50 bg-white/30 p-6 shadow-lg shadow-sky-500/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-slate-600">
              <Droplets className="size-4 animate-bounce text-sky-600" />
              <span className="text-sm font-medium">Humidity</span>
            </div>

            <div className="my-6 flex flex-col gap-2">
              <div className="h-9 w-20 animate-pulse rounded-xl bg-slate-300/40" />
              <div className="h-4 w-24 animate-pulse rounded-lg bg-slate-300/30" />
            </div>

            <div className="h-2 w-full animate-pulse rounded-full bg-slate-300/40" />
          </div>

          {/* Pressure Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/50 bg-white/30 p-6 shadow-lg shadow-sky-500/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-slate-600">
              <Gauge className="size-4 text-indigo-600" />
              <span className="text-sm font-medium">Surface pressure</span>
            </div>

            <div className="my-6 flex flex-col gap-2">
              <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-300/40" />
              <div className="h-4 w-20 animate-pulse rounded-lg bg-slate-300/30" />
            </div>

            <div className="h-2 w-full animate-pulse rounded-full bg-slate-300/40" />
          </div>

          {/* Visibility Card */}
          <div className="col-span-2 flex flex-col justify-between rounded-3xl border border-white/50 bg-white/30 p-6 shadow-lg shadow-sky-500/10 backdrop-blur-md sm:col-span-1">
            <div className="flex items-center gap-2 text-slate-600">
              <Eye className="size-4 text-teal-600" />
              <span className="text-sm font-medium">Visibility</span>
            </div>

            <div className="my-6 flex flex-col gap-2">
              <div className="h-9 w-20 animate-pulse rounded-xl bg-slate-300/40" />
              <div className="h-4 w-24 animate-pulse rounded-lg bg-slate-300/30" />
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-2 animate-pulse rounded-full bg-slate-300/40" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}