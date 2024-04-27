import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {
        data: null,
        loading: false,
        error: null,
    },
    register: {
        loading: false,
        error: null,
    },
};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerRequest: (state, action) => {
            state.register.loading = true;
            state.register.error = null;
        },
        registerSuccess: (state, action) => {
            const { result } = action.payload;
            state.register.loading = false;
            state.userInfo.data = result;
            state.register.error = null;
        },
        registerFailure: (state, action) => {
            const { error } = action.payload;
            state.register.loading = false;
            state.register.error = error;
        },
        loginRequest: (state, action) => {
            state.userInfo.loading = true;
            state.userInfo.error = null;
        },
        loginSuccess: (state, action) => {
            const { result } = action.payload;
            state.userInfo.loading = false;
            state.userInfo.data = result;
            state.userInfo.error = null;
        },
        loginFailure: (state, action) => {
            const { error } = action.payload;
            state.userInfo.loading = false;
            state.userInfo.error = error;
        },
        getUserInfoRequest: (state) => {
            state.userInfo.loading = true;
            state.userInfo.error = null;
        },
        getUserInfoSuccess: (state, action) => {
            const { result } = action.payload;
            state.userInfo.loading = false;
            state.userInfo.data = result;
        },
        getUserInfoFail: (state, action) => {
            const { error } = action.payload;
            console.log("🚀 ~ error:", error);
            // state.userInfo.error = error;
            state.userInfo.loading = false;
        },
        logoutRequest: (state, action) => {
            localStorage.removeItem("token");
            state.userInfo.data = null;
            let { callback } = action.payload;
            callback();
        },
    },
});

export const {
    ///
    loginRequest,
    loginSuccess,
    loginFailure,
    ///
    registerRequest,
    registerSuccess,
    registerFailure,
    ///
    getUserInfoRequest,
    getUserInfoSuccess,
    getUserInfoFail,
    ///
    logoutRequest,
} = authSlice.actions;

export default authSlice.reducer;
