import {
  addTodolistTC,
  changeTodolistTitleTC,
  removeTodolistTC,
} from "./../../thunks/todolistsThunks";

import { AppStatusesType } from "../app/types";
import { ITodoList } from "./../../../API/todoListsAPI";
import { ITodoListDomain } from "./../../../models/models";
import { ITodoListState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { TaskFilterType } from "../../../App";
import { createSlice } from "@reduxjs/toolkit";
import { getTodoListsTC } from "./../../thunks/taskThunks";

const initialState: ITodoListState = [];

const todolistSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    changeTodoListFilter(
      state,
      action: PayloadAction<{ todoListID: string; filter: TaskFilterType }>
    ) {
      const todoList = state.find((tl) => tl.id === action.payload.todoListID);
      if (todoList) todoList.filter = action.payload.filter;
    },

    setTodoListStatus(
      state,
      action: PayloadAction<{ todoListID: string; status: AppStatusesType }>
    ) {
      const todoList = state.find((tl) => tl.id === action.payload.todoListID);
      if (todoList) todoList.entityStatus = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodoListsTC.fulfilled, (draft, action) => {
      if (action.payload) {
        const DomainTodolists: ITodoListDomain[] = action.payload.todolists.map(
          (tl) => ({
            ...tl,
            filter: "all",
            entityStatus: "idle",
          })
        );
        draft.push(...DomainTodolists);
      }
    });
    builder.addCase(removeTodolistTC.fulfilled, (draft, action) => {
      if (action.payload) {
        draft.splice(
          draft.findIndex((tl) => tl.id === action.payload?.todoListID),
          1
        );
      }
    });
    builder.addCase(addTodolistTC.fulfilled, (draft, action) => {
      if (action.payload) {
        draft.unshift({
          ...action.payload.todoList,
          filter: "all",
          entityStatus: "idle",
        });
      }
    });
    builder.addCase(changeTodolistTitleTC.fulfilled, (draft, action) => {
      if (action.payload) {
        const todoList = draft.find(
          (tl) => tl.id === action.payload?.todoListID
        );
        if (todoList) todoList.title = action.payload.title;
      }
    });
  },
});

export const todoListsReducer = todolistSlice.reducer;
export const TodoListsAC = todolistSlice.actions;
