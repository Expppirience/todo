import React, {FC} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableElement} from "./EditableElement";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./types";

export interface TaskPropsType {
   task: TaskType
   todolistId: string;
   removeTask: (id: string, todolistId: string) => void;
   changeStatus: (id: string, todolistId: string) => void;
   changeTaskTitle: (title: string, taskId: string, todolistId: string) => void;
}


export const Task: FC<TaskPropsType> = React.memo((
   {task, removeTask, changeStatus, todolistId, changeTaskTitle}) => {
   const editTaskText = (text: string) => {
      changeTaskTitle(text, task.id, todolistId)
   }
   return (
      <li key={task.id} className={task.isDone ? 'is-done' : ''}>
         <Checkbox color={'success'} checked={task.isDone}
                   onChange={() => changeStatus(task.id, todolistId)}/>
         <EditableElement title={task.title} onChange={editTaskText}/>
         <IconButton onClick={() => removeTask(task.id, todolistId)}>
            <Delete/>
         </IconButton>
      </li>
   )
})