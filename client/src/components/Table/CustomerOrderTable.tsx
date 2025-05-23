import * as React from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { table } from "console";

const UserType = {
  Regular: 0,
  Admin: 1,
};

export default function ColumnSelectorDisabledGrid() {
  const [userType, setUserType] = React.useState(UserType.Regular);
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 10,
    maxColumns: 7,
  });

  const columnVisibilityModel = React.useMemo(() => {
    if (userType === UserType.Admin) {
      return {
        quantity: true,
        filledQuantity: true,
        id: true,
      };
    }
    return {
      quantity: false,
      filledQuantity: false,
      id: false,
    };
  }, [userType]);

  return (
    <div className="customer-order-table-container" style={{ width: "100%" }}>
      <h1 className="customer-order-table-header">Customer Order Table</h1>
      <Stack>
        <FormControl sx={{ width: "200px", pb: 1 }}>
          <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select
            labelId="demo-user-type-label"
            id="demo-user-type"
            value={userType}
            label="User Type"
            onChange={(event: SelectChangeEvent<number>) => {
              setUserType(event.target.value as number);
            }}
          >
            <MenuItem value={UserType.Regular}>Regular User</MenuItem>
            <MenuItem value={UserType.Admin}>Admin</MenuItem>
          </Select>
        </FormControl>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            {...data}
            disableColumnSelector
            columnVisibilityModel={columnVisibilityModel}
            slots={{
              toolbar: GridToolbar,
            }}
          />
        </div>
      </Stack>
    </div>
  );
}
