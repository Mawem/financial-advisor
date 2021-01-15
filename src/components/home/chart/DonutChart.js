import React from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";

const DonutChart = ({ table, level, labels }) => {
  const dataChart =
    level === null
      ? [
          ["Risk", "Level"],
          ["Select risk level", 100],
        ]
      : table
          .filter((tab) => tab.risk === level)
          .map((tab) => {
            let chartArr = [
              ["Risk", "Level"],
              ...labels.map((label) => [label, tab[label]]),
            ];
            return chartArr;
          })[0];
  return (
    <div className="small-10 small-centered">
      <Chart
        width={"800px"}
        height={"600px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={dataChart}
        options={{
          title: "Investment portfolio",
          legend: "none",
          pieSliceText: "label",
          pieHole: 0.4,
        }}
        rootProps={{ "data-testid": "3" }}
      />
    </div>
  );
};
DonutChart.propTypes = {
  table: PropTypes.array.isRequired,
};
export default DonutChart;
