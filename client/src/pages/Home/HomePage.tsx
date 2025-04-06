import "./HomePage.css";
import React from "react";
import DailySalesChart from "../../components/Chart/DailySalesChart";
import MonthlySalesChart from "../../components/Chart/MonthlySalesChart";
import CustomerContractChart from "../../components/Chart/CustomerContractChart";
import ColumnSelectorDisabledGrid from "../../components/Table/UserTable";
import ColumnSelectorGrid from "../../components/Table/CustomerOrderTable";

export default function HomePage() {
  return (
    <div className="chart-container">
      <div className="sales-chart-container">
        <DailySalesChart />
        <MonthlySalesChart />
      </div>
      <div className="contract-container">
        <ColumnSelectorGrid />
        <ColumnSelectorDisabledGrid />
        <CustomerContractChart />
      </div>
    </div>
  );
}
