import "./App.css";

import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";

import { AppRouter } from "./components/AppRouter";
import { ErrorNotification } from "./components/EditableElement/ErrorNotification/ErrorNotification";
import { ITaskDomain } from "./models/models";
import { Menu } from "@mui/icons-material";
import { appStateSelector } from "./selectors/appSelectors";
import { initAppTC } from "./store/thunks/appThunks";

// Types

export interface TodoListsType {
  id: string;
  title: string;
  filter: TaskFilterType;
}

export type TaskFilterType = "all" | "active" | "completed";

export interface AllTasksType {
  [key: string]: ITaskDomain[];
}

// ? Data

export interface IAppProps {
  demo?: boolean;
}

// Component
function App({ demo = false }: IAppProps) {
  const appState = useAppSelector(appStateSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAppTC());
  }, [dispatch]);

  if (!appState.init) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  // ? Return
  return (
    <div className="App">
      <ErrorNotification />
      <AppBar position={"static"}>
        <Toolbar>
          <IconButton edge={"start"} color="inherit" aria-label={"menu"}>
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {appState.status === "loading" ? <LinearProgress /> : ""}
      <AppRouter />
    </div>
  );
}

export default App;
