import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
type Props = {};

const MapClick = () => {
  const map = useMap();

  map.on("click", (e) => {
    console.log(e);
  });
  return null;
};

const Map = ({}: Props) => {
  return (
    <div className="flex justify-center w-full px-10">
      <MapContainer
        center={[10, 25]}
        zoom={5}
        style={{
          width: "100%",
          height: "500px",
        }}
      >
        <MapClick />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[10, 25]} />
      </MapContainer>
    </div>
  );
};

export default Map;
