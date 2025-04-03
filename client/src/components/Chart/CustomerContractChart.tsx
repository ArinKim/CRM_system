import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    { type: "string", id: "Term" },
    { type: "string", id: "Name" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
  ["1", "George", new Date(2024, 3, 30), new Date(2024, 6, 4)],
  ["2", "John", new Date(2024, 2, 4), new Date(2025, 2, 4)],
  ["3", "Thomas", new Date(2024, 11, 4), new Date(2025, 5, 4)],
];

// https://www.react-google-charts.com/examples/timeline
function CustomerContractChart() {
  return (
    <div className="schedule-container" style={{ width: "100%" }}>
      <h1 className="schedule">Customer Schedule</h1>

      <div className="schedule-description">
        <p>
          This chart shows the schedule of customers. The chart is a timeline
          that displays the start and end dates of each customer's schedule.
        </p>
      </div>
      <div
        className="container"
        style={{ backgroundColor: "rgb(255 255 255)", alignItems: "center" }}
      >
        <Chart chartType="Timeline" data={data} width="auto" />
      </div>
    </div>
  );
}

export default CustomerContractChart;
