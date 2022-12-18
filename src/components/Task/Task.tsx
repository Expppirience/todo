import { Checkbox, IconButton } from "@mui/material";
import React, { FC, useCallback } from "react";

import { Delete } from "@mui/icons-material";
import { EditableElement } from "../EditableElement/EditableElement";
import { ITaskDomain } from "../../models/models";
import { TaskStatuses } from "../../API/todoListsAPI";

export interface TaskPropsType {
  task: ITaskDomain;
  todolistId: string;
  removeTask: (id: string, todolistId: string) => void;
  changeStatus: (id: string, todolistId: string, value: TaskStatuses) => void;
  changeTaskTitle: (title: string, taskId: string, todolistId: string) => void;
}

export const Task: FC<TaskPropsType> = React.memo(
  ({ task, removeTask, changeStatus, todolistId, changeTaskTitle }) => {
    const editTaskText = useCallback(
      (text: string) => {
        changeTaskTitle(text, task.id, todolistId);
      },
      [changeTaskTitle, todolistId, task.id]
    );
    const changeTaskStatus = useCallback(() => {
      const taskStatus =
        task.status === TaskStatuses.completed
          ? TaskStatuses.inProgress
          : TaskStatuses.completed;
      changeStatus(task.id, todolistId, taskStatus);
    }, [changeStatus, task.id, task.status, todolistId]);
    return (
      <li
        key={task.id}
        className={task.status === TaskStatuses.completed ? "is-done" : ""}
      >
        <Checkbox
          color={"success"}
          checked={task.status === TaskStatuses.completed}
          onChange={changeTaskStatus}
        />
        <EditableElement title={task.title} onChange={editTaskText} />
        <IconButton onClick={() => removeTask(task.id, todolistId)}>
          <Delete />
        </IconButton>
      </li>
    );
  }
);
