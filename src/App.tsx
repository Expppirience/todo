import "./App.css";

import {
  AppBar,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";

import { ErrorNotification } from "./components/EditableElement/ErrorNotification/ErrorNotification";
import { ITaskDomain } from "./models/models";
import { Menu } from "@mui/icons-material";
import React from "react";
import { TodoListsPage } from "./Pages/TodoLists/TodoListsPage";
import { appStateSelector } from "./selectors/appSelectors";
import { useAppSelector } from "./store/store";

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

// Component
function App() {
  const appState = useAppSelector(appStateSelector);
  console.log(appState.status);
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
      <Container fixed>
        <TodoListsPage />
      </Container>
    </div>
  );
}

export default App;
