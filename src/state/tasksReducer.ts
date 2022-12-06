// Types

import { AllTasksType } from "../App";
import {
  ADD_TASK_TYPE,
  ADD_TODOLIST_TYPE,
  AddTaskActionType,
  AddTodolistActionType,
  CHANGE_TASK_STATUS_TYPE,
  CHANGE_TASK_TITLE_TYPE,
  ChangeTaskStatusActionType,
  ChangeTaskTitleActionType,
  REMOVE_TASK_TYPE,
  REMOVE_TODOLIST_TYPE,
  RemoveTaskActionType,
  RemoveTodoListActionType,
} from "./actionTypes";
import { ITaskDomain } from "../models/models";
import { TaskPriorities, TaskStatuses } from "../API/todoListsAPI";

type ActionType =
  | RemoveTodoListActionType
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType;

// ==============================================================

const initialState: AllTasksType = {};

// Reducer'
export const tasksReducer = (
  state: AllTasksType = initialState,
  action: ActionType
): AllTasksType => {
  switch (action.type) {
    case REMOVE_TODOLIST_TYPE:
      delete state[action.data.todoListId];
      return { ...state };
    case REMOVE_TASK_TYPE:
      return {
        ...state,
        [action.data.todoListId]: state[action.data.todoListId].filter(
          (task) => task.id !== action.data.taskId
        ),
      };
    case ADD_TASK_TYPE:
      const newTask: ITaskDomain = {
        id: (state[action.data.todoListId].length + 1).toString(),
        title: action.data.title,
        status: TaskStatuses.new,
        addedDate: "",
        order: 0,
        deadline: "",
        todoListId: action.data.todoListId,
        description: "",
        priority: TaskPriorities.later,
        startDate: "",
      };
      return {
        ...state,
        [action.data.todoListId]: [newTask, ...state[action.data.todoListId]],
      };
    case CHANGE_TASK_STATUS_TYPE:
      return {
        ...state,
        [action.data.todoListId]: state[action.data.todoListId].map((task) =>
          task.id === action.data.taskId
            ? { ...task, status: TaskStatuses.inProgress } // ! Fix
            : { ...task }
        ),
      };
    case CHANGE_TASK_TITLE_TYPE:
      return {
        ...state,
        [action.data.todoListId]: state[action.data.todoListId].map((task) =>
          task.id === action.data.taskId
            ? { ...task, title: action.data.title }
            : { ...task }
        ),
      };
    case ADD_TODOLIST_TYPE:
      return {
        ...state,
        [action.data.id]: [],
      };
    default:
      return state;
  }
};
