import { AppAC } from "../reducers/app/appReducer";
import { authAPI } from "../../API/authAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleFailedRequest } from "./../../utils/errorHandlers";

const defaultErrorMessage = "Something went wrong";

export const loginRequestTC = createAsyncThunk(
  "auth/login",
  async (
    payload: {
      email: string;
      password: string;
      rememberMe: boolean;
      captcha?: string;
    },
    thunkAPI
  ) => {
    thunkAPI.dispatch(AppAC.setStatus({ status: "loading" }));
    const loginRequestConfig = {
      email: payload.email,
      password: payload.password,
      rememberMe: payload.rememberMe,
    };
    try {
      const { data } = await authAPI.sendLoginRequest(
        loginRequestConfig,
        payload.captcha
      );
      if (data.resultCode === 0) {
        thunkAPI.dispatch(AppAC.setStatus({ status: "succeeded" }));
        return;
      }
      handleFailedRequest(thunkAPI.dispatch, data.messages[0]);
      return thunkAPI.rejectWithValue({ error: data.messages });
    } catch {
      handleFailedRequest(thunkAPI.dispatch, defaultErrorMessage);
      return thunkAPI.rejectWithValue({ error: "Invalid data" });
    }
  }
);

// export const logoutRequestTC = () => {
//   return (dispatch: Dispatch) => {
//     dispatch(AppAC.setStatus({ status: "loading" }));
//     authAPI
//       .sendLogoutRequest()
//       .then(({ data }) => {
//         if (data.resultCode === 0) {
//           dispatch(AuthAC.setIsAuth({ value: false }));
//           dispatch(AppAC.setStatus({ status: "succeeded" }));
//           return;
//         }
//       })
//       .catch((e) => {
//         handleFailedRequest(dispatch, defaultErrorMessage);
//       });
//   };
// };
export const logoutRequestTC = createAsyncThunk(
  "auth/logout",
  async ({}, thunkAPI) => {
    try {
      thunkAPI.dispatch(AppAC.setStatus({ status: "loading" }));
      const { data } = await authAPI.sendLogoutRequest();
      if (data.resultCode === 0) {
        thunkAPI.dispatch(AppAC.setStatus({ status: "succeeded" }));
        return;
      }
    } catch (e) {
      handleFailedRequest(thunkAPI.dispatch, defaultErrorMessage);
    }
  }
);
