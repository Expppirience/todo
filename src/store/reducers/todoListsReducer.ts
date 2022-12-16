// Types
import {
  ADD_TODOLIST_TYPE,
  AddTodolistAT,
  CHANGE_TODOLIST_FILTER_TYPE,
  CHANGE_TODOLIST_TITLE_TYPE,
  ChangeTodoListFilterAT,
  ChangeTodolistTitleAT,
  REMOVE_TODOLIST_TYPE,
  RemoveTodoListAT,
  SET_TODOLIST_TYPE,
  SetTodoListStatusAT,
  SetTodoListsAT,
} from "../actionTypes";

import { ITodoListDomain } from "../../models/models";
import { SET_TODOLIST_STATUS_TYPE } from "./../actionTypes";

export type TodoListsAT =
  | RemoveTodoListAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodoListFilterAT
  | SetTodoListsAT
  | SetTodoListStatusAT;
// ==============================================================
const initialState: ITodoListDomain[] = [];

// Reducer
export const todoListsReducer = (
  state: ITodoListDomain[] = initialState,
  action: TodoListsAT
): ITodoListDomain[] => {
  switch (action.type) {
    case REMOVE_TODOLIST_TYPE:
      return state.filter((todoList) => todoList.id !== action.data.todoListId);

    case ADD_TODOLIST_TYPE:
      return [
        { ...action.data.todolist, filter: "all", entityStatus: "idle" },
        ...state,
      ];

    case CHANGE_TODOLIST_TITLE_TYPE:
      return state.map((tl) =>
        tl.id === action.data.id
          ? { ...tl, title: action.data.title }
          : { ...tl }
      );

    case CHANGE_TODOLIST_FILTER_TYPE:
      return state.map((tl) =>
        tl.id === action.data.id
          ? { ...tl, filter: action.data.filter }
          : { ...tl }
      );

    case SET_TODOLIST_TYPE:
      return action.data.todoLists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));

    case SET_TODOLIST_STATUS_TYPE:
      return state.map((todoList) =>
        todoList.id === action.data.todoListID
          ? { ...todoList, entityStatus: action.data.status }
          : { ...todoList }
      );

    default:
      return state;
  }
};
