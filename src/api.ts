import { airPollutionSchema } from "./schemas/airPollutionSchema";
import { GeocodeSchema } from "./schemas/GeocodeSchema";
import { WeatherSchema, type WeatherType } from "./schemas/WeatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;
export const getWeather = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<WeatherType> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`
  );

  const data = await res.json();

  if (data.cod && data.cod !== 200) {
    throw new Error(data.message || "API Error");
  }

  return WeatherSchema.parse(data);
};

export const getGeoCoding = async (location: string) => {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`
  );

  const data = await res.json();
  return GeocodeSchema.parse(data);
};
export const getAirPollution = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  const data = await res.json();
  return airPollutionSchema.parse(data);
};
