import { useContext } from "react";
// importing the map from leaflet map
import {
  Marker,
  MapContainer,
  TileLayer,
  useMap,
  Tooltip,
} from "react-leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

//importing context
import { CountriesFetchingContext } from "../../context/CountriesFetching/CountriesFetching";
//styling the map
import "./CoronaCasesMap.css";

function CoronaCasesMap({ countries, casesType, mapCenter, mapZoom, country }) {
  const { allCountries, countryInfo } = useContext(CountriesFetchingContext);

  console.log("countryInfo", countryInfo);

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

        {country === "All Countries" ? (
          allCountries.map((data, i) => (
            <Marker
              key={i}
              position={[data.countryInfo.lat, data.countryInfo.long]}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [15, 25],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Tooltip>
                <div>
                  <i>
                    {data.country}{" "}
                    <img
                      className="img"
                      src={data.countryInfo.flag}
                      alt="Country's flag"
                    />
                  </i>
                </div>
                <div>
                  <strong>Corona Cases:</strong> {data.cases}
                </div>
                <div>
                  <strong>Active Cases:</strong> {data.active}
                </div>
                <div>
                  <strong>Today Cases:</strong> {data.todayCases}
                </div>
              </Tooltip>
            </Marker>
          ))
        ) : (
          <Marker
            position={mapCenter}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            <Tooltip>
              <div>
                <i>
                  {countryInfo.country}{" "}
                  <img
                    className="img"
                    src={
                      countryInfo.countryInfo && countryInfo.countryInfo.flag
                    }
                    alt="Country's flag"
                  />
                </i>
              </div>
              <div>
                <strong>Corona Cases:</strong> {countryInfo.cases}
              </div>
              <div>
                <strong>Active Cases:</strong> {countryInfo.active}
              </div>
              <div>
                <strong>Today Cases:</strong> {countryInfo.todayCases}
              </div>
            </Tooltip>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default CoronaCasesMap;
