import { SunMoon, Sunrise, Sunset } from "lucide-react";
import DynamicSunArcChart from "./DynamicSunArcChart";

const SunArc = ({progress, sunrise, sunset}: {progress: number, sunrise: string, sunset: string}) => {
  return (
    <div className="w-[328px] h-[330px] flex flex-col gap-8 rounded-3xl border border-white/40 bg-white/30 p-5 shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-900">
        <SunMoon className="h-8 w-8 text-blue-500" />
        <span className="text-lg font-medium">Sunrise & sunset</span>
      </div>

      <div className="flex flex-col items-center my-5">
        <div className="relative flex-1 my-2">
          <DynamicSunArcChart progress={progress} />
        </div>
        <div className="flex w-full my-2 justify-between items-end">
          <div>
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-800">
              <Sunrise className="h-6 w-6 text-amber-500" /> Sunrise
            </div>
            <p className="text-lg font-bold text-slate-800">{sunrise}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-800 justify-end">
             Sunset <Sunset className="h-6 w-6 text-indigo-500" /> 
            </div>
            <p className="text-lg font-bold text-slate-800">{sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunArc;
