import { useContext } from "react";
// importing the map from leaflet map
import {
  Marker,
  MapContainer,
  TileLayer,
  useMap,
  Tooltip,
  Circle,
  CircleMarker,
} from "react-leaflet";
import numeral from "numeral";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

//importing context
import { CountriesFetchingContext } from "../../context/CountriesFetching/CountriesFetching";
//styling the map
import "./CoronaCasesMap.css";
// import Color object from lineGraph component
import { color } from "../LineGraph/LineGraph";

function CoronaCasesMap({ casesType, mapCenter, mapZoom, country }) {
  const { allCountries, countryInfo } = useContext(CountriesFetchingContext);

  // Function to change the center of the map according to the user's choice of country

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  const circleData = (data, casesType = "cases") => {
    const result = data.map((country) => (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={color[casesType].backgroundColor}
        fillColor={color[casesType].backgroundColor}
        radius={Math.sqrt(country[casesType]) * color[casesType].multiplier}
      ></Circle>
    ));
    return result;
  };

  return (
    <div className="map">
      <MapContainer center={mapCenter} zoom={mapZoom}>
        <ChangeView center={mapCenter} zoom={mapZoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {circleData(allCountries, casesType)}

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
                  <div>
                    {data.country}
                    <img
                      className="img"
                      src={data.countryInfo.flag}
                      alt="Country's flag"
                    />
                  </div>

                  <div>
                    <strong>Corona Cases:</strong>{" "}
                    {numeral(data.cases).format("0,0")}
                  </div>
                  <div>
                    <strong>Active Cases:</strong>
                    {numeral(data.active).format("0,0")}
                  </div>
                  <div>
                    <strong>Today Cases:</strong>
                    {numeral(data.todayCases).format("0,0")}
                  </div>
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
                  {countryInfo.country}

                  <img
                    className="img "
                    src={
                      countryInfo.countryInfo && countryInfo.countryInfo.flag
                    }
                    alt="Country's flag"
                  />
                </i>
              </div>
              <div>
                <strong>Corona Cases:</strong>
                {numeral(countryInfo.cases).format("0,0")}
              </div>
              <div>
                <strong>Active Cases:</strong>
                {numeral(countryInfo.active).format("0,0")}
              </div>
              <div>
                <strong>Today Cases:</strong>
                {numeral(countryInfo.todayCases).format("0,0")}
              </div>
            </Tooltip>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default CoronaCasesMap;
