import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { Customer } from "../../models/customer/customers";
import { CustomerInterface } from "../../models/customer/customer.interface";
import Button from "@mui/material/Button";

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
    status: false,
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

const keys = Customer.getKeyList();

const columns: GridColDef[] = [
  {
    field: keys[0],
    headerName: keys[0],
    width: 100,
    description:
      "The identification used by the person with access to the online service.",
  },
  {
    field: keys[1],
    headerName: keys[1],
    width: 150,
  },
  { field: keys[2], headerName: keys[2], width: 150 },
  { field: keys[3], headerName: keys[3], width: 150 },
  { field: keys[4], headerName: keys[4], width: 150 },
  {
    field: keys[5],
    headerName: keys[5],
    width: 150,
    renderCell: (params: GridRenderCellParams<any, Date>) => (
      <div className="button">
        {params.value ? (
          <Button variant="contained" color="success">
            Active
          </Button>
        ) : (
          <Button variant="contained" color="error">
            Inactive
          </Button>
        )}
      </div>
    ),
  },
];

export default function ColumnSelectorGrid() {
  return (
    <div style={{ height: 250, width: "100%" }}>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}
