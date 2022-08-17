import numeral from "numeral";
import { useContext } from "react";
import { CountriesFetchingContext } from "../../context/CountriesFetching/CountriesFetching";
import "./Table.css";

function Table({ sortCases, setCountry, country }) {
  const { tableData, countryInfo, setCountryInfo } = useContext(
    CountriesFetchingContext
  );
  const sortedData = [...tableData].sort((a, b) =>
    a.cases > b.cases ? -1 : 1
  );
  const sortCountriesData = sortCases
    ? sortedData
    : sortedData.sort().reverse();

  const handelChoose = (e) => {
    const choice = e.target.getAttribute("data-attr");
    setCountry(choice);
    setCountryInfo(country);
  };

  return (
    <div className="table">
      {sortCountriesData.map(({ country, cases }, i) => (
        <table key={i}>
          <tbody>
            <tr onClick={handelChoose} data-attr={country}>
              <td> {country} </td>
              <td>
                <strong>{numeral(cases).format(0, 0)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default Table;
