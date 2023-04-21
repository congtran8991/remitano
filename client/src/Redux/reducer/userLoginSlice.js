import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { AXIOS } from "../../Utils/axios";
import { setCookie } from "../../Utils/client";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  isLogin: false,
  data: {},
  error: null,
};

export const userLogin = createAsyncThunk(
  "callApiThunk/apiUser",
  async (requestData) => {
    try {
      const param = {
        path: "/loginUser/regis",
        data: requestData,
        method: "POST",
      };
      const dataApi = await AXIOS(param);
      setCookie("access_token", dataApi.accessToken, 1); // setCookie accessToken
      setCookie("refresh_token", dataApi.refreshToken, 1); // setCookie refreshToken
      toast.success(dataApi.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      return { isSuccess: true, data: dataApi };
    } catch (error) {
      toast.warn(error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      return { isSuccess: false, error: error.message };
    }
  }
);

export const checkSession = createAsyncThunk(
  "callApiThunk/checkSession",
  async (token) => {
    try {
      const param = {
        path: "/loginUser/checkToken",
        token,
        method: "POST",
      };
      const dataApi = await AXIOS(param);
      setCookie("access_token", dataApi.accessToken, 1); // setCookie accessToken
      return { isSuccess: true, data: dataApi };
    } catch (error) {
      return { isSuccess: false, error: error.message };
    }
  }
);

export const logoutUser = createAction("logoutUser");

export const createSliceLogin = createSlice({
  name: "userLogin",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = action.payload.isSuccess;
        if (action.payload.isSuccess) {
          state.data = action.payload.data;
        } else {
          state.error = action.payload.error;
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload) state.error = action.payload;
      })
      .addCase(checkSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = action.payload.isSuccess;
        if (action.payload.isSuccess) {
          state.data = action.payload.data;
        } else {
          state.error = action.payload.error;
        }
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogin = false; // Set `isLogin` to `false` if the session check fails.
        if (action.payload) state.error = action.payload;
      })
      .addCase(logoutUser, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.data = {};
        state.error = null;
      }),
});

export const userLoginSlice = (state) => state.userLoginSlice;
export default createSliceLogin.reducer;
