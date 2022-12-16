import {
  AppBar,
  Button,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";

import { IAppState } from "../../store/reducers/app/types";
import { Menu } from "@mui/icons-material";
import { appStateSelector } from "./../../selectors/appSelectors";
import { logoutRequestTC } from "../../store/thunks/authThunks";
import { useAppDispatch } from "./../../store/store";
import { useAppSelector } from "../../store/store";

export const Header = () => {
  const appState = useAppSelector<IAppState>(appStateSelector);
  const dispatch = useAppDispatch();

  const logoutHandler = useCallback(() => {
    console.log("in logout handler");
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
          <Button color="inherit" onClick={logoutHandler}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      {appState.status === "loading" ? <LinearProgress /> : ""}
    </div>
  );
};
