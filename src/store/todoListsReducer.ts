import { ITodoListDomain } from "./../models/models";
// Types
import {
  ADD_TODOLIST_TYPE,
  AddTodolistActionType,
  CHANGE_TODOLIST_FILTER_TYPE,
  CHANGE_TODOLIST_TITLE_TYPE,
  ChangeTodoListFilterActionType,
  ChangeTodolistTitleActionType,
  REMOVE_TODOLIST_TYPE,
  RemoveTodoListActionType,
  SET_TODOLIST_TYPE,
  SetTodoListsAT,
} from "./actionTypes";

type ActionType =
  | RemoveTodoListActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodoListFilterActionType
  | SetTodoListsAT;

// ==============================================================
const initialState: ITodoListDomain[] = [];

// Reducer
export const todoListsReducer = (
  state: ITodoListDomain[] = initialState,
  action: ActionType
): ITodoListDomain[] => {
  switch (action.type) {
    case REMOVE_TODOLIST_TYPE:
      return state.filter((todoList) => todoList.id !== action.data.todoListId);
    case ADD_TODOLIST_TYPE:
      const newTodoList: ITodoListDomain = {
        id: action.data.id,
        title: action.data.title,
        filter: "all",
        addedDate: "",
        order: 0,
      };
      return [newTodoList, ...state];
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
      return action.data.todoLists.map((tl) => ({ ...tl, filter: "all" }));
    default:
      return state;
  }
};
