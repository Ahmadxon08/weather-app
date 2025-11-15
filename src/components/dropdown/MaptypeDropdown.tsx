import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
};

const types = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
];

const MapTypeDropDown = ({ mapType, setMapType }: Props) => {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select city" />
      </SelectTrigger>
      <SelectContent className="z-[10001]">
        {types.map((city) => (
          <SelectItem value={city} key={city} className="capitalize">
            {city.split("_")[0]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MapTypeDropDown;
