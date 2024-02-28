import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  addTask,
  deleteTask,
  getAllTasksForUser,
  swapTask,
  updateTask,
} from "../utils/axiosRequests";
import { useQuery } from "react-query";
import { CheckBox } from "./CheckBox";

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: "",
    points: 0,
  },
];

interface EditToolbarProps {
  user: { id: string };
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  rows: GridRowModel;
  currentRowId: string;
}

function EditToolbar(props: EditToolbarProps) {
  const {
    user,
    setRows,
    setRowModesModel,
    currentRowId,
    rows,
    // swapTaskMutation,
  } = props;
  const handleUpArrowClick = async () => {
    //Guard clause
    if (currentRowId === undefined) return;
    const currentRowIndex = rows.findIndex(
      (row: GridRowModel) => row.id === currentRowId,
    );
    if (currentRowIndex === 0) return; // Literal edge case

    // Get the actual row
    const currentRow = rows.find(
      (row: GridRowModel) => row.id === currentRowId,
    );
    if (!currentRow) return;

    // Update server
    let data = await swapTask(currentRow, "up");

    // Update rows with new information
    setRows(data);
  };

  const handleDownArrowClick = async () => {
    if (currentRowId === undefined) return;
    const currentRowIndex = rows.findIndex(
      (row: GridRowModel) => row.id === currentRowId,
    );
    if (currentRowIndex === rows.length - 1) return; // Literal edge case
    // Get the actual row
    const currentRow = rows.find(
      (row: GridRowModel) => row.id === currentRowId,
    );
    if (!currentRow) return;

    // Update server
    let data = await swapTask(currentRow, "down");

    // Update rows with new information
    setRows(data);
  };

  const handleClick = async () => {
    const id = randomId();
    // Add a task and fetch from the server the new rows config
    const data = await addTask({
      id: id,
      name: "",
      points: 0,
      index: 0,
      userId: user.id,
    });

    setRows(data);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: {
        mode: GridRowModes.Edit,
        fieldToFocus: "name",
      },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add
      </Button>
      <Button
        color="primary"
        startIcon={<ArrowUpward />}
        onClick={handleUpArrowClick}
      >
        Up
      </Button>
      <Button
        color="primary"
        startIcon={<ArrowDownward />}
        onClick={handleDownArrowClick}
      >
        Down
      </Button>
    </GridToolbarContainer>
  );
}

type Props = {
  user: { userName: string; id: string };
  setUser: Dispatch<SetStateAction<Partial<User>>>;
};

type User = {
  userName: string;
  id: string;
  routinesRequired: null | number;
  pointsRequired: null | number;
  choresRequired: null | number;
  routinesChecked: null | number;
  pointsChecked: null | number;
  choresChecked: null | number;
};
export default function TasksTable(props: Props) {
  const { user, setUser } = props;
  const [rows, setRows] = useState(initialRows);
  const [currentRowId, setCurrentRowId] = useState();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { data, status, isLoading } = useQuery("tasks", () =>
    getAllTasksForUser(user.id),
  );
  console.log("from client:", rows);

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  // Reset the points because the cheeckbox components are going to populate the points
  // and we dont want them to compound
  useEffect(() => {
    setUser((prev) => ({ ...prev, pointsChecked: 0 }));
  }, []);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const row = rows.find((item) => item.id === id);
    if (row) deleteTask(row);
    setRows(rows.filter((row) => row.id !== id));
  };

  // const handleCancelClick = (id: GridRowId) => async () => {
  //   const currentRow = rows.find((row: GridRowModel) => row.id === id);
  //   if (!currentRow) return console.log("row not found");
  //   let data = await deleteTask(currentRow);
  //   setRows(data);
  //   setRowModesModel({
  //     ...rowModesModel,
  //     [id]: { mode: GridRowModes.View, ignoreModifications: true },
  //   });
  //
  //   const editedRow = rows.find((row) => row.id === id);
  //   if (editedRow!.isNew) {
  //     setRows(rows.filter((row) => row.id !== id));
  //   }
  // };

  function handleRowClick(params: { row: GridRowModel }) {
    const rowId = params.row.id;
    setCurrentRowId(rowId);
  }
  const processRowUpdate = (newRow: GridRowModel) => {
    // Couple of values we need to send the server about our new row
    newRow.userId = user.id;

    updateTask(newRow);
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Daily Task", width: 180, editable: true },
    {
      field: "points",
      headerName: "Pnts",
      type: "number",
      width: 60,
      align: "left",
      headerAlign: "left",
      editable: true,
      sortable: false,
    },
    {
      field: "actions",

      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <CheckBox
                  id={id}
                  pointValue={rows?.find((row) => row.id === id)?.points}
                  type={"task"}
                  setUser={setUser}
                />
              }
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={(event) => {
                event.stopPropagation();
                handleSaveClick(id);
              }}
            />,
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={(event) => {
                event.stopPropagation();
                handleSaveClick(id);
              }}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <CheckBox
                id={id}
                pointValue={rows?.find((row) => row.id === id)?.points}
                type={"task"}
                setUser={setUser}
              />
            }
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  if (status !== "loading") {
    return (
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .MuiDataGrid-footerContainer": {
            display: "none",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
          "& .MuiDataGrid-root": {
            height: 811,
          },
        }}
      >
        <DataGrid
          rows={rows}
          disableColumnMenu
          columns={columns}
          editMode="row"
          onRowClick={handleRowClick}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          sx={{
            "& .-thumb": {
              borderRadius: "1px",
            },
          }}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: {
              setRows,
              setCurrentRowId,
              setRowModesModel,
              currentRowId,
              rows,
              // swapTaskMutation,
              isLoading,
              user,
            },
          }}
        />
      </Box>
    );
  }
}
