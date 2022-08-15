import { useContext } from "react";
import { CountriesFetchingContext } from "../../context/CountriesFetching/CountriesFetching";
import "./Table.css";

function Table({ sortCases }) {
  const { tableData } = useContext(CountriesFetchingContext);
  const sortedData = [...tableData].sort((a, b) =>
    a.cases > b.cases ? -1 : 1
  );
  const sortCountriesData = sortCases
    ? sortedData
    : sortedData.sort().reverse();

  return (
    <div className="table">
      {sortCountriesData.map(({ country, cases }, i) => (
        <table key={i}>
          <tbody>
            <tr>
              <td> {country} </td>
              <td>
                <strong>{cases}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

export default Table;
