import {
  IUpdateDomainTask,
  addTaskTC,
  getTasksTC,
  getTodoListsTC,
  removeTaskTC,
  updateTaskTC,
} from "./../../thunks/taskThunks";
import {
  addTodolistTC,
  removeTodolistTC,
} from "./../../thunks/todolistsThunks";

import { ITasksState } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ITasksState = {};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodolistTC.fulfilled, (draft, action) => {
      if (action.payload) {
        draft[action.payload.todoList.id] = [];
      }
    });
    builder.addCase(removeTodolistTC.fulfilled, (draft, action) => {
      if (action.payload) {
        delete draft[action.payload.todoListID];
      }
    });
    builder.addCase(getTodoListsTC.fulfilled, (draft, action) => {
      action.payload.todolists.forEach((tl) => {
        draft[tl.id] = [];
      });
    });
    builder.addCase(getTasksTC.fulfilled, (draft, action) => {
      if (action.payload) {
        draft[action.payload.todoListID] = action.payload.tasks;
      }
    });
    builder.addCase(removeTaskTC.fulfilled, (draft, action) => {
      if (action.payload) {
        const tasks = draft[action.payload.todoListID];
        const index = tasks.findIndex((t) => t.id === action.payload?.taskID);
        if (index > -1) tasks.splice(index, 1);
      }
    });
    builder.addCase(addTaskTC.fulfilled, (draft, action) => {
      if (action.payload) {
        draft[action.payload.task.todoListId].unshift(action.payload.task);
      }
    });
    builder.addCase(updateTaskTC.fulfilled, (draft, action) => {
      if (action.payload) {
        const tasks = draft[action.payload.todoListID];
        const index = tasks.findIndex((t) => t.id === action.payload?.taskID);
        if (index > -1)
          tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const TasksAC = tasksSlice.actions;
