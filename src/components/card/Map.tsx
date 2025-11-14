import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { CoordsType } from "../../schemas/types";

type Props = {
  coords: CoordsType;
  handleClickMap: (lat: number, lon: number) => void;
};
const MapClick = ({ handleClickMap }: Omit<Props, "coords">) => {
  const map = useMap();

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    map.panTo([lat, lng]);

    console.log(e);

    handleClickMap(lat, lng);
  });
  return null;
};

const Map = ({ coords, handleClickMap }: Props) => {
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
        <MapClick handleClickMap={handleClickMap} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]} />
      </MapContainer>
    </div>
  );
};

export default Map;
