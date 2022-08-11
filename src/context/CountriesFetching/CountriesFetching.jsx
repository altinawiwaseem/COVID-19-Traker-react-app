import React,{createContext, useState, useEffect} from 'react'


export const CountriesFetchingContext = createContext();

let initialData = []

const URL = "https://disease.sh/v3/covid-19/countries";

const countriesFetching = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

countriesFetching()
export const CountriesFetchingContextProvider = ({ children }) => {
    const [countries, setCountries] = useState(initialData)


 useEffect(() => {
    countriesFetching(URL).then((data) => setCountries(data));

  }, []);
  return (
    <CountriesFetchingContext.Provider value={{ countries, setCountries }}>
      {children}
    </CountriesFetchingContext.Provider>
  );
};








