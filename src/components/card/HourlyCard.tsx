import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIconImage from "./WeatherIconImage";

const HourlyCard = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 41.31, lon: 69.24 }),
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
            <p className="text-white text-sm whitespace-nowrap font-medium">
              {hourString}
            </p>
            <WeatherIconImage src={hour.weather[0].icon} />
            <p className="text-white text-sm font-semibold">
              {Math.round(hour.temp)}°F
            </p>
          </div>
        );
      })}
    </Card>
  );
};

export default HourlyCard;
