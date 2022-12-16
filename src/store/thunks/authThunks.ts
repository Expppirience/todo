import { AppAC } from "./../reducers/app/actionCreators";
import { AppAT } from "../reducers/app/types";
import { AppThunk } from "../store";
import { AuthAC } from "./../reducers/auth/actionCreators";
import { AuthAT } from "../reducers/auth/types";
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
  return (dispatch: Dispatch<AppAT | AuthAT>) => {
    dispatch(AppAC.setStatus("loading"));
    const payload = { email, password, rememberMe };
    return authAPI
      .sendLoginRequest(payload, captcha)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(AppAC.setStatus("succeeded"));
          dispatch(AuthAC.setIsAuth(true));
          return;
        }
        handleFailedRequest(dispatch, data.messages[0]);
      })
      .catch(() => {
        handleFailedRequest(dispatch, defaultErrorMessage);
      });
  };
};

export const logoutRequestTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(AppAC.setStatus("loading"));
    authAPI
      .sendLogoutRequest()
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(AuthAC.setIsAuth(false));
          dispatch(AppAC.setStatus("succeeded"));
          return;
        }
      })
      .catch((e) => {
        handleFailedRequest(dispatch, defaultErrorMessage);
      });
  };
};
