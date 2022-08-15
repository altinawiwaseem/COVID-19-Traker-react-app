import { MapContainer, TileLayer, useMap } from "react-leaflet";

import "./CoronaCasesMap.css";

function CoronaCasesMap({ countries, casesType, mapCenter, mapZoom }) {
  // Function to change the center of the map according to the user's choice of country
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="map">
      <MapContainer center={mapCenter} zoom={mapZoom}>
        <ChangeView center={mapCenter} zoom={mapZoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
}

export default CoronaCasesMap;
