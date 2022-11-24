import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function EZ_DataGrid(props) {
  const { rows, columns } = props;
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        autoHeight
        onSelectionModelChange={(e) => {
          console.log(e);
        }}
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[5, 8, 10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
