// Components
/* import LineGraph from "./components/LineGraph/LineGraph"; */
import InfoBox from "./components/InfoBox/InfoBox";
import CoronaCasesMap from "./components/CoronaCasesMap/CoronaCasesMap";
import Table from "./components/Table/Table";
// React Hooks
import { useState, useContext } from "react";
// Context
import { CountriesFetchingContext } from "./context/CountriesFetching/CountriesFetching";
// React Icons
import { BiSortAlt2 } from "react-icons/bi";
// Styling Css
import "./App.css";
/* import LineGraph from "./components/LineGraph/LineGraph"; */
import "leaflet/dist/leaflet.css";

function App() {
  // Context
  const { allCountries, countryInfo, setCountryInfo } = useContext(
    CountriesFetchingContext
  );

  // State
  const [country, setCountry] = useState("All Countries");
  const [sortCases, setSortCases] = useState(true);

  const [mapCenter, setMapCenter] = useState({ lat: 54.526, lng: 15.2551 });
  const [mapZoom, setMapZoom] = useState(2);

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
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(5);
  };

  // handle sort change

  const handleSortChange = () => {
    setSortCases(!sortCases);
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
              {allCountries.map((country, i) => (
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
        <CoronaCasesMap
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          allCountries={allCountries}
          country={country}
        />
      </div>

      <div className="right">
        {/* table */}
        <div>
          <div className="liveCasesHeader">
            <h3>Live Cases by Country</h3>
            <BiSortAlt2 className="icon" onClick={handleSortChange} />
          </div>

          <Table sortCases={sortCases} />
        </div>
        <h3> Worldwide New Cases</h3>
        {/* <LineGraph /> */}
        {/*  <LineGraph /> */}
      </div>
    </div>
  );
}

export default App;
