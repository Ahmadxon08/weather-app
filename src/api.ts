import { WeatherApiResponseSchema } from "./schemas/WeatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;
export const getWeather = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  const data = await res.json();
  return WeatherApiResponseSchema.parse(data);
};
