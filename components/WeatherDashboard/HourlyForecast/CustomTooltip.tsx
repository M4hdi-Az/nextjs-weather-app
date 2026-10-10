export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div 
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.15)',
        }}
        className="rounded-2xl p-3 text-slate-800 text-xl min-w-[200px]"
      >
        <p className="font-bold text-sky-950 mb-1.5 border-b border-slate-200/60 pb-1">{label}</p>
        <div className="flex flex-col gap-1">
          <p className="text-sky-700 flex justify-between items-center">
            <span>temperature:</span> 
            <span className="font-bold">{payload[0].value}°C</span>
          </p>
          {payload[1] && (
            <p className="text-sky-600 flex justify-between items-center">
              <span>precipitation:</span> 
              <span className="font-bold">{payload[1].value}%</span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};