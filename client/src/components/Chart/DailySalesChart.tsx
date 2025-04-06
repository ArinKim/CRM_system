import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { DailySalesChartAPI } from "./DailySalesChartAPI";
import { Sales } from "../../models/sales/sales";

const data = [
  ["Customers", "AUD"],
  ["A", 1100],
  ["B", 2455],
  ["C", 200],
  ["D", 250],
  ["E", 700],
];

const options = {
  title: "Daily Sales",
  pieHole: 0.2, // Creates a Donut Chart. Does not do anything when is3D is enabled
  is3D: true, // Enables 3D view
  // slices: {
  //   1: { offset: 0.2 }, // Explodes the second slice
  // },
  pieStartAngle: 100, // Rotates the chart
  sliceVisibilityThreshold: 0.01, // Hides slices smaller than 2%
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "#233238",
      fontSize: 12,
    },
  },
  colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
};
// https://www.react-google-charts.com/examples/pie-chart

function DailySalesChart() {
  const [sales, setSales] = useState<Sales[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //   fetch("http://localhost:3300/api/sales/get-info/")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setSales(data);
  //     });
  // }, []);

  useEffect(() => {
    async function loadSales() {
      setLoading(true);
      try {
        const data = await DailySalesChartAPI.get();
        console.log(data);
        setError("");
        setSales(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadSales();
  }, []);

  return (
    <div className="sales-container" style={{ width: "50%", padding: "5px" }}>
      <h1 className="sales">Daily Sales</h1>

      <div className="sales-description">
        <p>
          This chart shows the sales of customers. The chart is a pie chart that
          displays the sales of each customer.
        </p>
      </div>
      <div>
        {sales?.map((item, index) => (
          <div key={index}>
            <p>{item.id}</p>
          </div>
        ))}
      </div>

      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width="auto"
        height="400px"
      />
    </div>
  );
}

export default DailySalesChart;
