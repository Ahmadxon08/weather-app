import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIconImage from "./WeatherIconImage";
import type { CoordsType } from "../../schemas/types";

type Props = {
  coords: CoordsType;
};
const HourlyCard = ({ coords }: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      ChildrenclassName="flex gap-4 overflow-x-auto custom-scroll px-4 py-4"
    >
      {data?.hourly?.map((hour: any) => {
        const time = new Date(hour.dt * 1000);
        const hourString = time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        return (
          <div
            key={hour.dt}
            className="flex flex-col items-center justify-center gap-2 backdrop-blur-md p-3 rounded-2xl min-w-[90px] hover:bg-white/20 transition-all"
          >
            <p className=" text-sm whitespace-nowrap font-medium">
              {hourString}
            </p>
            <WeatherIconImage src={hour.weather[0].icon} />
            <p className=" text-sm font-semibold">{Math.round(hour.temp)}°F</p>
          </div>
        );
      })}
    </Card>
  );
};

export default HourlyCard;
