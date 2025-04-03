import React from "react";
import DailySalesChart from "../components/Chart/DailySalesChart";
import MonthlySalesChart from "../components/Chart/MonthlySalesChart";
import CustomerContractChart from "../components/Chart/CustomerContractChart";

export default function HomePage() {
  return (
    <div>
      <div className="chart-container row">
        <DailySalesChart />
        <MonthlySalesChart />
        <CustomerContractChart />
      </div>
    </div>
  );
}
