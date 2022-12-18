import { Button, Grid, IconButton, Paper } from "@mui/material";
import React, { FC, useCallback, useEffect, useMemo } from "react";
import {
  addTaskTC,
  getTasksTC,
  removeTaskTC,
  updateTaskTC,
} from "../../store/thunks/taskThunks";

import { AddItemForm } from "../AddItemForm/AddItemForm";
import { AppStateType } from "../../store/store";
import { Delete } from "@mui/icons-material";
import { EditableElement } from "../EditableElement/EditableElement";
import { ITaskDomain } from "../../models/models";
import { ITasksState } from "../../store/reducers/tasks/types";
import { ITodoListDomain } from "./../../models/models";
import { Task } from "../Task/Task";
import { TaskFilterType } from "../../App";
import { TaskStatuses } from "../../API/todoListsAPI";
import { tasksSelector } from "../../selectors/tasksSelector";
import { useAppDispatch } from "../../hooks";
import { useSelector } from "react-redux";

// ? Types
interface ITodoListProps {
  todolist: ITodoListDomain;
  changeFilter: (value: TaskFilterType, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void;
  changeTodoListName: (title: string, todoListId: string) => void;
  demo?: boolean;
}

export const TodoList: FC<ITodoListProps> = React.memo(
  ({
    todolist,
    changeFilter,
    removeTodoList,
    changeTodoListName,
    demo = false,
  }) => {
    // ? Utils

    let testTodolist;
    if (!testTodolist) testTodolist = todolist;

    const tasks = useSelector<AppStateType, ITaskDomain[]>(
      tasksSelector(todolist.id)
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!demo) dispatch(getTasksTC(todolist.id));
    }, [todolist.id, demo, dispatch]);

    const filterTasks = (
      tasks: ITaskDomain[],
      filter: TaskFilterType
    ): ITaskDomain[] => {
      if (filter === "all") return tasks;
      return tasks.filter((task) =>
        filter === "active"
          ? task.status === TaskStatuses.inProgress
          : task.status === TaskStatuses.completed
      );
    };
    const removeTask = useCallback(
      (id: string, todoListId: string): void => {
        dispatch(removeTaskTC(todoListId, id));
      },
      [dispatch]
    );
    const addTask = useCallback(
      (title: string, todoListId: string): void => {
        dispatch(addTaskTC(todoListId, title));
      },
      [dispatch]
    );

    const changeStatus = useCallback(
      (id: string, todoListId: string, value: TaskStatuses) => {
        dispatch(updateTaskTC(todoListId, id, { status: value }));
      },
      [dispatch]
    );

    const changeTaskTitle = useCallback(
      (title: string, taskId: string, todoListId: string) => {
        dispatch(updateTaskTC(todoListId, taskId, { title }));
      },
      [dispatch]
    );

    const removeClickHandler = useCallback(() => {
      removeTodoList(todolist.id);
    }, [removeTodoList, todolist.id]);

    const addItem = useCallback(
      (title: string) => {
        addTask(title, todolist.id);
      },
      [addTask, todolist.id]
    );

    const editTitleName = useCallback(
      (title: string) => {
        changeTodoListName(title, todolist.id);
      },
      [changeTodoListName, todolist.id]
    );

    const filteredTasks = useMemo(() => {
      return filterTasks(tasks, todolist.filter);
    }, [tasks, todolist.filter]);

    // ? Return
    return (
      <Grid item key={todolist.id}>
        <Paper style={{ padding: "10px" }}>
          <h3>
            <EditableElement title={todolist.title} onChange={editTitleName} />
            <IconButton
              onClick={removeClickHandler}
              disabled={todolist.entityStatus === "loading"}
            >
              <Delete />
            </IconButton>
          </h3>
          <AddItemForm
            addItemCallback={addItem}
            disabled={todolist.entityStatus === "loading"}
          />
          <ul>
            {filteredTasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  todolistId={todolist.id}
                  removeTask={removeTask}
                  changeStatus={changeStatus}
                  changeTaskTitle={changeTaskTitle}
                />
              );
            })}
          </ul>
          <div>
            <Button
              variant={todolist.filter === "all" ? "contained" : "text"}
              color={"primary"}
              onClick={() => changeFilter("all", todolist.id)}
            >
              All
            </Button>
            <Button
              variant={todolist.filter === "active" ? "contained" : "text"}
              color={"success"}
              onClick={() => changeFilter("active", todolist.id)}
            >
              Active
            </Button>
            <Button
              variant={todolist.filter === "completed" ? "contained" : "text"}
              color={"error"}
              className={todolist.filter === "completed" ? "active-filter" : ""}
              onClick={() => changeFilter("completed", todolist.id)}
            >
              Completed
            </Button>
          </div>
        </Paper>
      </Grid>
    );
  }
);
