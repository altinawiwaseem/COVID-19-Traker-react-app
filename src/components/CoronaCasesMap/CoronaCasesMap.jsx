import { useContext } from "react";
// importing the map from leaflet map
import { Marker, MapContainer, TileLayer, useMap } from "react-leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

//importing context
import { CountriesFetchingContext } from "../../context/CountriesFetching/CountriesFetching";
//styling the map
import "./CoronaCasesMap.css";
// import circle component
import Circles from "./Circles";

function CoronaCasesMap({ casesType, mapCenter, mapZoom, country }) {
  const { allCountries } = useContext(CountriesFetchingContext);

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

        <Circles data={allCountries} casesType={casesType} />

        {country !== "All Countries" && (
          <Marker
            position={mapCenter}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          ></Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default CoronaCasesMap;
