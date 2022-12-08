import React, { useCallback, useEffect } from "react";
import "./App.css";
import { TodoList } from "./TodoList";
import { ITaskDomain } from "./models/models";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import {
  ADD_TODOLIST,
  CHANGE_TODOLIST_FILTER,
  CHANGE_TODOLIST_TITLE,
  REMOVE_TODOLIST,
} from "./store/actionCreators";
import { useAppDispatch, useAppSelector } from "./store/store";
import { todoListsSelector } from "./selectors/todoListsSelector";
import { getTodoListsTC, removeTodolistTC } from "./store/todolistsThunks";

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
  const dispatch = useAppDispatch();
  const todoLists = useAppSelector<TodoListsType[]>(todoListsSelector);

  useEffect(() => {
    dispatch(getTodoListsTC());
  }, []);

  const removeTodoList = useCallback(
    (todoListId: string) => {
      dispatch(removeTodolistTC(todoListId));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (value: TaskFilterType, todoListId: string) => {
      dispatch(CHANGE_TODOLIST_FILTER(todoListId, value));
    },
    [dispatch]
  );

  const addTodoListItem = useCallback(
    (title: string) => {
      dispatch(ADD_TODOLIST(title));
    },
    [dispatch]
  );

  const changeTodoListName = useCallback(
    (title: string, todoListId: string) => {
      dispatch(CHANGE_TODOLIST_TITLE(todoListId, title));
    },
    [dispatch]
  );

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
        <Grid container style={{ padding: "10px" }}>
          <div>
            <Typography variant={"h5"}>Add new task</Typography>
            <AddItemForm addItemCallback={addTodoListItem} />
          </div>
        </Grid>
        <Grid container spacing={4}>
          {todoLists &&
            todoLists.map((todoList) => {
              return (
                <Grid item key={todoList.id}>
                  <Paper style={{ padding: "10px" }}>
                    <TodoList
                      id={todoList.id}
                      title={todoList.title}
                      changeFilter={changeFilter}
                      filter={todoList.filter}
                      removeTodoList={removeTodoList}
                      changeTodoListName={changeTodoListName}
                    />
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
