import { AppAC } from "../store/reducers/app/appReducer";
import { AppAT } from "../store/reducers/app/types";
import { Dispatch } from "redux";

export const handleFailedRequest = (
  dispatch: Dispatch,
  errorMessage: string
) => {
  dispatch(AppAC.setError({ error: errorMessage }));
  dispatch(AppAC.setStatus({ status: "failed" }));
};
