import { AppAC } from "../reducers/app/appReducer";
import { AuthAC } from "../reducers/auth/authReducer";
import { Dispatch } from "redux";
import { authAPI } from "./../../API/authAPI";
import { handleFailedRequest } from "./../../utils/errorHandlers";

export const initAppTC = () => {
  return (dispatch: Dispatch) => {
    authAPI
      .authMeRequest()
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(AuthAC.setIsAuth({ value: true }));
          return;
        }
        handleFailedRequest(dispatch, data.messages[0]);
      })
      .catch((e) => {
        handleFailedRequest(dispatch, "Something went wrong");
      })
      .finally(() => {
        dispatch(AppAC.setInit({ init: true }));
      });
  };
};
