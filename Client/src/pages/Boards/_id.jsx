import { Box, CircularProgress, Container, Typography } from "@mui/material";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent";
import { useEffect, useState } from "react";
import {
    createNewCardAPI,
    createNewColumnAPI,
    moveCardToDifferentAPI,
    fetchBoardDetail,
    updateBoardDetail,
    updateColumnDetail,
    deleteColumnDetail,
} from "src/Services/index";
import { isEmpty } from "lodash";
import { generatePlaceholderCard } from "src/util/formartter";
import { mapOrder } from "src/util/sorts";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
function BoardDetail() {
    const [board, setBoard] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchBoardDetail(id).then((board) => {
                board.columns = mapOrder(
                    board.columns,
                    board.columnOrderIds,
                    "_id"
                );
                board.columns.forEach((col) => {
                    if (isEmpty(col.cards)) {
                        col.cards = [generatePlaceholderCard(col)];
                        col.cardOrderIds = [generatePlaceholderCard(col)._id];
                    } else
                        col.cards = mapOrder(
                            col.cards,
                            col.cardOrderIds,
                            "_id"
                        );
                });
                setBoard(board);
            });
        }
    }, [id]);

    const createNewColumn = async (data) => {
        const newCol = await createNewColumnAPI({
            ...data,
            boardId: board._id,
        });
        newCol.cards = [generatePlaceholderCard(newCol)];
        newCol.cardOrderIds = [generatePlaceholderCard(newCol)._id];

        const updateBoard = { ...board };
        updateBoard.columns.push(newCol);
        updateBoard.columnOrderIds.push(newCol._id);

        setBoard(updateBoard);
    };

    const createNewCard = async (data) => {
        const newCard = await createNewCardAPI({
            ...data,
            boardId: board._id,
        });

        const updateBoard = { ...board };
        const columnUpdate = updateBoard.columns.find(
            (column) => column._id === newCard.columnId
        );

        if (columnUpdate) {
            if (columnUpdate.cards.some((card) => card.FE_PlaceholderCard)) {
                columnUpdate.cards = [newCard];
                columnUpdate.cardOrderIds = [newCard._id];
            } else {
                columnUpdate.cards.push(newCard);
                columnUpdate.cardOrderIds.push(newCard._id);
            }
        }
        setBoard(updateBoard);
    };

    const moveColumn = (orderedCol) => {
        const dndOrderedColumnIds = orderedCol.map((c) => c._id);
        const newBoard = { ...board };
        newBoard.columns = orderedCol;
        newBoard.columnOrderIds = dndOrderedColumnIds;
        setBoard(newBoard);

        updateBoardDetail(newBoard._id, {
            columnOrderIds: dndOrderedColumnIds,
        });
    };

    const moveCardInTheSameColumn = (orderedCard, orderedCardIds, columnId) => {
        const updateBoard = { ...board };
        const columnUpdate = updateBoard.columns.find(
            (column) => column._id === columnId
        );
        if (columnUpdate) {
            columnUpdate.cards = orderedCard;
            columnUpdate.cardOrderIds = orderedCardIds;
        }
        setBoard(updateBoard);
        updateColumnDetail(columnId, { cardOrderIds: orderedCardIds });
    };

    // khi di chuyển card sang column khác
    // B1 : Xóa id card ra khỏi mảng cardOderIds của column active
    // B1 : thêm id card focus oderOderIds của column over
    // B3 : Cập nhật lại trường columnId mới của Card được kéo
    const moveCardInDifferentColumn = (
        currentCardId,
        prevColumnId,
        nextColumnId,
        dndOrderedColumns
    ) => {
        const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id);
        const newBoard = { ...board };
        newBoard.columns = dndOrderedColumns;
        newBoard.columnOrderIds = dndOrderedColumnIds;
        setBoard(newBoard);

        let prevCardOrderIds = dndOrderedColumns.find(
            (c) => c._id === prevColumnId
        )?.cardOrderIds;

        if (prevCardOrderIds[0].includes("placeholder-card"))
            prevCardOrderIds = [];

        moveCardToDifferentAPI({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds: dndOrderedColumns.find(
                (c) => c._id === nextColumnId
            )?.cardOrderIds,
        });
    };

    const deleteColumn = (columnId) => {
        deleteColumnDetail(columnId)
            .then((res) => {
                const newBoard = { ...board };
                newBoard.columns = newBoard.columns.filter(
                    (c) => c._id !== columnId
                );
                newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
                    (_id) => _id !== columnId
                );
                setBoard(newBoard);
                toast.success(res?.deleteResult);
            })
            .catch(() => {});
    };

    return (
        <div>
            {!!board ? (
                <Container
                    disableGutters
                    maxWidth={false}
                    sx={{ height: "100vh" }}
                >
                    {<BoardBar board={board} />}
                    {
                        <BoardContent
                            board={board}
                            createNewColumn={createNewColumn}
                            createNewCard={createNewCard}
                            moveColumn={moveColumn}
                            moveCardInTheSameColumn={moveCardInTheSameColumn}
                            moveCardInDifferentColumn={
                                moveCardInDifferentColumn
                            }
                            deleteColumn={deleteColumn}
                        />
                    }
                </Container>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <CircularProgress />
                    <Typography>Loading board...</Typography>
                </Box>
            )}
        </div>
    );
}

export default BoardDetail;
