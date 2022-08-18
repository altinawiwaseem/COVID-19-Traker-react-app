// Components
import LineGraph from "./components/LineGraph/LineGraph";
import InfoBox from "./components/InfoBox/InfoBox";
import CoronaCasesMap from "./components/CoronaCasesMap/CoronaCasesMap";
import Table from "./components/Table/Table";
import DateAndTime from "./components/DateAndTime/DateAndTime";
// React Hooks
import { useState, useContext } from "react";
// Context
import { CountriesFetchingContext } from "./context/CountriesFetching/CountriesFetching";
// React Icons
import { BiSortAlt2 } from "react-icons/bi";
import { BsSun, BsFillMoonStarsFill } from "react-icons/bs";
// Styling Css
import "./App.css";

import "leaflet/dist/leaflet.css";

function App() {
  // Context
  const { allCountries, countryInfo, setCountryInfo } = useContext(
    CountriesFetchingContext
  );

  // State
  const [theme, setTheme] = useState(false);
  const [country, setCountry] = useState("All Countries");
  const [sortCases, setSortCases] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 54.526, lng: 15.2551 });
  const [mapZoom, setMapZoom] = useState(2);
  const [casesType, setCasesType] = useState("cases");

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
  const themeClassName = theme ? "" : "dark";
  return (
    <div className={`App ${themeClassName}`}>
      {/* Header */}

      <div className="header">
        <h1>COVID-19 TRACKER</h1>
        <div
          onClick={() => {
            setTheme(!theme);
          }}
        >
          {theme ? <BsFillMoonStarsFill /> : <BsSun />}
        </div>

        <form>
          <select
            className={themeClassName}
            value={country}
            onChange={handleCountryChange}
          >
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
      <div className={`infoBoxes ${themeClassName}`}>
        <InfoBox
          active={casesType === "cases"}
          onClick={(e) => setCasesType("cases")}
          theme={themeClassName}
          title="Cases"
          total={countryInfo.cases}
          cases={countryInfo.todayCases}
        />
        <InfoBox
          active={casesType === "recovered"}
          onClick={(e) => setCasesType("recovered")}
          theme={themeClassName}
          title="Recovered"
          total={countryInfo.recovered}
          cases={countryInfo.todayRecovered}
        />
        <InfoBox
          active={casesType === "deaths"}
          onClick={(e) => setCasesType("deaths")}
          theme={themeClassName}
          title="Death"
          total={countryInfo.deaths}
          cases={countryInfo.todayDeaths}
        />
      </div>
      <div className={`body ${themeClassName}`}>
        <div className={`left ${themeClassName}`}>
          {/* table */}

          <DateAndTime />

          <div className={`tables ${themeClassName}`}>
            <div className="liveCasesHeader">
              <h3>Live Cases by Country</h3>
              <BiSortAlt2 className="icon" onClick={handleSortChange} />
            </div>

            <Table
              theme={themeClassName}
              sortCases={sortCases}
              country={country}
              casesType={casesType}
              setCountry={setCountry}
              setMapCenter={setMapCenter}
            />
          </div>
        </div>
        {/* Map */}
        <div className={`middle ${themeClassName}`}>
          <CoronaCasesMap
            casesType={casesType}
            className={themeClassName}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            allCountries={allCountries}
            country={country}
          />
        </div>

        <div className={`right ${themeClassName}`}>
          {/* LineGraph */}

          <h3> Worldwide New Cases</h3>
          <LineGraph className="chart" casesType={"cases"} />

          <h3> Worldwide Deaths</h3>

          <LineGraph
            className={`chart ${themeClassName}`}
            casesType={"deaths"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
