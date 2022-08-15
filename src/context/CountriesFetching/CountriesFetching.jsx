import React, { createContext, useState, useEffect } from "react";

export const CountriesFetchingContext = createContext();

let initialData = [];

//  countries data
const COUNTRIES_URL = "https://disease.sh/v3/covid-19/countries";

//  cases data
const COUNTRIES_ALL_DATA = "https://disease.sh/v3/covid-19/all";

// historical data
const LINEGRAPH_DATA =
  "https://disease.sh/v3/covid-19/historical/all?lastdays=120";

export const CountriesFetchingContextProvider = ({ children }) => {
  // useState
  const [allCountries, setAllCountries] = useState(initialData);
  const [tableData, setTableData] = useState(initialData);
  const [countryInfo, setCountryInfo] = useState({});

  console.log("cInfo", countryInfo);
  console.log("allC", allCountries);

  /* const [lineGraph, setLineGraph] = useState({}); */

  // fetching all countries
  const countriesFetching = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  // fetching All the Countries data

  const allCountriesData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  // fetching All the line graph data

  /* const lineGraphData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }; */

  // useEffect to fetch countries && data
  useEffect(() => {
    countriesFetching(COUNTRIES_URL).then((data) => {
      setAllCountries(data);
      setTableData(data);
    });
    allCountriesData(COUNTRIES_ALL_DATA).then((data) => {
      setCountryInfo(data);
    });
    /* lineGraphData(LINEGRAPH_DATA).then((data) => {
      setLineGraph(data);
    }); */
  }, []);

  return (
    <CountriesFetchingContext.Provider
      value={{
        allCountries,
        setAllCountries,
        tableData,
        countryInfo,
        setCountryInfo,
        /* lineGraph, */
      }}
    >
      {children}
    </CountriesFetchingContext.Provider>
  );
};
