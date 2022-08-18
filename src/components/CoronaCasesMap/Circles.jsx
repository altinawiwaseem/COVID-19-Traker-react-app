import { Circle, Popup, Tooltip } from "react-leaflet";
import numeral from "numeral";
import { color } from "../LineGraph/LineGraph";

function Circles({ data, casesType }) {
  const circleData = (data, casesType) => {
    const result = data.map((country, i) => (
      <Circle
        key={i}
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={1}
        pathOptions={{
          color: color[casesType].backgroundColor,
          fillColor: color[casesType].backgroundColor,
        }}
        radius={Math.sqrt(country[casesType]) * color[casesType].multiplier}
      >
        <Popup>
          <div className="popup">
            <img
              className="img"
              src={country.countryInfo.flag}
              alt="Country's flag"
            />
            <div className="info">
              <strong>{country.country}</strong>{" "}
            </div>

            <div className="info">
              <strong>Corona Cases:</strong>{" "}
              {numeral(country.cases).format("0,0")}
            </div>
            <div className="info">
              <strong>Active Cases:</strong>
              {numeral(country.active).format("0,0")}
            </div>
            <div className="info">
              <strong>Today Cases:</strong>
              {numeral(country.todayCases).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    ));
    return result;
  };

  return <div>{circleData(data, casesType)}</div>;
}

export default Circles;
