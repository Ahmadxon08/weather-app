import { getAirPollution } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./card/Card";
import { Suspense, type Dispatch, type SetStateAction } from "react";
import type { CoordsType } from "@/schemas/types";
import { Slider } from "./ui/slider";
import clsx from "clsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ChevronRight, Info } from "lucide-react";
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton";

type Props = {
  coords: CoordsType;
  isSidePanelOpen?: boolean;
  setSidePanelOpen?: Dispatch<SetStateAction<boolean>>;
};

type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

interface Range {
  min: number;
  max: number | null;
}

const pollutantNameMapping: Record<Pollutant, string> = {
  SO2: "Sulfur dioxide",
  NO2: "Nitrogen dioxide",
  PM10: "Particulate matter 10",
  PM2_5: "Fine particles matter",
  O3: "Ozone",
  CO: "Carbon monoxide",
  NO: "Nitrogen monoxide",
  NH3: "Ammonia",
};

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO";

interface AirQualityRanges {
  [key: string]: {
    [level in AirQualityLevel]?: Range;
  };
}

const airQualityRanges: AirQualityRanges = {
  SO2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: null },
  },
  NO2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM2_5: {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: null },
  },
  O3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: null },
  },
  CO: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: null },
  },
};

const AirPullution = ({ coords }: Props) => {
  console.log(coords);

  const { data } = useSuspenseQuery({
    queryKey: ["pollution", coords],
    queryFn: () =>
      getAirPollution({
        lat: coords?.lat,
        lon: coords?.lon,
      }),
  });

  if (!data?.list?.[0]?.components) {
    return <p className="p-4">No air pollution data</p>;
  }

  return (
    <>
      <div className="flex gap-2 p-2 flex-col">
        <h1 className="text-2xl ">Air Pullution</h1>
        <h1 className="text-3xl ">{data.list[0].main.aqi}</h1>
        <div className="flex gap-3 items-center">
          <h1 className="text-xl ">AQI</h1>
          <Tooltip>
            <TooltipTrigger>
              <Info className="size-4 " />
            </TooltipTrigger>
            <TooltipContent className="z-2222">
              <p className="max-w-xs">
                Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 =
                Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        {Object.entries(data.list[0].components).map(([key, value]) => {
          const pullutant =
            airQualityRanges[
              key.toUpperCase() as keyof typeof airQualityRanges
            ];
          if (!pullutant) return null;

          const currentLevel =
            Object.entries(pullutant).find(([level, range]) => {
              return (
                value >= range.min && (range.max === null || value <= range.max)
              );
            })?.[0] ?? "Very Poor";

          const max =
            pullutant["Very Poor"].max ?? pullutant["Very Poor"].min * 2;

          const qualityColor = (() => {
            switch (currentLevel) {
              case "Good":
                return "bg-green-500";
              case "Fair":
                return "bg-yellow-500";
              case "Moderate":
                return "bg-blue-500";
              case "Poor":
                return "bg-purple-500";
              case "Very Poor":
                return "bg-red-500";

              default:
                break;
            }
          })();

          return (
            <Card key={key}>
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2">
                  <span className="capitalize">{key}</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-4 " />
                    </TooltipTrigger>
                    <TooltipContent className="z-2222">
                      <p className="max-w-xs">
                        Concentration of{" "}
                        {pollutantNameMapping[key.toUpperCase() as Pollutant]}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span>{value}</span>
              </div>
              <Slider min={0} max={max} defaultValue={[value]} step={1} />
              <div className="flex justify-between text-xs mt-2">
                <p>0</p>
                <p>{max}</p>
              </div>
              <div className="flex justify-between w-full mt-1">
                {Object.keys(pullutant).map((levelName) => (
                  <span
                    key={levelName}
                    className={clsx(
                      "text-xs p-0.5 rounded-sm ",
                      levelName === currentLevel ? qualityColor : "bg-muted"
                    )}
                  >
                    {levelName}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

const SidePanel = ({ coords, isSidePanelOpen, setSidePanelOpen }: Props) => {
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen z-1001 panel-scroll w-(--sidebar-width) shadow-md bg-sidebar overflow-y-auto transition-transform lg:translate-x-0 duration-300",
        isSidePanelOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <button
        onClick={() => setSidePanelOpen(false)}
        className=" md:hidden mt-2"
      >
        <ChevronRight />
      </button>
      <Suspense fallback={<SidePanelSkeleton />}>
        <AirPullution coords={coords} />
      </Suspense>
    </div>
  );
};

export default SidePanel;
