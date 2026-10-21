
function SectionHeader({title}: {title: string}) {
  
  return (
    
    <div className="relative mx-28 mb-20 max-[1251px]:mx-20 max-[1075px]:mx-4">
      <h1 className="text-4xl font-bold ml-2 text-slate-800 dark:text-white tracking-tight drop-shadow-sm max-[1251px]:text-3xl">
        {title}
      </h1>
      <span className="h-full w-1 absolute top-0 left-0 bg-sky-500 rounded-full shadow-sm"></span>
    </div>
  );
}

export default SectionHeader;
