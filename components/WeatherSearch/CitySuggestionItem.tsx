import { City } from "@/types/weather";

const CitySuggestionItem = ({ city }: { city: City }) => {
    console.log(city)
    return (
        <div className="w-full h-full flex justify-between cursor-pointer"> <span>{city.name}</span> <span className="text-zinc-800 text-[18px] mt-1">{`${city.country} ,${city.admin1}`}</span></div>
    )
}

export default CitySuggestionItem