import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

const worldCities = [
  "Tashkent",
  "London",
  "Paris",
  "New York",
  "Tokyo",
  "Dubai",
  "Istanbul",
  "Moscow",
  "Berlin",
  "Rome",
  "Madrid",
];

const LocationDropDown = ({ location, setLocation }: Props) => {
  console.log("custom", location);
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select city" />
      </SelectTrigger>
      <SelectContent className="z-[10002]">
        {location === "custom" && (
          <SelectItem value="custom">Custom</SelectItem>
        )}
        {worldCities.map((city) => (
          <SelectItem value={city} key={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocationDropDown;
