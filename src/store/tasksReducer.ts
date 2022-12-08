// Types

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
  SET_TASKS_TYPE,
  SET_TODOLIST_TYPE,
  SetTasksAT,
  SetTodoListsAT,
} from "./actionTypes";
import { AllTasksType } from "../AppWithRedux";

type ActionType =
  | RemoveTodoListActionType
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | SetTodoListsAT
  | SetTasksAT;

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
      return {
        ...state,
        [action.data.item.todoListId]: [
          action.data.item,
          ...state[action.data.item.todoListId],
        ],
      };
    case CHANGE_TASK_STATUS_TYPE:
      return {
        ...state,
        [action.data.todoListId]: state[action.data.todoListId].map((task) =>
          task.id === action.data.taskId
            ? { ...task, status: action.data.value } // ! Fix
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
    case SET_TODOLIST_TYPE:
      const copyState = { ...state };
      action.data.todoLists.forEach((tl) => {
        copyState[tl.id] = [];
      });
      return copyState;
    case SET_TASKS_TYPE:
      return { ...state, [action.data.todoListID]: [...action.data.tasks] };
    default:
      return state;
  }
};
