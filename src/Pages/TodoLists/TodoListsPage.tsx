import { Grid, Paper, Typography } from "@mui/material";
import React, { FC, useCallback, useEffect } from "react";
import {
  addTodolistTC,
  changeTodolistTitleTC,
  getTodoListsTC,
  removeTodolistTC,
} from "../../store/thunks/todolistsThunks";
import { useAppDispatch, useAppSelector } from "../../store/store";

import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { ITodoListDomain } from "../../models/models";
import { TaskFilterType } from "../../App";
import { TodoList } from "../../components/TodoList/TodoList";
import { changeTodolistFilterAC } from "../../store/actionCreators";
import { todoListsSelector } from "../../selectors";

export interface ITodoListPageProps {
  demo?: boolean;
}

export const TodoListsPage: FC<ITodoListPageProps> = ({ demo = false }) => {
  const todoLists = useAppSelector<ITodoListDomain[]>(todoListsSelector);
  const dispatch = useAppDispatch();

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
      dispatch(changeTodolistFilterAC(todoListId, value));
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
              <Grid item key={todoList.id}>
                <Paper style={{ padding: "10px" }}>
                  <TodoList
                    todolist={todoList}
                    changeFilter={changeFilter}
                    removeTodoList={removeTodoList}
                    demo={demo}
                    changeTodoListName={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};
