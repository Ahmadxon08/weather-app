import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIconImage from "./WeatherIconImage";
import type { CoordsType } from "../../schemas/types";

type Props = {
  coords: CoordsType;
};

function DailyCard({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <>
      <Card
        title="Daily forecasts"
        ChildrenclassName="flex flex-col gap-[8.5px]"
      >
        {data?.daily.map((day: any) => (
          <div className="flex justify-between" key={day.dt}>
            <p className=" w-9">
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>

            <WeatherIconImage src={day.weather[0].icon} className="size-10" />
            <p>{Math.round(day.temp.day)}°C</p>
            <p className="text-gray-500/75">{Math.round(day.temp.min)}°C</p>
            <p className="text-gray-500/75">{Math.round(day.temp.max)}°C</p>
          </div>
        ))}
      </Card>
    </>
  );
}

export default DailyCard;
