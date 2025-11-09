import { WeatherSchema, type WeatherType } from "./schemas/WeatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export const getWeather = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<WeatherType> => {
  // One Call 3.0 endpoint
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`
  );

  const data = await res.json();

  // API xatolarini tekshirish
  if (data.cod && data.cod !== 200) {
    throw new Error(data.message || "API Error");
  }

  // Zod orqali validatsiya
  return WeatherSchema.parse(data);
};
