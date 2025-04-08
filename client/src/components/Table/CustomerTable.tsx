import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Customer } from "../../models/customer/customers";
import Button from "@mui/material/Button";
import { CustomerTableAPI } from "./CustomerTableAPI";

const MAX_ROW_LENGTH = 1000;

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
          <Button color="success">Active</Button>
        ) : (
          <Button color="error">Inactive</Button>
        )}
      </div>
    ),
  },
];

export default function ColumnSelectorGrid() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    async function loadCustomers() {
      setLoading(true);
      try {
        const data = await CustomerTableAPI.get();

        setError("");
        setCustomers(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  return (
    <div className="customer-table-container" style={{ width: "100%" }}>
      <h1 className="customer-order-table-header">Customer Table</h1>
      <div style={{ height: 350, width: "100%" }}>
        <DataGrid columns={columns} rows={customers} loading={loading} />
      </div>
    </div>
  );
}
