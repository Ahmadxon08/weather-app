import DailyCard from "./components/card/DailyCard";
import HourlyCard from "./components/card/HourlyCard";
import CurrentCard from "./components/card/CurrentCard";
import AdditionalInfo from "./components/card/AdditionalInfo";
import Map from "./components/card/Map";
import { Suspense, useState } from "react";
import type { CoordsType } from "./schemas/types";
import LocationDropDown from "./components/dropdown/LocationDropDown";
import { useQuery } from "@tanstack/react-query";
import { getGeoCoding } from "./api";
import MapTypeDropDown from "./components/dropdown/MaptypeDropdown";
import MapLegand from "./components/card/MapLegand";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import AdditionalSkeleton from "./components/skeletons/AdditionalSkeleton";
import SidePanel from "./components/SidePanel";
import { Menu } from "lucide-react";
import DarkMode from "./components/DarkMode";

const App = () => {
  const [coordinates, setCoords] = useState<CoordsType>({
    lat: 41.3111,
    lon: 69.2797,
  });

  const [isSidePanelOpen, setSidePanelOpen] = useState(false);

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
    <>
      <div className="flex justify-center flex-col lg:w-[calc(100vw-var(--sidebar-width))]   w-full  gap-3.5 p-4">
        <div className="flex w-full items-start justify-start md:items-center md:justify-between  pr-4 md:gap-6 gap-2.5">
          <div className="flex flex-col md:flex-row gap-1.5 ">
            <div className="flex gap-2 justify-between w-full">
              <h1 className="md:text-2xl text-xl">Location:</h1>
              <LocationDropDown location={location} setLocation={setLocation} />
            </div>
            <div className="flex gap-2">
              <h1 className="md:text-2xl text-xl whitespace-nowrap">
                Map type:
              </h1>
              <MapTypeDropDown mapType={mapType} setMapType={setMapType} />
            </div>
          </div>
          <DarkMode />
          <button
            onClick={() => setSidePanelOpen(true)}
            className=" ml-auto justify-start lg:hidden "
          >
            <Menu />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative col-span-1 md:col-span-2">
            <Map
              coords={coords}
              handleClickMap={handleClickMap}
              mapType={mapType}
            />
            <MapLegand mapType={mapType} />
          </div>

          <div className="col-span-1">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentCard coords={coords} />
            </Suspense>
          </div>

          <div className="col-span-1">
            <Suspense fallback={<DailySkeleton />}>
              <DailyCard coords={coords} />
            </Suspense>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyCard coords={coords} />
            </Suspense>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Suspense fallback={<AdditionalSkeleton />}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>
        </div>
      </div>
      <SidePanel
        coords={coords}
        isSidePanelOpen={isSidePanelOpen}
        setSidePanelOpen={setSidePanelOpen}
      />
    </>
  );
};

export default App;
