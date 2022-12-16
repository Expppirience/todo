import {
  addTaskAC,
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTaskAC,
  removeTodolistAC,
  setTasksAC,
  setTodoListStatusAC,
  setTodolistsAC,
  updateTaskAC,
} from "./actionCreators";

// * TodoLists

export const REMOVE_TODOLIST_TYPE = "REMOVE_TODOLIST";
export const ADD_TODOLIST_TYPE = "ADD_TODOLIST";
export const CHANGE_TODOLIST_TITLE_TYPE = "CHANGE_TODOLIST_TITLE";
export const CHANGE_TODOLIST_FILTER_TYPE = "CHANGE_TODOLIST_FILTER";
export const SET_TODOLIST_TYPE = "SET_TODOLISTS";
export const SET_TASKS_TYPE = "SET_TASKS";
export const SET_TODOLIST_STATUS_TYPE = "SET_TODOLIST_STATUS";

export type SetTasksAT = ReturnType<typeof setTasksAC>;
export type SetTodoListsAT = ReturnType<typeof setTodolistsAC>;
export type RemoveTodoListAT = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAT = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodoListFilterAT = ReturnType<typeof changeTodolistFilterAC>;
export type SetTodoListStatusAT = ReturnType<typeof setTodoListStatusAC>;

// *  Tasks

export const REMOVE_TASK_TYPE = "REMOVE_TASK";
export const ADD_TASK_TYPE = "ADD_TASK";
export const CHANGE_TASK_STATUS_TYPE = "CHANGE_TASK_STATUS";
export const CHANGE_TASK_TITLE_TYPE = "CHANGE_TASK_TITLE_TYPE";
export const UPDATE_TASK_TYPE = "UPDATE_TASK";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
export type UpdateTaskAT = ReturnType<typeof updateTaskAC>;
export type AddTaskAT = ReturnType<typeof addTaskAC>;
