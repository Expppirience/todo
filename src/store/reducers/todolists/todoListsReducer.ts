// Types

import { ITodoListState, TodoListsACEnum, TodoListsAT } from "./types";

import { ITodoListDomain } from "../../../models/models";
import { TasksACEnum } from "../tasks/types";

// ==============================================================
const initialState: ITodoListState = [];

// Reducer
export const todoListsReducer = (
  state: ITodoListDomain[] = initialState,
  action: TodoListsAT
): ITodoListDomain[] => {
  switch (action.type) {
    case TodoListsACEnum.REMOVE_TODOLIST:
      return state.filter((todoList) => todoList.id !== action.data.todoListID);

    case TodoListsACEnum.ADD_TODOLIST:
      return [
        { ...action.data.todoList, filter: "all", entityStatus: "idle" },
        ...state,
      ];

    case TodoListsACEnum.CHANGE_TODOLIST_TITLE:
      return state.map((tl) =>
        tl.id === action.data.todoListID
          ? { ...tl, title: action.data.title }
          : tl
      );

    case TodoListsACEnum.CHANGE_TODOLIST_FILTER:
      return state.map((tl) =>
        tl.id === action.data.todoListID
          ? { ...tl, filter: action.data.filter }
          : tl
      );

    case TasksACEnum.SET_TODOLISTS:
      return action.data.todoLists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));

    case TodoListsACEnum.SET_TODOLIST_STATUS:
      return state.map((todoList) =>
        todoList.id === action.data.todoListID
          ? { ...todoList, entityStatus: action.data.status }
          : todoList
      );

    default:
      return state;
  }
};
