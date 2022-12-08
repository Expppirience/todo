import React from "react";
import "./App.css";
import { ITaskDomain } from "./models/models";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { TodoListsPage } from "./Pages/TodoLists/TodoListsPage";

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
function AppWithRedux() {
  // ? Return
  return (
    <div className="App">
      <AppBar position={"static"}>
        <Toolbar>
          <IconButton edge={"start"} color="inherit" aria-label={"menu"}>
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <TodoListsPage />
      </Container>
    </div>
  );
}

export default AppWithRedux;
