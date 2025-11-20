import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import {
  Cloud,
  Gauge,
  Wind,
  Compass,
  Sunrise,
  Sunset,
  Droplets,
  SunMedium,
  ArrowUp,
} from "lucide-react";
import type { CoordsType } from "../../schemas/types";

const rows = [
  {
    label: "Cloudiness (%)",
    value: "clouds",
    icon: Cloud,
  },
  {
    label: "UVI Index",
    value: "uvi",
    icon: SunMedium,
  },
  {
    label: "Wind Direction",
    value: "wind_deg",
    icon: Compass,
  },
  {
    label: "Pressure (hPa)",
    value: "pressure",
    icon: Gauge,
  },
  {
    label: "Humidity (%)",
    value: "humidity",
    icon: Droplets,
  },
  {
    label: "Wind Speed (m/s)",
    value: "wind_speed",
    icon: Wind,
  },
  {
    label: "Sunrise",
    value: "sunrise",
    icon: Sunrise,
  },
  {
    label: "Sunset",
    value: "sunset",
    icon: Sunset,
  },
] as const;

export const Formatter = ({
  number,
  value,
}: {
  number: number;
  value: string;
}) => {
  if (value === "sunrise" || value === "sunset") {
    return (
      <span>
        {new Date(number * 1000).toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </span>
    );
  }

  if (value === "wind_deg") {
    return (
      <ArrowUp
        className="size-6 invet"
        style={{
          transform: `rotate(${number}deg)`,
        }}
      />
    );
  }

  return <span>{number}</span>;
};

type Props = {
  coords: CoordsType;
};

const AdditionalInfo = ({ coords }: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card
      title="Additional Weather Info"
      ChildrenclassName="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {rows.map((row) => {
        const Icon = row.icon;
        const value = data?.current[row.value];

        return (
          <div key={row.value} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-blue-400" />
              <span>{row.label}</span>
            </div>
            <Formatter value={row.value} number={value} />
          </div>
        );
      })}
    </Card>
  );
};

export default AdditionalInfo;
