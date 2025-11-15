import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { CoordsType } from "../../schemas/types";
const API_KEY = import.meta.env.VITE_API_KEY;

type Props = {
  coords: CoordsType;
  handleClickMap: (lat: number, lon: number) => void;
  mapType: string;
};
const MapClick = ({ handleClickMap, coords }: Omit<Props, "mapType">) => {
  const map = useMap();

  map.panTo([coords.lat, coords.lon]);
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;

    console.log(e);

    handleClickMap(lat, lng);
  });
  return null;
};

const Map = ({ coords, handleClickMap, mapType }: Props) => {
  const { lat, lon } = coords;
  return (
    <div className="flex justify-center w-full px-10">
      <MapContainer
        center={[lat, lon]}
        zoom={5}
        style={{
          width: "100%",
          height: "500px",
        }}
      >
        <MapClick handleClickMap={handleClickMap} coords={coords} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer
          url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
        />
        <Marker position={[lat, lon]} />
      </MapContainer>
    </div>
  );
};

export default Map;
