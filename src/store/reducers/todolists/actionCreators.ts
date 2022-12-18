import { AppStatusesType } from "../app/types";
import {
  AddTodolistAT,
  ChangeTodoListFilterAT,
  ChangeTodolistTitleAT,
  RemoveTodoListAT,
  SetTodoListStatusAT,
  TodoListsACEnum,
} from "./types";
import { ITodoList } from "../../../API/todoListsAPI";
import { TaskFilterType } from "../../../App";

export const TodoListsAC = {
  setTodoListStatus: (
    todoListID: string,
    status: AppStatusesType
  ): SetTodoListStatusAT => {
    return {
      type: TodoListsACEnum.SET_TODOLIST_STATUS,
      data: {
        todoListID,
        status,
      },
    };
  },
  removeTodoList: (todoListID: string): RemoveTodoListAT => {
    return {
      type: TodoListsACEnum.REMOVE_TODOLIST,
      data: {
        todoListID,
      },
    };
  },
  addTodoList: (todoList: ITodoList): AddTodolistAT => {
    return {
      type: TodoListsACEnum.ADD_TODOLIST,
      data: {
        todoList,
      },
    };
  },
  changeTodoListTitle: (
    todoListID: string,
    title: string
  ): ChangeTodolistTitleAT => {
    return {
      type: TodoListsACEnum.CHANGE_TODOLIST_TITLE,
      data: {
        todoListID,
        title,
      },
    };
  },
  changeTodoListFilter: (
    todoListID: string,
    filter: TaskFilterType
  ): ChangeTodoListFilterAT => {
    return {
      type: TodoListsACEnum.CHANGE_TODOLIST_FILTER,
      data: {
        todoListID,
        filter,
      },
    };
  },
};
