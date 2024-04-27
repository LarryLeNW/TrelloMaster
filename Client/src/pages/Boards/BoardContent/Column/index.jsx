import { useState } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AddCard,
  Close,
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  DeleteForever,
  DragHandle,
  ExpandMoreOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ListCard from "../ListCard";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";

function Column({ column, createNewCard, deleteColumn }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  const styleDndKit = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    height: "100%",
  };
  //
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const orderedCards = column.cards;

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

  const [newCardTitle, setNewCardTitle] = useState("");

  const addCard = () => {
    if (!newCardTitle) {
      toast.warning("please enter title card", { position: "bottom-right" });
    }
    createNewCard({ title: newCardTitle, columnId: column._id });
    setOpenNewCardForm(false);
    setNewCardTitle("");
  };

  const confirmDelete = useConfirm();

  const handleDeleteColumn = () => {
    confirmDelete({
      title: "Delete this column",
      description:
        "This action is permanent delete this column and it's cards ! Are you sure",
      confirmationText: "Confirm!!!",
    })
      .then(() => {
        deleteColumn(column._id);
      })
      .catch(() => {
        /* ... */
      });
  };

  return (
    <div ref={setNodeRef} style={styleDndKit} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          minHeight: "300px",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.custom.contentHeight} - ${theme.spacing(5)})`,
        }}
      >
        {/* Header Card */}
        <Box
          sx={{
            height: (theme) => theme.custom.columnHeaderHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", cursor: "pointer" }}>
            {column?.title}
          </Typography>

          <Box>
            <Tooltip title="More Option">
              <ExpandMoreOutlined
                id="basic-column-dropdown"
                aria-controls={open ? "menu-column-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </Tooltip>

            <Menu
              id="menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
            >
              <MenuItem
                sx={{
                  "&:hover": {
                    color: "success.light",
                  },
                }}
                onClick={toggleOpenNewCardForm}
              >
                <ListItemIcon>
                  <AddCard fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add New Card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  "&:hover": {
                    color: "warning.dark",
                  },
                }}
                onClick={handleDeleteColumn}
              >
                <ListItemIcon>
                  <DeleteForever fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* body card */}
        <ListCard listCard={orderedCards} />
        {/* footer */}
        {!openNewCardForm ? (
          <Box
            sx={{
              height: (theme) => theme.custom.columnFooterHeight,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button startIcon={<AddCard />} onClick={toggleOpenNewCardForm}>
              Add New Card
            </Button>
            <Tooltip title="Drag to move ">
              <DragHandle sx={{ cursor: "pointer" }} />
            </Tooltip>
          </Box>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 2,
            }}
          >
            <TextField
              id="outlined-search"
              label="Enter Card Title"
              type="text"
              size="small"
              autoFocus
              data-no-dnd="true"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              sx={{
                "& label.Mui-focused": {
                  color: (theme) => theme.palette.primary.main,
                },
                "& input": {
                  color: (theme) => theme.palette.primary.main,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#333643" : "white",
                },
                "& label": { color: "text.primary" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                  "&:hover fieldset": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                  "&:Mui-focused fieldset": {
                    borderColor: (theme) => theme.palette.primary.main,
                  },
                },
                "& .MuiOutlinedInput-input": { borderRadius: 1 },
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
                onClick={addCard}
              >
                Add
              </Button>
              <Button>
                <Close
                  fontSize="small"
                  sx={{
                    "&:hover": {
                      color: (theme) => theme.palette.warning.light,
                    },
                    cursor: "pointer",
                  }}
                  onClick={toggleOpenNewCardForm}
                />
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default Column;
