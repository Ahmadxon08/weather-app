import type { ColorStop } from "@/schemas/types";

type Props = {
  mapType: string;
};
const mapTypeData: Record<
  string,
  { title: string; unit: string; stops: ColorStop[] }
> = {
  clouds_new: {
    title: "Cloudiness (%)",
    unit: "%",
    stops: [
      { value: 0, color: "rgba(255, 255, 255, 0)" },
      { value: 20, color: "rgba(200, 200, 255, 0.3)" },
      { value: 40, color: "rgba(170, 170, 255, 0.5)" },
      { value: 60, color: "rgba(140, 140, 255, 0.7)" },
      { value: 80, color: "rgba(110, 110, 255, 0.85)" },
      { value: 100, color: "rgba(80, 80, 255, 1)" },
    ],
  },

  precipitation_new: {
    title: "Rain (mm)",
    unit: "mm",
    stops: [
      { value: 0, color: "rgba(225, 200, 100, 0)" },
      { value: 0.1, color: "rgba(200, 150, 150, 0)" },
      { value: 0.2, color: "rgba(150, 150, 170, 0)" },
      { value: 0.5, color: "rgba(120, 120, 190, 0)" },
      { value: 1, color: "rgba(110, 110, 205, 0.3)" },
      { value: 10, color: "rgba(80, 80, 225, 0.7)" },
      { value: 140, color: "rgba(20, 20, 255, 0.9)" },
    ],
  },

  pressure_new: {
    title: "Pressure (hPa)",
    unit: "hPa",
    stops: [
      { value: 950, color: "rgba(255, 230, 200, 0.4)" },
      { value: 970, color: "rgba(255, 200, 150, 0.5)" },
      { value: 990, color: "rgba(255, 170, 120, 0.6)" },
      { value: 1010, color: "rgba(255, 140, 90, 0.75)" },
      { value: 1030, color: "rgba(255, 110, 70, 0.85)" },
      { value: 1050, color: "rgba(255, 80, 50, 1)" },
    ],
  },

  wind_new: {
    title: "Wind Speed (m/s)",
    unit: "m/s",
    stops: [
      { value: 0, color: "rgba(200, 255, 255, 0.3)" },
      { value: 5, color: "rgba(150, 230, 255, 0.5)" },
      { value: 10, color: "rgba(100, 200, 255, 0.7)" },
      { value: 20, color: "rgba(50, 150, 255, 0.85)" },
      { value: 30, color: "rgba(0, 120, 255, 1)" },
    ],
  },

  temp_new: {
    title: "Temperature (°C)",
    unit: "°C",
    stops: [
      { value: -30, color: "rgba(0, 0, 255, 1)" },
      { value: -10, color: "rgba(0, 120, 255, 1)" },
      { value: 0, color: "rgba(80, 180, 255, 1)" },
      { value: 10, color: "rgba(150, 240, 200, 1)" },
      { value: 20, color: "rgba(255, 230, 150, 1)" },
      { value: 30, color: "rgba(255, 150, 80, 1)" },
      { value: 40, color: "rgba(255, 60, 60, 1)" },
    ],
  },
};

function MapLegand({ mapType }: Props) {
  const data = mapTypeData[mapType];

  if (!data) {
    return (
      <div className="absolute top-4 right-4 z-1000 w-48">Invalid map type</div>
    );
  }

  const maxValue = data.stops[data.stops.length - 1].value;

  const gradientStop = data.stops
    .map((stop) => `${stop.color} ${(stop.value / maxValue) * 100}%`)
    .join(",");
  return (
    <div className="absolute top-4   right-4 z-1000 w-96 rounded-xl shadow-lg p-2 bg-background/50 border border-accent/70">
      <h3 className="text-sm font-semibold text-foreground">{data.title}</h3>
      <div
        className="w-full my-2 h-6 rounded-xl border border-accent/70"
        style={{
          background: `linear-gradient(to right, ${gradientStop})`,
        }}
      />

      <div className="flex justify-between items-center">
        <span>
          {data.stops[0].value} {data.unit}
        </span>
        <span>
          {data.stops[data.stops.length - 1].value} {data.unit}
        </span>
      </div>
    </div>
  );
}

export default MapLegand;
