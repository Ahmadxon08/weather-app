import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIconImage from "./WeatherIconImage";

type Props = {};

const CurrentCard = (props: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 41, lon: 69 }),
  });

  return (
    <Card
      title="Current Weather"
      ChildrenclassName="flex justify-center flex-col gap-6 items-center"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-6xl font-semibold text-center text-white">
          {Math.round(data.current.temp)}°F
        </h2>
        <WeatherIconImage
          src={data.current.weather[0].icon}
          className="size-14"
        />

        <h3 className="capitalize text-2xl text-white">
          {data.current.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-center text-white">Local time:</p>
        <h3 className="text-4xl text-white font-semibold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>

      <div className="flex justify-between  w-full">
        <div className="flex text-white flex-col items-center gap-3">
          <p>Feels like</p>
          <p>{Math.round(data.current.feels_like)}°F</p>
        </div>
        <div className="flex text-white flex-col items-center gap-3">
          <p>Humidity</p>
          <p>{data.current.humidity}</p>
        </div>
        <div className="flex text-white flex-col items-center gap-3">
          <p>Wind Speed</p>
          <p>{data.current.wind_speed}mph</p>
        </div>
      </div>
    </Card>
  );
};

export default CurrentCard;
