import { useState, useEffect, useContext } from "react";
import { CountriesFetchingContext } from "./context/CountriesFetching/CountriesFetching";
import "./App.css";

function App() {
  const { countries, setCountries } = useContext(CountriesFetchingContext);

  console.log("countries", countries);
  return (
    <div className="App">
      <div className="header">
        <h1>COVID-19 TRACKER</h1>
        <from>
          <select>
            {countries.map((country, i) => (
              <option key={i}>{country.country}</option>
            ))}
          </select>
        </from>
      </div>
      {/* Header */}

      {/* dropdown field */}

      {/* InfoBoxs */}

      {/* table */}
      {/* Graphic */}

      {/* Map */}
    </div>
  );
}

export default App;
