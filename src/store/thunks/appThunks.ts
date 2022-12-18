import { AppAC } from "./../reducers/app/actionCreators";
import { AppThunk } from "../types";
import { AuthAC } from "./../reducers/auth/actionCreators";
import { authAPI } from "./../../API/authAPI";
import { handleFailedRequest } from "./../../utils/errorHandlers";

export const initAppTC = (): AppThunk => {
  return (dispatch) => {
    authAPI
      .authMeRequest()
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(AuthAC.setIsAuth(true));
          return;
        }
        handleFailedRequest(dispatch, data.messages[0]);
      })
      .catch((e) => {
        handleFailedRequest(dispatch, "Something went wrong");
      })
      .finally(() => {
        dispatch(AppAC.setInit(true));
      });
  };
};
