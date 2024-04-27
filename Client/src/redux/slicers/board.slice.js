import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    board: {
        data: null,
        loading: false,
        error: null,
    },
    boardDetail: {
        data: null,
        loading: false,
        error: null,
    },
};

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        getBoardDetailRequest: (state, action) => {
            state.boardDetail.loading = true;
            state.boardDetail.error = null;
        },
        getBoardDetailSuccess: (state, action) => {
            const { data } = action.payload;
            state.boardDetail.loading = false;
            state.boardDetail.data = data;
            state.boardDetail.error = null;
        },
        getBoardDetailFailure: (state, action) => {
            const { error } = action.payload;
            state.boardDetail.loading = false;
            state.boardDetail.error = error;
        },
        ///
        getBoardRequest: (state, action) => {
            state.board.loading = true;
            state.board.error = null;
        },
        getBoardSuccess: (state, action) => {
            const { data } = action.payload;
            console.log("🚀 ~ data:", data);
            state.board.loading = false;
            state.board.data = data;
            state.board.error = null;
        },
        getBoardFailure: (state, action) => {
            const { error } = action.payload;
            state.board.loading = false;
            state.board.error = error;
        },
        ///
        createBoardRequest: (state, action) => {
            state.board.loading = true;
            state.board.error = null;
        },
        createBoardSuccess: (state, action) => {
            const { result } = action.payload;
            state.board.loading = false;
            state.board.data = [...state.board.data, result];
            state.board.error = null;
        },
        createBoardFailure: (state, action) => {
            const { error } = action.payload;
            state.board.loading = false;
            state.board.error = error;
        },
    },
});

export const {
    getBoardRequest,
    getBoardSuccess,
    getBoardFailure,
    ///
    createBoardRequest,
    createBoardSuccess,
    createBoardFailure,
    ///
    getBoardDetailRequest,
    getBoardDetailSuccess,
    getBoardDetailFailure,
} = boardSlice.actions;

export default boardSlice.reducer;
