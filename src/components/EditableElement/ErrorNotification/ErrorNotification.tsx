import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks";

import { AppAC } from "../../../store/reducers/app/appReducer";
import { IAppState } from "../../../store/reducers/app/types";
import React from "react";
import { appStateSelector } from "../../../selectors/appSelectors";

export const ErrorNotification = () => {
  const appState = useAppSelector<IAppState>(appStateSelector);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    dispatch(AppAC.setError({ error: null }));
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
