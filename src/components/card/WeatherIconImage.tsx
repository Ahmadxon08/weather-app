import clsx from "clsx";

type WeatherIconImageProps = {
  src: string;
  className?: string;
};

const WeatherIconImage = ({ src, className }: WeatherIconImageProps) => {
  return (
    <img
      className={clsx("size-8", className)}
      src={`https://openweathermap.org/img/wn/${src}.png`}
      alt="weather icon"
    />
  );
};

export default WeatherIconImage;
