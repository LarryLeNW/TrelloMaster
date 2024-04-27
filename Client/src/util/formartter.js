export const generatePlaceholderCard = (col) => {
  return {
    _id: `${col._id}-placeholder-card`,
    boardId: col.boardId,
    columnId: col._id,
    FE_PlaceholderCard: true,
  };
};
