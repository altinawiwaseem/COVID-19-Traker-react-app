import { Circle, Popup, Tooltip } from "react-leaflet";
import numeral from "numeral";
import { color } from "../LineGraph/LineGraph";

function Circles({ data, casesType = "cases" }) {
  const circleData = (data, casesType = "cases") => {
    const result = data.map((country) => (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={1}
        color={color[casesType].backgroundColor}
        fillColor={color[casesType].backgroundColor}
        radius={Math.sqrt(country[casesType]) * color[casesType].multiplier}
      >
        <Popup>
          <div className="popup">
            <img
              className="img"
              src={country.countryInfo.flag}
              alt="Country's flag"
            />
            <div>{country.country}</div>

            <div>
              <strong>Corona Cases:</strong>{" "}
              {numeral(country.cases).format("0,0")}
            </div>
            <div>
              <strong>Active Cases:</strong>
              {numeral(country.active).format("0,0")}
            </div>
            <div>
              <strong>Today Cases:</strong>
              {numeral(country.todayCases).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    ));
    return result;
  };

  return <div>{circleData(data, (casesType = "cases"))}</div>;
}

export default Circles;
