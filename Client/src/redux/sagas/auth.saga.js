import { put, takeEvery } from "redux-saga/effects";
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFail,
} from "../slicers/auth.slice";

import { getBoardSuccess } from "../slicers/board.slice";

import * as AuthAPI from "src/Services/auth";

function* loginSaga(action) {
    try {
        const { data, callback } = action.payload;
        let result = yield AuthAPI.login(data);
        yield localStorage.setItem("token", result._id);
        yield put(getBoardSuccess({ data: result?.boardList }));
        yield put(loginSuccess({ result }));
        yield callback(result);
    } catch (error) {
        yield put(loginFailure({ error: error?.response?.data?.message }));
    }
}

function* registerSaga(action) {
    try {
        const { data, callback } = action.payload;
        let result = yield AuthAPI.register(data);
        yield localStorage.setItem("token", result._id);
        yield put(getBoardSuccess({ data: result?.boardList }));
        yield put(registerSuccess({ result }));
        yield callback(result);
    } catch (error) {
        yield put(registerFailure({ error: error?.response?.data?.message }));
    }
}

function* getInfoSaga(action) {
    try {
        const { data, callback } = action.payload;
        let result = yield AuthAPI.getInfo(data);
        yield put(getBoardSuccess({ data: result?.boardList }));
        yield put(getUserInfoSuccess({ result }));
        yield callback(result);
    } catch (error) {
        yield put(getUserInfoFail({ error: error?.response?.data?.message }));
    }
}

export default function* authSaga() {
    yield takeEvery(loginRequest.type, loginSaga);
    yield takeEvery(registerRequest.type, registerSaga);
    yield takeEvery(getUserInfoRequest.type, getInfoSaga);
}
