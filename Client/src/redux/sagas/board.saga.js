import { put, takeEvery } from "redux-saga/effects";
import {
    getBoardDetailRequest,
    getBoardDetailSuccess,
    getBoardDetailFailure,
    createBoardRequest,
    createBoardSuccess,
    createBoardFailure,
} from "../slicers/board.slice";
import { fetchBoardDetail } from "src/Services";
import * as BoardAPI from "src/Services/board";

function* getBoardDetailSaga(action) {
    try {
        const { boardId } = action.payload;
        let data = yield fetchBoardDetail(boardId);
        yield put(getBoardDetailSuccess({ data }));
    } catch (error) {
        console.log("🚀 ~ function*getBoardSaga ~ error:", error);
        yield put(getBoardDetailFailure({ error: error }));
    }
}

function* createBoardSaga(action) {
    try {
        const { values, callback } = action.payload;
        let result = yield BoardAPI.createBoard(values);
        yield put(createBoardSuccess({ result }));
        yield callback();
    } catch (error) {
        yield put(createBoardFailure({ error: error }));
    }
}

export default function* boardSaga() {
    yield takeEvery(getBoardDetailRequest.type, getBoardDetailSaga);
    yield takeEvery(createBoardRequest.type, createBoardSaga);
}
