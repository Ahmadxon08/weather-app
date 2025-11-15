import DailyCard from "./components/card/DailyCard";
import HourlyCard from "./components/card/HourlyCard";
import CurrentCard from "./components/card/CurrentCard";
import AdditionalInfo from "./components/card/AdditionalInfo";
import Map from "./components/card/Map";
import { useState } from "react";
import type { CoordsType } from "./schemas/types";
import LocationDropDown from "./components/dropdown/LocationDropDown";
import { useQuery } from "@tanstack/react-query";
import { getGeoCoding } from "./api";
import MapTypeDropDown from "./components/dropdown/MaptypeDropdown";
import MapLegand from "./components/card/MapLegand";

const App = () => {
  const [coordinates, setCoords] = useState<CoordsType>({
    lat: 41.3111,
    lon: 69.2797,
  });

  const [location, setLocation] = useState("Tokyo");
  const [mapType, setMapType] = useState("clouds_new");
  const { data } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeoCoding(location),
  });

  const handleClickMap = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation("custom");
  };

  const coords =
    location === "custom"
      ? coordinates
      : { lat: data?.[0].lat ?? 0, lon: data?.[0].lon ?? 0 };
  return (
    <div className="flex justify-center flex-col  bg-gray-800 gap-3.5 p-4">
      <div className="flex gap-6">
        <div className="flex gap-2">
          <h1 className="text-2xl">Location:</h1>
          <LocationDropDown location={location} setLocation={setLocation} />
        </div>
        <div className="flex gap-2">
          <h1 className="text-2xl">Map type:</h1>
          <MapTypeDropDown mapType={mapType} setMapType={setMapType} />
        </div>
      </div>

      <div className="relative">
        <Map
          coords={coords}
          handleClickMap={handleClickMap}
          mapType={mapType}
        />
        <MapLegand mapType={mapType} />
      </div>
      <CurrentCard coords={coords} />
      <HourlyCard coords={coords} />
      <DailyCard coords={coords} />
      <AdditionalInfo coords={coords} />
    </div>
  );
};

export default App;
