import React from 'react'
import {Task} from "../Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TaskType} from "../types";
import {action} from "@storybook/addon-actions";

export default {
   title: "Todolist task",
   component: Task
} as ComponentMeta<typeof Task>

export const DefaultCase: ComponentStory<typeof Task> = (props) => {
   const tasks: TaskType[] = [
      {id: '1', title: 'CS', isDone: false},
      {id: '2', title: 'TS', isDone: true},
   ]

   const changeTaskStatus = action('status has been changed')
   const changeTaskTitle = action('title has been changed')
   const removeTask = action('task has been removed')

   return (
      <div>
         {tasks.map((task) => {
            return (
               <Task
                  key={task.id}
                  task={task}
                  todolistId={'2'}
                  removeTask={removeTask}
                  changeStatus={changeTaskStatus}
                  changeTaskTitle={changeTaskTitle}
               />
            )
         })}
      </div>
   )
}