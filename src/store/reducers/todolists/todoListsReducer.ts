// Types

import { AppStatusesType } from "../app/types";
import { ITodoList } from "./../../../API/todoListsAPI";
import { ITodoListDomain } from "./../../../models/models";
import { ITodoListState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { TaskFilterType } from "../../../App";
import { createSlice } from "@reduxjs/toolkit";

// ==============================================================
const initialState: ITodoListState = [];

const todolistSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    removeTodoList(state, action: PayloadAction<{ todoListID: string }>) {
      state.splice(
        state.findIndex((tl) => tl.id === action.payload.todoListID),
        1
      );
    },
    addTodoList(state, action: PayloadAction<{ todoList: ITodoList }>) {
      state.unshift({
        ...action.payload.todoList,
        filter: "all",
        entityStatus: "idle",
      });
    },
    changeTodoListTitle(
      state,
      action: PayloadAction<{ todoListID: string; title: string }>
    ) {
      const todoList = state.find((tl) => tl.id === action.payload.todoListID);
      if (todoList) todoList.title = action.payload.title;
    },
    changeTodoListFilter(
      state,
      action: PayloadAction<{ todolistID: string; filter: TaskFilterType }>
    ) {
      const todoList = state.find((tl) => tl.id === action.payload.todolistID);
      if (todoList) todoList.filter = action.payload.filter;
    },
    setTodoLists(state, action: PayloadAction<{ todolists: ITodoList[] }>) {
      const DomainTodolists: ITodoListDomain[] = action.payload.todolists.map(
        (tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        })
      );
      state.push(...DomainTodolists);
    },
    setTodoListStatus(
      state,
      action: PayloadAction<{ todoListID: string; status: AppStatusesType }>
    ) {
      const todoList = state.find((tl) => tl.id === action.payload.todoListID);
      if (todoList) todoList.entityStatus = action.payload.status;
    },
  },
  extraReducers: {},
});

export const todoListsReducer = todolistSlice.reducer;
export const TodoListsAC = todolistSlice.actions;
// Reducer
// export const todoListsReducer = (
//   state: ITodoListDomain[] = initialState,
//   action: TodoListsAT
// ): ITodoListDomain[] => {
//   switch (action.type) {
//     case TodoListsACEnum.REMOVE_TODOLIST:
//       return state.filter((todoList) => todoList.id !== action.data.todoListID);

//     case TodoListsACEnum.ADD_TODOLIST:
//       return [
//         { ...action.data.todoList, filter: "all", entityStatus: "idle" },
//         ...state,
//       ];

//     case TodoListsACEnum.CHANGE_TODOLIST_TITLE:
//       return state.map((tl) =>
//         tl.id === action.data.todoListID
//           ? { ...tl, title: action.data.title }
//           : tl
//       );

//     case TodoListsACEnum.CHANGE_TODOLIST_FILTER:
//       return state.map((tl) =>
//         tl.id === action.data.todoListID
//           ? { ...tl, filter: action.data.filter }
//           : tl
//       );

//     case TasksACEnum.SET_TODOLISTS:
//       return action.data.todoLists.map((tl) => ({
//         ...tl,
//         filter: "all",
//         entityStatus: "idle",
//       }));

//     case TodoListsACEnum.SET_TODOLIST_STATUS:
//       return state.map((todoList) =>
//         todoList.id === action.data.todoListID
//           ? { ...todoList, entityStatus: action.data.status }
//           : todoList
//       );

//     default:
//       return state;
//   }
// };
