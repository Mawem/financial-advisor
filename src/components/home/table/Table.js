import React from "react";
import PropTypes from "prop-types";

const Table = ({ labels, table, level }) => {
  return (
    <div>
      <table className="hover">
        <thead>
          <tr>
            <th key="risk">Risk</th>
            {labels.map((label) => (
              <th key={label}>{label} %</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.map((tab) => (
            <tr
              key={tab.risk}
              className={`${level === tab.risk ? "color" : ""}`}
            >
              <td>{tab["risk"]}</td>
              <td>{tab["Bonds"]}</td>
              <td>{tab["Large Cap"]}</td>
              <td>{tab["Mid Cap"]}</td>
              <td>{tab["Foreign"]}</td>
              <td>{tab["Small Cap"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
Table.propTypes = {
  table: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
};
export default Table;
