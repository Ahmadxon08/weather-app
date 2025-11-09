import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIconImage from "./WeatherIconImage";

type Props = {};

function DailyCard({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });

  return (
    <>
      <Card title="Daily forecasts" ChildrenclassName="flex flex-col gap-4">
        {data?.daily.map((day: any) => (
          <div className="flex justify-between" key={day.dt}>
            <p className="text-white w-9">
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>

            <WeatherIconImage src={day.weather[0].icon} />
            <p className="text-gray-50">{Math.round(day.temp.day)}°F</p>
            <p className="text-gray-500/75">{Math.round(day.temp.min)}°F</p>
            <p className="text-gray-500/75">{Math.round(day.temp.max)}°F</p>
          </div>
        ))}
      </Card>
    </>
  );
}

export default DailyCard;
