import {
  AppBar,
  Button,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { IAppState } from "../../store/reducers/app/types";
import { IAuthState } from "../../store/reducers/auth/types";
import { Menu } from "@mui/icons-material";
import { appStateSelector } from "./../../selectors/appSelectors";
import { authSelector } from "../../selectors/authSelectors";
import { logoutRequestTC } from "../../store/thunks/authThunks";

export const Header = () => {
  const appState = useAppSelector<IAppState>(appStateSelector);
  const authState = useAppSelector<IAuthState>(authSelector);
  const dispatch = useAppDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(logoutRequestTC());
  }, [dispatch]);

  return (
    <div>
      <AppBar position={"static"}>
        <Toolbar>
          <IconButton edge={"start"} color="inherit" aria-label={"menu"}>
            <Menu />
          </IconButton>

          <Typography variant="h6">News</Typography>
          {authState.isAuth && (
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {appState.status === "loading" ? <LinearProgress /> : ""}
    </div>
  );
};
