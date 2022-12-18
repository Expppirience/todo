import { ITaskDomain } from "../../../models/models";
import { ITask, ITodoList } from "../../../API/todoListsAPI";
import { AddTodolistAT, RemoveTodoListAT } from "../todolists/types";
import { IUpdateDomainTask } from "../../thunks/taskThunks";

export interface ITasksState {
  [key: string]: ITaskDomain[];
}

export enum TasksACEnum {
  REMOVE_TASK = "REMOVE_TASK",
  ADD_TASK = "ADD_TASK",
  UPDATE_TASK = "UPDATE_TASK",
  SET_TASKS = "SET_TASKS",
  SET_TODOLISTS = "SET_TODOLISTS",
}

// Action Types

export interface SetTasksAT {
  type: TasksACEnum.SET_TASKS;
  data: {
    todoListID: string;
    tasks: ITask[];
  };
}

export interface SetTodoListsAT {
  type: TasksACEnum.SET_TODOLISTS;
  data: {
    todoLists: ITodoList[];
  };
}

export interface RemoveTaskAT {
  type: TasksACEnum.REMOVE_TASK;
  data: {
    todoListId: string;
    taskId: string;
  };
}

export interface AddTaskAT {
  type: TasksACEnum.ADD_TASK;
  data: {
    item: ITask;
  };
}

export interface UpdateTaskAT {
  type: TasksACEnum.UPDATE_TASK;
  data: {
    todoListID: string;
    taskID: string;
    modelChanges: IUpdateDomainTask;
  };
}

// =========================

export type TasksAT =
  | RemoveTodoListAT
  | RemoveTaskAT
  | AddTaskAT
  | AddTodolistAT
  | SetTodoListsAT
  | SetTasksAT
  | UpdateTaskAT;
