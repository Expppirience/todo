import { ITodoListDomain } from "../../../models/models";
import { SetTodoListsAT } from "../tasks/types";
import { ITodoList } from "../../../API/todoListsAPI";
import { TaskFilterType } from "../../../App";
import { AppStatusesType } from "../app/types";

export enum TodoListsACEnum {
  REMOVE_TODOLIST = "REMOVE_TODOLIST",
  ADD_TODOLIST = "ADD_TODOLIST",
  CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE",
  CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER",
  SET_TODOLIST = "SET_TODOLISTS",
  SET_TODOLIST_STATUS = "SET_TODOLIST_STATUS",
}

export interface RemoveTodoListAT {
  type: TodoListsACEnum.REMOVE_TODOLIST;
  data: {
    todoListID: string;
  };
}

export interface AddTodolistAT {
  type: TodoListsACEnum.ADD_TODOLIST;
  data: {
    todoList: ITodoList;
  };
}

export interface ChangeTodolistTitleAT {
  type: TodoListsACEnum.CHANGE_TODOLIST_TITLE;
  data: {
    todoListID: string;
    title: string;
  };
}

export interface ChangeTodoListFilterAT {
  type: TodoListsACEnum.CHANGE_TODOLIST_FILTER;
  data: {
    todoListID: string;
    filter: TaskFilterType;
  };
}

export interface SetTodoListStatusAT {
  type: TodoListsACEnum.SET_TODOLIST_STATUS;
  data: {
    todoListID: string;
    status: AppStatusesType;
  };
}

export type ITodoListState = ITodoListDomain[];

export type TodoListsAT =
  | RemoveTodoListAT
  | AddTodolistAT
  | ChangeTodolistTitleAT
  | ChangeTodoListFilterAT
  | SetTodoListsAT
  | SetTodoListStatusAT;
