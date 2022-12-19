import { AppAC } from "../reducers/app/appReducer";
import { AuthAC } from "../reducers/auth/authReducer";
import { Dispatch } from "redux";
import { authAPI } from "../../API/authAPI";
import { handleFailedRequest } from "./../../utils/errorHandlers";

const defaultErrorMessage = "Something went wrong";

export const loginRequestTC = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha?: string
) => {
  return (dispatch: Dispatch) => {
    dispatch(AppAC.setStatus({ status: "loading" }));
    const payload = { email, password, rememberMe };
    return authAPI
      .sendLoginRequest(payload, captcha)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(AppAC.setStatus({ status: "succeeded" }));
          dispatch(AuthAC.setIsAuth({ value: true }));
          return;
        }
        handleFailedRequest(dispatch, data.messages[0]);
      })
      .catch(() => {
        handleFailedRequest(dispatch, defaultErrorMessage);
      });
  };
};

export const logoutRequestTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(AppAC.setStatus({ status: "loading" }));
    authAPI
      .sendLogoutRequest()
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(AuthAC.setIsAuth({ value: false }));
          dispatch(AppAC.setStatus({ status: "succeeded" }));
          return;
        }
      })
      .catch((e) => {
        handleFailedRequest(dispatch, defaultErrorMessage);
      });
  };
};
