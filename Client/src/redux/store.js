import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import boardReducer from "./slicers/board.slice";
import authReducer from "./slicers/auth.slice";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    board: boardReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export { store };
