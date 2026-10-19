import { Sun } from "lucide-react";

const UVCard = ({ uvInfo, uv } : { uvInfo: {label: string, note: string, color: string}, uv: number }) => {

  const uvPercent = Math.min(Math.max((uv / 11) * 100, 0), 100);
  return (
    <div className="w-[328px] h-[330px] flex flex-col gap-3 rounded-3xl border border-white/40 bg-white/30 p-5 shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-900">
        <Sun className="h-8 w-8 text-blue-500" />
        <span className="text-lg font-medium">UV index</span>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-bold text-slate-800">{uv}</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-sm font-semibold ${uvInfo.color}`}
            >
              {uvInfo.label}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-900 mt-3">{uvInfo.note}</p>
        </div>
        <div>
          <div
            className="relative h-3 rounded-full overflow-hidden"
            style={{
              background:
                "linear-gradient(to right, #34d399, #facc15, #fb923c, #ef4444)",
            }}
          >
            <span
              className="absolute top-0 bottom-0 w-3 bg-white border-2 border-slate-700 rounded-full shadow"
              style={{ left: `${uvPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-800 mt-2">
            <span>0</span>
            <span>11+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UVCard;
