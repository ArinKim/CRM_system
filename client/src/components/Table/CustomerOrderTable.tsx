import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const rows = [
  {
    id: 1,
    company: "Company A",
    service: "Service A",
    email: "compa@test.com",
    phone: "0412345678",
    status: true,
  },
  {
    id: 2,
    company: "Company B",
    service: "Service B",
    email: "compb@test.com",
    phone: "0412345678",
    status: true,
  },
  {
    id: 3,
    company: "Company C",
    service: "Service C",
    email: "compc@test.com",
    phone: "0412345678",
    status: true,
  },
  {
    id: 4,
    company: "Company D",
    service: "Service D",
    email: "compd@test.com",
    phone: "0412345678",
    status: true,
  },
  {
    id: 5,
    company: "Company E",
    service: "Service E",
    email: "compe@test.com",
    phone: "0412345678",
    status: true,
  },
];

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    description:
      "The identification used by the person with access to the online service.",
  },
  { field: "company", headerName: "company", width: 150 },
  { field: "service", headerName: "service", width: 150 },
  { field: "email", headerName: "email", width: 150 },
  { field: "phone", headerName: "phone", width: 150 },
  { field: "status", headerName: "status", width: 150 },
];

export default function ColumnSelectorGrid() {
  // const { data } = useDemoData({
  //   dataSet: "Commodity",
  //   rowLength: 10,
  //   maxColumns: 10,
  // });

  // return (
  //   <div style={{ width: "100%" }}>
  //     <h1 className="customer-order-table-header">Customer Order Table</h1>
  //     <DataGrid
  //       {...data}
  //       slots={{
  //         toolbar: GridToolbar,
  //       }}
  //     />
  //   </div>
  // );
  return (
    <div style={{ height: 250, width: "100%" }}>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}
