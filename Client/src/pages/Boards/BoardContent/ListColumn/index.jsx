import { Box, Button, InputAdornment, TextField } from "@mui/material";

import { Close, NoteAdd } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

import Column from "../Column";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { toast } from "react-toastify";

function ListColumns({
  listCol,
  createNewColumn,
  createNewCard,
  deleteColumn,
}) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);

  const [newColumnTitle, setNewColumnTitle] = useState("");

  const addColumn = () => {
    if (!newColumnTitle) {
      toast.warning("Please enter title...");
    }

    const newColumnData = {
      title: newColumnTitle,
    };

    createNewColumn(newColumnData);

    setOpenNewColumnForm(false);
    setNewColumnTitle("");
  };

  return (
    <SortableContext
      items={listCol?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {listCol?.map((column, index) => (
          <Column
            key={index}
            column={column}
            deleteColumn={deleteColumn}
            createNewCard={createNewCard}
          />
        ))}
        {/* create column */}
        {!openNewColumnForm ? (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
            onClick={toggleOpenNewColumnForm}
          >
            <Button
              sx={{ color: "whitesmoke", width: "100%" }}
              startIcon={<NoteAdd />}
            >
              Add Column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              id="outlined-search"
              label="Enter Column Title"
              type="text"
              size="small"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Close
                      sx={{ cursor: "pointer" }}
                      //   onClick={() => setSearchValue("")}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& label.Mui-focused": { color: "white" },
                "& input": { color: "white" },
                "& label": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "white" },
                  "&:Mui-focused fieldset": { borderColor: "white" },
                },
              }}
            ></TextField>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                }}
                onClick={addColumn}
              >
                Add column
              </Button>
              <Button>
                <Close
                  fontSize="small"
                  sx={{
                    bgcolor: "red",
                    cursor: "pointer",
                    color: "white",
                    "&:hover": {
                      color: (theme) => theme.palette.warning.light,
                    },
                  }}
                  onClick={toggleOpenNewColumnForm}
                />
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
}

export default ListColumns;
