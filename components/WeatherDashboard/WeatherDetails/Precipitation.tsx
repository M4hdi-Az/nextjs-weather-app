import { CloudRain } from "lucide-react";

const Precipitation = ({precipitation, rainInfo} : {precipitation : number, rainInfo: {label: string, note: string}}) => {
  const rainPercent = Math.min(Math.max((precipitation / 20) * 100, 0), 100);
  return (
    <div className="w-[328px] h-[330px] flex flex-col gap-3  rounded-3xl border border-white/40 bg-white/30 p-5 shadow-lg backdrop-blur-md max-[370px]:m-6">
      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-900">
        <CloudRain className="h-8 w-8 text-blue-500" />
        <span className="text-lg font-medium">Precipitation</span>
      </div>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold text-slate-800">
              {precipitation.toFixed(1)}
            </span>
            <span className="text-lg font-semibold text-slate-600 dark:text-slate-900">mm</span>
          </div>
          <p className="text-lg font-semibold text-slate-800 mt-1">
            {rainInfo.label}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-900">{rainInfo.note}</p>
        </div>


        <div>
          <div className="h-3 rounded-full bg-slate-200/60 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${rainPercent}%` }} />
          </div>
          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-800 mt-1">
            <span>0</span>
            <span>20+ mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Precipitation;
