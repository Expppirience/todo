import { Alert, Snackbar } from "@mui/material";

import { AppAC } from "./../../../store/reducers/app/actionCreators";
import { IAppState } from "../../../store/reducers/app/types";
import React from "react";
import { appStateSelector } from "../../../selectors/appSelectors";
import { useAppDispatch } from "./../../../store/store";
import { useAppSelector } from "../../../store/store";

export const ErrorNotification = () => {
  const appState = useAppSelector<IAppState>(appStateSelector);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    dispatch(AppAC.setError(null));
  };

  const isOpen = appState.error !== null;
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {appState.error}
      </Alert>
    </Snackbar>
  );
};
