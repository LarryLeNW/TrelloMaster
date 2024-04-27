import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import Card from "../Card";

function ListCard({ listCard }) {
  return (
    <SortableContext
      items={listCard?.map((c) => c?._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: "0 10px 5px 5px",
          m: "0 5px",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: (theme) =>
            `calc(${theme.custom.contentHeight} - ${theme.spacing(5)} - ${
              theme.custom.columnHeaderHeight
            } - ${theme.custom.columnFooterHeight})`,
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced0da",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfc2cf",
          },
        }}
      >
        {listCard?.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  );
}

export default ListCard;
