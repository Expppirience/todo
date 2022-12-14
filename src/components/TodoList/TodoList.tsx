import { AllTasksType, TaskFilterType } from "../../App";
import { AppStateType, useAppDispatch } from "../../store/store";
import { Button, IconButton } from "@mui/material";
import React, { FC, useCallback, useEffect } from "react";
import {
  addTaskTC,
  getTasksTC,
  removeTaskTC,
  updateTaskTC,
} from "../../store/thunks/todolistsThunks";

import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Delete } from "@mui/icons-material";
import { EditableElement } from "../EditableElement/EditableElement";
import { ITaskDomain } from "../../models/models";
import { Task } from "../Task/Task";
import { TaskStatuses } from "../../API/todoListsAPI";
import { tasksSelector } from "../../selectors/tasksSelector";
import { useSelector } from "react-redux";

// ? Types
interface TodoListProps {
  id: string;
  title: string;
  filter: TaskFilterType;
  changeFilter: (value: TaskFilterType, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void;
  changeTodoListName: (title: string, todoListId: string) => void;
}

export const TodoList: FC<TodoListProps> = React.memo(
  ({ title, changeFilter, filter, id, removeTodoList, changeTodoListName }) => {
    // ? Utils

    const tasks = useSelector<AppStateType, AllTasksType>(tasksSelector)[id];
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getTasksTC(id));
    }, []);

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
      removeTodoList(id);
    }, [removeTodoList, id]);

    const addItem = useCallback(
      (title: string) => {
        addTask(title, id);
      },
      [addTask, id]
    );

    const editTitleName = (title: string) => {
      changeTodoListName(title, id);
    };
    // ? Return
    return (
      <div>
        <h3>
          <EditableElement title={title} onChange={editTitleName} />
          <IconButton onClick={removeClickHandler}>
            <Delete />
          </IconButton>
        </h3>
        <AddItemForm addItemCallback={addItem} />
        <ul>
          {filterTasks(tasks, filter).map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                todolistId={id}
                removeTask={removeTask}
                changeStatus={changeStatus}
                changeTaskTitle={changeTaskTitle}
              />
            );
          })}
        </ul>
        <div>
          <Button
            variant={filter === "all" ? "contained" : "text"}
            color={"primary"}
            onClick={() => changeFilter("all", id)}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "contained" : "text"}
            color={"success"}
            onClick={() => changeFilter("active", id)}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "contained" : "text"}
            color={"error"}
            className={filter === "completed" ? "active-filter" : ""}
            onClick={() => changeFilter("completed", id)}
          >
            Completed
          </Button>
        </div>
      </div>
    );
  }
);
