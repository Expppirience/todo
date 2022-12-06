import React, { FC } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { EditableElement } from "./EditableElement";
import { Delete } from "@mui/icons-material";
import { ITaskDomain } from "./models/models";
import { TaskStatuses } from "./API/todoListsAPI";

export interface TaskPropsType {
  task: ITaskDomain;
  todolistId: string;
  removeTask: (id: string, todolistId: string) => void;
  changeStatus: (id: string, todolistId: string) => void;
  changeTaskTitle: (title: string, taskId: string, todolistId: string) => void;
}

export const Task: FC<TaskPropsType> = React.memo(
  ({ task, removeTask, changeStatus, todolistId, changeTaskTitle }) => {
    const editTaskText = (text: string) => {
      changeTaskTitle(text, task.id, todolistId);
    };
    return (
      <li
        key={task.id}
        className={task.status === TaskStatuses.completed ? "is-done" : ""}
      >
        <Checkbox
          color={"success"}
          checked={task.status === TaskStatuses.completed}
          onChange={() => changeStatus(task.id, todolistId)}
        />
        <EditableElement title={task.title} onChange={editTaskText} />
        <IconButton onClick={() => removeTask(task.id, todolistId)}>
          <Delete />
        </IconButton>
      </li>
    );
  }
);
