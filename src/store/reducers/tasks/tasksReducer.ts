import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ITask } from "../../../API/todoListsAPI";
import { ITasksState } from "./types";
import { IUpdateDomainTask } from "./../../thunks/taskThunks";
import { TodoListsAC } from "../todolists/todoListsReducer";

const initialState: ITasksState = {};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTask(
      draft,
      action: PayloadAction<{ taskID: string; todoListID: string }>
    ) {
      const tasks = draft[action.payload.todoListID];
      const index = tasks.findIndex((t) => t.id === action.payload.taskID);
      if (index > -1) tasks.splice(index, 1);
    },
    addTask(draft, action: PayloadAction<{ task: ITask }>) {
      draft[action.payload.task.todoListId].unshift(action.payload.task);
    },
    updateTask(
      draft,
      action: PayloadAction<{
        taskID: string;
        todoListID: string;
        model: IUpdateDomainTask;
      }>
    ) {
      const tasks = draft[action.payload.todoListID];
      const index = tasks.findIndex((t) => t.id === action.payload.taskID);
      if (index > -1)
        tasks[index] = { ...tasks[index], ...action.payload.model };
    },
    setTasks(
      draft,
      action: PayloadAction<{ tasks: ITask[]; todoListID: string }>
    ) {
      draft[action.payload.todoListID] = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(TodoListsAC.addTodoList, (draft, action) => {
      draft[action.payload.todoList.id] = [];
    });
    builder.addCase(TodoListsAC.removeTodoList, (draft, action) => {
      delete draft[action.payload.todoListID];
    });
    builder.addCase(TodoListsAC.setTodoLists, (draft, action) => {
      action.payload.todolists.forEach((tl) => {
        draft[tl.id] = [];
      });
    });
  },
  // extraReducers: {
  //   [TodoListsAC.addTodoList.type]: (
  //     draft,
  //     action: PayloadAction<{ tasks: ITask[]; todoListID: string }>
  //   ) => {},
  //   [TodoListsAC.removeTodoList.type]: (
  //     draft,
  //     action: PayloadAction<{ tasks: ITask[]; todoListID: string }>
  //   ) => {},
  //   [TodoListsAC.setTodoLists.type]: (
  //     draft,
  //     action: PayloadAction<{ tasks: ITask[]; todoListID: string }>
  //   ) => {},
  // },
});

export const tasksReducer = tasksSlice.reducer;
export const TasksAC = tasksSlice.actions;
