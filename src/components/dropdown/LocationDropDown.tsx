import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onCityChange?: (city: string) => void;
};

const worldCities = [
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

const LocationDropDown = ({ onCityChange }: Props) => {
  return (
    <Select onValueChange={onCityChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select city" />
      </SelectTrigger>
      <SelectContent className="z-[10002]">
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
