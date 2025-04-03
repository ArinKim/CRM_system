import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Customers", "2024", "2025"],
  ["A", 35200, 15000],
  ["B", 85333, 20000],
  ["C", 5422, 10000],
  ["D", 2500, 5000],
  ["E", 7800, 2000],
];
// Different options for non-material charts
export const options = {
  title: "Total Sales of each year",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Total Sales",
    minValue: 0,
  },
  vAxis: {
    title: "Customers",
  },
};

function MonthlySalesChart() {
  return (
    <div className="sales-container" style={{ width: "50%" }}>
      <h1 className="sales">Monthly Sales</h1>

      <div className="sales-description">
        <p>
          This chart shows the sales of customers. The chart is a pie chart that
          displays the sales of each customer.
        </p>
      </div>
      <Chart
        chartType="BarChart"
        data={data}
        options={options}
        width="auto"
        height="400px"
      />
    </div>
  );
}

export default MonthlySalesChart;
