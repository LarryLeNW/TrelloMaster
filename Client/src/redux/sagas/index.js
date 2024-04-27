import { fork } from "redux-saga/effects";
import boardSaga from "./board.saga";
import authSaga from "./auth.saga";

export default function* rootSaga() {
  yield fork(boardSaga);
  yield fork(authSaga);
}
