import {
  AddTaskAT,
  RemoveTaskAT,
  SetTasksAT,
  SetTodoListsAT,
  TasksACEnum,
  UpdateTaskAT,
} from "./types";
import { ITask, ITodoList } from "../../../API/todoListsAPI";
import { IUpdateDomainTask } from "../../thunks/taskThunks";

export const TasksAC = {
  removeTask: (todoListId: string, taskId: string): RemoveTaskAT => {
    return {
      type: TasksACEnum.REMOVE_TASK,
      data: {
        todoListId,
        taskId,
      },
    };
  },
  addTask: (item: ITask): AddTaskAT => {
    return {
      type: TasksACEnum.ADD_TASK,
      data: {
        item,
      },
    };
  },
  updateTask: (
    todoListID: string,
    taskID: string,
    modelChanges: IUpdateDomainTask
  ): UpdateTaskAT => {
    return {
      type: TasksACEnum.UPDATE_TASK,
      data: {
        todoListID,
        taskID,
        modelChanges,
      },
    };
  },
  setTodoList: (todoLists: ITodoList[]): SetTodoListsAT => {
    return {
      type: TasksACEnum.SET_TODOLISTS,
      data: {
        todoLists,
      },
    };
  },
  setTasks: (todoListID: string, tasks: ITask[]): SetTasksAT => {
    return {
      type: TasksACEnum.SET_TASKS,
      data: {
        todoListID,
        tasks,
      },
    };
  },
};
