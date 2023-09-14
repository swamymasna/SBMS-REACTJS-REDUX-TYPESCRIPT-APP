import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";
import rootReducer from "./rootReducer";
import { useDispatch } from "react-redux";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, thunk],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
