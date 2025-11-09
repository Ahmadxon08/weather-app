import { z } from "zod";

// Common weather object (for current, hourly, daily)
const WeatherSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

// Current weather
const CurrentSchema = z.object({
  dt: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherSchema),
});

// Minutely
const MinutelySchema = z.object({
  dt: z.number(),
  precipitation: z.number(),
});

// Hourly weather
const HourlySchema = z.object({
  dt: z.number(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherSchema),
  pop: z.number().optional(),
});

// Daily temperature
const DailyTempSchema = z.object({
  day: z.number(),
  min: z.number(),
  max: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
});

// Daily feels_like
const DailyFeelsSchema = z.object({
  day: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
});

// Daily weather
const DailySchema = z.object({
  dt: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  moonrise: z.number(),
  moonset: z.number(),
  moon_phase: z.number(),
  summary: z.string().optional(),
  temp: DailyTempSchema,
  feels_like: DailyFeelsSchema,
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherSchema),
  clouds: z.number(),
  pop: z.number().optional(),
  rain: z.number().optional(),
  uvi: z.number(),
});

// Alerts
const AlertSchema = z.object({
  sender_name: z.string(),
  event: z.string(),
  start: z.number(),
  end: z.number(),
  description: z.string(),
  tags: z.array(z.string()),
});

// Full API response
export const WeatherApiResponseSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),
  current: CurrentSchema,
  minutely: z.array(MinutelySchema),
  hourly: z.array(HourlySchema),
  daily: z.array(DailySchema),
  alerts: z.array(AlertSchema).optional(),
});
