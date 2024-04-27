import { AttachFile, Group, ModeComment } from "@mui/icons-material";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Card as MuiCard,
  Typography,
} from "@mui/material";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Card({ card }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { ...card } });

  const styleDndKit = {
    // touchAction: "none", // dành cho sensor default dạng pointerSensor
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };
  return (
    <MuiCard
      ref={setNodeRef}
      style={styleDndKit}
      {...attributes}
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: card?.FE_PlaceholderCard ? "hidden" : "unset",
        height: card?.FE_PlaceholderCard ? "0px" : "unset",
        border: "1px solid transparent",
        "&:hover": { borderColor: (theme) => theme.palette.primary.main },
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}

      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      <CardActions sx={{ p: "0 4px 8px 4px" }}>
        <Button size="small" startIcon={<Group />}>
          {!!card?.memberIds ? card?.memberIds.length : "0"}
        </Button>
        <Button size="small" startIcon={<ModeComment />}>
          {!!card?.comments ? card?.comments.length : "0"}
        </Button>
        <Button size="small" startIcon={<AttachFile />}>
          {!!card?.attachments ? card?.attachments.length : "0"}
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
