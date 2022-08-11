import { useState, useEffect, useContext } from "react";
import { CountriesFetchingContext } from "./context/CountriesFetching/CountriesFetching";
import "./App.css";
import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";

function App() {
  const { countries } = useContext(CountriesFetchingContext);
  const [country, setCountry] = useState("All Countries");

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    console.log(countryCode);
    setCountry(countryCode);
  };

  return (
    <div className="App">
      <div className="left">
        {/* Header */}
        <div className="header">
          <h1>COVID-19 TRACKER</h1>
          <form>
            <select value={country} onChange={handleCountryChange}>
              <option value={"all-countries"}>{country}</option>
              {countries.map((country, i) => (
                <option value={country.countryInfo.iso2} key={i}>
                  {country.country}
                </option>
              ))}
            </select>
          </form>
        </div>

        {/* InfoBoxs */}
        <div className="infoBoxes">
          <InfoBox title="Corona Virus Cases" total={2000} cases={555} />
          <InfoBox title="Recovered" total={20} cases={55445} />
          <InfoBox title="Death" total={200220} cases={65} />
        </div>

        {/* Map */}
        <Map />
      </div>

      <div className="right">
        {/* table */}
        <div>
          <h3>Live Cases by Country</h3>
        </div>
        {/* Graph */}
        <div>
          <h3> Worldwide New Cases</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
