import { useState, useEffect, useContext } from "react";
import { CountriesFetchingContext } from "./context/CountriesFetching/CountriesFetching";
import "./App.css";
import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";

function App() {
  // Context
  const { countries, tableData, countryInfo, setCountryInfo } = useContext(
    CountriesFetchingContext
  );

  // State
  const [country, setCountry] = useState("All Countries");

  // onChange function for choosing the country to show its data
  const handleCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    const URL =
      countryCode === "All Countries"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const response = await fetch(URL);
    const data = await response.json();

    setCountryInfo(data);
  };

  return (
    <div className="App">
      <div className="left">
        {/* Header */}
        <div className="header">
          <h1>COVID-19 TRACKER</h1>
          <form>
            <select value={country} onChange={handleCountryChange}>
              <option value={"All Countries"}>All Countries</option>
              {countries.map((country, i) => (
                <option value={country.countryInfo.iso2} key={i}>
                  {country.country}
                </option>
              ))}
            </select>
          </form>
        </div>

        {/* InfoBoxes */}
        <div className="infoBoxes">
          <InfoBox
            title="Corona Virus Cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          <InfoBox
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <InfoBox
            title="Death"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>

        {/* Map */}
        <Map />
      </div>

      <div className="right">
        {/* table */}
        <div>
          <h3>Live Cases by Country</h3>
          <table countries={tableData} />

          <h3> Worldwide New Cases</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
