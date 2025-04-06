import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import Typography from "@mui/material/Typography";

export default function ColumnSelectorGrid() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 10,
  });

  return (
    <div style={{ width: "100%" }}>
      <h1 className="customer-order-table-header">Customer Order Table</h1>
      <DataGrid
        {...data}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
}
