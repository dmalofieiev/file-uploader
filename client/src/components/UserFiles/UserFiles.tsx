import React, { useEffect } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../redux/Thunk/type";
import { getFiles } from "../../redux/Thunk/getFiles";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function UserFiles() {
  const dispatch = useAppDispatch();
  const files = useAppSelector(
    (state: RootState) => state.userFilesSlicer.files
  );
  const loading = useAppSelector(
    (state: RootState) => state.userFilesSlicer.loading
  );

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "file_size", headerName: "Size", width: 120 },
    { field: "createdAt", headerName: "Created Time", width: 155 },
  ];

  console.log(files);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const rows = files.map((el) => ({
    ...el,
    file_size: `${(Number(el.file_size) / 1024).toFixed(1)} kB`,
    createdAt: new Date(el.createdAt).toLocaleString('ru-RU')
  }));
  
  
    

  useEffect(() => {
    dispatch(getFiles());
  }, []);

  return (
    <div>
      <Box sx={{ height: 400, width: 1000 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
