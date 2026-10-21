import { Droplets} from "lucide-react";

const UVCard = ({dewInfo, dew}: {dewInfo: {label: string, color: string, note: string}, dew: number}) => {

  const minDew = -10;
const maxDew = 30;
const dewPercent = Math.min(Math.max(((dew - minDew) / (maxDew - minDew)) * 100, 0), 100);
  return (
    <div className="w-[328px] h-[330px] flex flex-col gap-3 rounded-3xl border border-white/40 bg-white/30 p-5 shadow-lg backdrop-blur-md max-[370px]:m-6">
      <div className="flex items-center gap-1.5 text-slate-600  dark:text-slate-900">
        <Droplets className="h-8 w-8 text-sky-500" />
        <span className="text-lg font-medium">Dew point</span>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-bold text-slate-800">{dew}°</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-sm font-semibold ${dewInfo.color}`}
            >
              {dewInfo.label}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-900 mt-3">{dewInfo.note}</p>
        </div>
        <div>
          <div className="relative h-3 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right, #38bdf8, #34d399, #f43f5e)" }}>
            <span className="absolute top-0 bottom-0 w-3 bg-white border-2 border-slate-700 rounded-full shadow" style={{ left: `${dewPercent}%` }} />
          </div>
          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-700 mt-1">
            <span>Dry</span>
            <span>Muggy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UVCard;
