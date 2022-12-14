// Types

import {
  ADD_TASK_TYPE,
  ADD_TODOLIST_TYPE,
  AddTaskAT,
  AddTodolistAT,
  REMOVE_TASK_TYPE,
  REMOVE_TODOLIST_TYPE,
  RemoveTaskAT,
  RemoveTodoListAT,
  SET_TASKS_TYPE,
  SET_TODOLIST_TYPE,
  SetTasksAT,
  SetTodoListsAT,
} from "../actionTypes";

import { AllTasksType } from "../../App";
import { UPDATE_TASK_TYPE } from "../actionTypes";
import { UpdateTaskAT } from "../actionTypes";

export type TasksAT =
  | RemoveTodoListAT
  | RemoveTaskAT
  | AddTaskAT
  | AddTodolistAT
  | SetTodoListsAT
  | SetTasksAT
  | UpdateTaskAT;
// ==============================================================

const initialState: AllTasksType = {};

// Reducer'
export const tasksReducer = (
  state: AllTasksType = initialState,
  action: TasksAT
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

    case ADD_TODOLIST_TYPE:
      return {
        ...state,
        [action.data.todolist.id]: [],
      };

    case SET_TODOLIST_TYPE:
      const copyState = { ...state };
      action.data.todoLists.forEach((tl) => (copyState[tl.id] = []));
      return copyState;

    case SET_TASKS_TYPE:
      return { ...state, [action.data.todoListID]: [...action.data.tasks] };

    case UPDATE_TASK_TYPE:
      return {
        ...state,
        [action.data.todoListID]: state[action.data.todoListID].map((t) => {
          return t.id === action.data.taskID
            ? { ...t, ...action.data.modelChanges }
            : { ...t };
        }),
      };

    default:
      return state;
  }
};
