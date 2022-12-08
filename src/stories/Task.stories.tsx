import React from "react";
import { Task } from "../components/Task/Task";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ITaskDomain } from "../models/models";
import { action } from "@storybook/addon-actions";
import { TaskPriorities, TaskStatuses } from "../API/todoListsAPI";

export default {
  title: "Todolist task",
  component: Task,
} as ComponentMeta<typeof Task>;

export const DefaultCase: ComponentStory<typeof Task> = (props) => {
  const tasks: ITaskDomain[] = [
    {
      id: "1",
      title: "CS",
      status: TaskStatuses.inProgress,
      order: 0,
      description: "",
      todoListId: "1",
      addedDate: "",
      startDate: "",
      priority: TaskPriorities.hi,
      deadline: "",
    },
    {
      id: "2",
      title: "TS",
      status: TaskStatuses.inProgress,
      order: 0,
      description: "",
      todoListId: "1",
      addedDate: "",
      startDate: "",
      priority: TaskPriorities.hi,
      deadline: "",
    },
  ];

  const changeTaskStatus = action("status has been changed");
  const changeTaskTitle = action("title has been changed");
  const removeTask = action("task has been removed");

  return (
    <div>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            todolistId={"2"}
            removeTask={removeTask}
            changeStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
          />
        );
      })}
    </div>
  );
};
