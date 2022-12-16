import "./App.css";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";

import { AppRouter } from "./components/AppRouter";
import { CircularProgress } from "@mui/material";
import { ErrorNotification } from "./components/EditableElement/ErrorNotification/ErrorNotification";
import { Header } from "./components/Header/Header";
import { ITaskDomain } from "./models/models";
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
      <Header />
      <AppRouter />
      <ErrorNotification />
    </div>
  );
}

export default App;
