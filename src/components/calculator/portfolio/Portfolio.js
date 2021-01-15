import React from "react";

const portfolio = ({ level, table, labels }) => {
  return (
    <div>
      <h4>Risk Level {level}</h4>
      <table className="hover">
        <thead>
          <tr>
            {labels.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table
            .filter((tab) => tab.risk === level)
            .map((tab) => (
              <tr key={tab.risk}>
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

export default portfolio;
