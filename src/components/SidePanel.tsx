import { getAirPollution } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./card/Card";
import { Suspense } from "react";
import type { CoordsType } from "@/schemas/types";
import { Slider } from "./ui/slider";

type Props = {
  coords: CoordsType;
};

type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor";

interface Range {
  min: number;
  max: number | null;
}

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

  return (
    <>
      <div className="flex gap-2 p-2 flex-col">
        <h1 className="text-2xl ">Air Pullution</h1>
        <h1 className="text-3xl ">{data.list[0].main.aqi}</h1>
        <h1 className="text-xl ">AQI</h1>

        {Object.entries(data.list[0].components).map(([key, value]) => {
          const pullutant =
            airQualityRanges[
              key.toUpperCase() as keyof typeof airQualityRanges
            ];
          if (!pullutant) return null;
          const max =
            pullutant["Very Poor"].max ?? pullutant["Very Poor"].min * 2;
          return (
            <Card
              key={key}
              className=" hover:scale-105 transition-transform duration-300 border  p-1.5! gap-0!   "
            >
              <div className="w-full justify-between flex mb-2   items-center">
                <span className="text-lg font-bold capitalize ">{key}</span>
                <span className="text-lg font-semibold ">{value}</span>
              </div>
              <Slider min={0} max={max} defaultValue={[value]} step={1} />
              <div className="flex mt-2 justify-between">
                <p className="text-xs">0</p>
                <p className="text-xs">{max}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

const SidePanel = ({ coords }: Props) => {
  return (
    <div className="fixed top-0 right-0 h-screen z-1001 w-60 shadow-md bg-sidebar">
      <Suspense fallback={"loading..."}>
        <AirPullution coords={coords} />
      </Suspense>
    </div>
  );
};

export default SidePanel;
