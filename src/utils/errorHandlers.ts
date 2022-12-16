import { AppAC } from "../store/reducers/app/actionCreators";
import { AppAT } from "../store/reducers/app/types";
import { Dispatch } from "redux";

export const handleFailedRequest = (
  dispatch: Dispatch<AppAT>,
  errorMessage: string
) => {
  dispatch(AppAC.setError(errorMessage));
  dispatch(AppAC.setStatus("failed"));
};
