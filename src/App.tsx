import DailyCard from "./components/card/DailyCard";
import HourlyCard from "./components/card/HourlyCard";
import CurrentCard from "./components/card/CurrentCard";
import AdditionalInfo from "./components/card/AdditionalInfo";
import Map from "./components/card/Map";
import { useState } from "react";
import type { CoordsType } from "./schemas/types";
import LocationDropDown from "./components/dropdown/LocationDropDown";

const App = () => {
  const [coords, setCoords] = useState<CoordsType>({ lat: 10, lon: 25 });

  const handleClickMap = (lat: number, lon: number) => {
    setCoords({ lat, lon });
  };

  return (
    <div className="flex justify-center flex-col items-center bg-gray-800 gap-3.5 p-4">
      <LocationDropDown />
      <Map coords={coords} handleClickMap={handleClickMap} />
      <CurrentCard coords={coords} />
      <HourlyCard coords={coords} />
      <DailyCard coords={coords} />
      <AdditionalInfo coords={coords} />
    </div>
  );
};

export default App;
