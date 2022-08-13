import React, { createContext, useState, useEffect } from "react";

export const CountriesFetchingContext = createContext();

let initialData = [];

const COUNTRIES_URL = "https://disease.sh/v3/covid-19/countries";

const COUNTRIES_ALL_DATA = "https://disease.sh/v3/covid-19/all";

// fetching countries
const countriesFetching = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// fetching All the Countries data

const allCountriesData = async () => {
  const response = await fetch(COUNTRIES_ALL_DATA);
  const data = await response.json();
  return data;
};

export const CountriesFetchingContextProvider = ({ children }) => {
  // useState
  const [countries, setCountries] = useState(initialData);
  const [tableData, setTableData] = useState(initialData);
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    countriesFetching(COUNTRIES_URL).then((data) => {
      setCountries(data);
      setTableData(data);
    });
  }, []);

  // useEffect for the all countries data

  useEffect(() => {
    allCountriesData().then((data) => {
      setCountryInfo(data);
    });
  }, []);
  return (
    <CountriesFetchingContext.Provider
      value={{
        countries,
        setCountries,
        tableData,
        countryInfo,
        setCountryInfo,
      }}
    >
      {children}
    </CountriesFetchingContext.Provider>
  );
};
