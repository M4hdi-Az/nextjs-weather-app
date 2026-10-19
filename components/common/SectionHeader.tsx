
function SectionHeader({title}: {title: string}) {
  return (
    
    <div className="relative mx-28 mb-20 ">
      <h1 className="text-4xl font-bold ml-2 text-slate-800 tracking-tight drop-shadow-sm">
        {title}
      </h1>
      <span className="h-full w-1 absolute top-0 left-0 bg-sky-500 rounded-full shadow-sm"></span>
    </div>
  );
}

export default SectionHeader;
