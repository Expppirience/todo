import { Grid, Typography } from "@mui/material";
import React, { FC, useCallback, useEffect } from "react";
import {
  addTodolistTC,
  changeTodolistTitleTC,
  removeTodolistTC,
} from "../../store/thunks/todolistsThunks";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { ITodoListDomain } from "../../models/models";
import { TaskFilterType } from "../../App";
import { TodoList } from "../../components/TodoList/TodoList";
import { TodoListsAC } from "../../store/reducers/todolists/todoListsReducer";
import { authSelector } from "./../../selectors/authSelectors";
import { getTodoListsTC } from "../../store/thunks/taskThunks";
import { todoListsSelector } from "../../selectors";
import { useNavigate } from "react-router-dom";

export interface ITodoListPageProps {
  demo?: boolean;
}

export const TodoListsPage: FC<ITodoListPageProps> = React.memo(
  ({ demo = false }) => {
    const todoLists = useAppSelector<ITodoListDomain[]>(todoListsSelector);
    const authState = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    console.log(todoLists);

    useEffect(() => {
      if (!authState.isAuth) navigate("/login");
    }, [navigate, authState.isAuth]);

    useEffect(() => {
      if (!demo) dispatch(getTodoListsTC());
    }, [demo, dispatch]);

    const changeTodoListTitle = useCallback(
      (title: string, todoListId: string) => {
        dispatch(changeTodolistTitleTC(todoListId, title));
      },
      [dispatch]
    );
    const removeTodoList = useCallback(
      (todoListId: string) => {
        dispatch(removeTodolistTC(todoListId));
      },
      [dispatch]
    );
    const changeFilter = useCallback(
      (value: TaskFilterType, todoListId: string) => {
        dispatch(
          TodoListsAC.changeTodoListFilter({
            todolistID: todoListId,
            filter: value,
          })
        );
      },
      [dispatch]
    );

    const addTodoListItem = useCallback(
      (title: string) => {
        dispatch(addTodolistTC(title));
      },
      [dispatch]
    );
    return (
      <div>
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
                <TodoList
                  key={todoList.id}
                  todolist={todoList}
                  changeFilter={changeFilter}
                  removeTodoList={removeTodoList}
                  demo={demo}
                  changeTodoListName={changeTodoListTitle}
                />
              );
            })}
        </Grid>
      </div>
    );
  }
);
