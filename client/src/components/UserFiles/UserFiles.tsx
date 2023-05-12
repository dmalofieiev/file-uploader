import React, { useEffect, useState } from "react";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../redux/Thunk/type";
import { getFiles } from "../../redux/Thunk/getFiles";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { delFileFromBack } from "../../redux/Thunk/delFileFromBack";
import EditForm from "../EditForm/EditForm";
import { openEditFormModal } from "../../redux/slicers/EditForm.slicer";
import { downloadedFile } from "../../redux/Thunk/downloadFile";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";

export default function UserFiles() {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedRows, setSelectedRows] = useState<any[]>([]); //* стейт, в который добавляются объекты выбранных строк (для группового удаления)

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
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            color="primary"
            onClick={() => {
              setSelectedFile(params.row);
              dispatch(openEditFormModal());
            }}
            sx={{ justifyContent: "center" }}
          >
            <ModeOutlinedIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => {
              deleteHandler(params);
            }}
            sx={{ justifyContent: "center" }}
          >
            <DeleteForeverOutlinedIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton
            size="small"
            color="success"
            onClick={() => {
              downloadHandler(params);
            }}
            sx={{ justifyContent: "center" }}
          >
            <CloudDownloadOutlinedIcon style={{ fontSize: 20 }} />
          </IconButton>
        </>
      ),
    },
  ];

  const deleteHandler = (params: any) => {
    dispatch(delFileFromBack(params.row.id));
  };
  const downloadHandler = (params: any) => {
    dispatch(downloadedFile(params.row.id, params.row.title));
  };

  const handleRowSelection = (selectedRows: any[]) => {
    //* хэндлер для обновления состояния выбранных строк (объектов)
    setSelectedRows(selectedRows); // Обновляем состояние выбранных строк при изменении чекбоксов
    console.log(selectedRows);
  };

  const deleteSelectedHandler = () => {
    // Обработчик для удаления выбранных строк
    selectedRows.forEach((id: number) => {
      dispatch(delFileFromBack(id));
    });
    setSelectedRows([]); // Сброс выбранных строк после удаления
  };

  const rows = files.map((el, i) => ({
    ...el,
    file_size: `${(Number(el.file_size) / 1024).toFixed(1)} kB`,
    createdAt: new Date(el.createdAt).toLocaleString("ru-RU"),
  }));

  useEffect(() => {
    dispatch(getFiles());
  }, []);

  return (
    <>
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
            onRowSelectionModelChange={handleRowSelection} // Обработчик изменений выбранных строк
            rowSelectionModel={selectedRows} // Передаем выбранные строки из состояния
          />
          {selectedRows.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={deleteSelectedHandler}
            >
              Delete Selected
            </Button>
          )}
        </Box>
      </div>
      <EditForm selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
    </>
  );
}
