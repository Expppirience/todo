import { ITask, ITodoList, TaskStatuses } from "../API/todoListsAPI";
import { TaskFilterType } from "../AppWithRedux";
import { IUpdateDomainTask } from "./todolistsThunks";

// TodoLists

export const REMOVE_TODOLIST_TYPE = "REMOVE_TODOLIST";
export const ADD_TODOLIST_TYPE = "ADD_TODOLIST";
export const CHANGE_TODOLIST_TITLE_TYPE = "CHANGE_TODOLIST_TITLE";
export const CHANGE_TODOLIST_FILTER_TYPE = "CHANGE_TODOLIST_FILTER";
export const SET_TODOLIST_TYPE = "SET_TODOLISTS";
export const SET_TASKS_TYPE = "SET_TASKS";

export interface SetTasksAT {
  type: typeof SET_TASKS_TYPE;
  data: {
    todoListID: string;
    tasks: ITask[];
  };
}

export interface SetTodoListsAT {
  type: typeof SET_TODOLIST_TYPE;
  data: {
    todoLists: ITodoList[];
  };
}

export interface RemoveTodoListActionType {
  type: typeof REMOVE_TODOLIST_TYPE;
  data: {
    todoListId: string;
  };
}

export interface AddTodolistActionType {
  type: typeof ADD_TODOLIST_TYPE;
  data: {
    todolist: ITodoList;
  };
}

export interface ChangeTodolistTitleActionType {
  type: typeof CHANGE_TODOLIST_TITLE_TYPE;
  data: {
    id: string;
    title: string;
  };
}

export interface ChangeTodoListFilterActionType {
  type: typeof CHANGE_TODOLIST_FILTER_TYPE;
  data: {
    id: string;
    filter: TaskFilterType;
  };
}

// Tasks

export const REMOVE_TASK_TYPE = "REMOVE_TASK";
export const ADD_TASK_TYPE = "ADD_TASK";
export const CHANGE_TASK_STATUS_TYPE = "CHANGE_TASK_STATUS";
export const CHANGE_TASK_TITLE_TYPE = "CHANGE_TASK_TITLE_TYPE";
export const UPDATE_TASK_TYPE = "UPDATE_TASK";

export interface RemoveTaskActionType {
  type: typeof REMOVE_TASK_TYPE;
  data: {
    todoListId: string;
    taskId: string;
  };
}

export interface UpdateTaskAT {
  type: typeof UPDATE_TASK_TYPE;
  data: {
    todoListID: string;
    taskID: string;
    modelChanges: IUpdateDomainTask;
  };
}

export interface AddTaskActionType {
  type: typeof ADD_TASK_TYPE;
  data: {
    item: ITask;
  };
}

export interface ChangeTaskStatusActionType {
  type: typeof CHANGE_TASK_STATUS_TYPE;
  data: {
    todoListId: string;
    taskId: string;
    value: TaskStatuses;
  };
}

export interface ChangeTaskTitleActionType {
  type: typeof CHANGE_TASK_TITLE_TYPE;
  data: {
    todoListId: string;
    taskId: string;
    title: string;
  };
}
