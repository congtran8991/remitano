import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userLoginSlice from "../reducer/userLoginSlice";
import thunk from "redux-thunk";

const userReducer = combineReducers({
  userLoginSlice: userLoginSlice,
});

export const store = configureStore({
  reducer: userReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
