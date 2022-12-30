import {
  TaskPriorities,
  TaskStatuses,
  todoListsAPI,
} from "../../API/todoListsAPI";

import { AppAC } from "../reducers/app/appReducer";
import { AppStateType } from "../store";
import { Dispatch } from "redux";
import { TodoListsAC } from "../reducers/todolists/todoListsReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultErrorMessage } from "./todolistsThunks";
import { handleFailedRequest } from "../../utils/errorHandlers";

export interface IUpdateDomainTask {
  description?: string;
  title?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
  id?: string;
  todoListId?: string;
  order?: number;
  addedDate?: string;
}

// export const getTodoListsTC = () => (dispatch: Dispatch) => {
//   dispatch(AppAC.setStatus({ status: "loading" }));
//   todoListsAPI
//     .getTodoLists()
//     .then(({ data }) => {
//       if (data.length) {
//         dispatch(TodoListsAC.setTodoLists({ todolists: data }));
//         dispatch(AppAC.setStatus({ status: "idle" }));
//       } else handleFailedRequest(dispatch, "Unable to get todolists");
//     })
//     .catch((e) => {
//       handleFailedRequest(dispatch, e.message);
//     });
// };

export const getTodoListsTC = createAsyncThunk(
  "todolist/getTodoLists",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(AppAC.setStatus({ status: "loading" }));
    try {
      const { data } = await todoListsAPI.getTodoLists();
      if (data.length) {
        dispatch(AppAC.setStatus({ status: "succeeded" }));
        return { todolists: data };
      }
      handleFailedRequest(dispatch, "Unable to get todolists");
      return rejectWithValue(null);
    } catch (e) {
      handleFailedRequest(dispatch, defaultErrorMessage);
      return rejectWithValue(null);
    }
  }
);

export const getTasksTC = createAsyncThunk(
  "tasks/getTasks",
  (todoListID: string, thunkAPI) => {
    thunkAPI.dispatch(AppAC.setStatus({ status: "loading" }));
    return todoListsAPI
      .getTasks(todoListID)
      .then(({ data }) => {
        if (!data.error) {
          thunkAPI.dispatch(AppAC.setStatus({ status: "succeeded" }));
          return { todoListID, tasks: data.items };
        }
        handleFailedRequest(thunkAPI.dispatch, data.error);
      })
      .catch((e) => {
        handleFailedRequest(thunkAPI.dispatch, e.message);
      });
  }
);

export const removeTaskTC = createAsyncThunk(
  "tasks/removeTask",
  async (params: { taskID: string; todoListID: string }, thunkAPI) => {
    try {
      const { data } = await todoListsAPI.deleteTask(
        params.todoListID,
        params.taskID
      );
      if (data.resultCode === 0) {
        return { todoListID: params.todoListID, taskID: params.taskID };
      }
      handleFailedRequest(thunkAPI.dispatch, data.messages[0]);
    } catch (e) {
      handleFailedRequest(thunkAPI.dispatch, defaultErrorMessage);
    }
  }
);

export const addTaskTC = createAsyncThunk(
  "task/addTask",
  async (params: { todoListID: string; title: string }, { dispatch }) => {
    try {
      dispatch(AppAC.setStatus({ status: "loading" }));
      const payload = { title: params.title };
      const { data } = await todoListsAPI.createTask(
        params.todoListID,
        payload
      );
      if (data.resultCode === 0) {
        dispatch(AppAC.setStatus({ status: "succeeded" }));
        return { task: data.data.item };
      } else if (data.messages.length) {
        handleFailedRequest(dispatch, data.messages[0]);
        return;
      }
      handleFailedRequest(dispatch, defaultErrorMessage);
    } catch (e) {
      handleFailedRequest(dispatch, defaultErrorMessage);
    }
  }
);

// export const updateTaskTC = (
//   todoListID: string,
//   taskID: string,
//   changesModel: IUpdateDomainTask
// ) => {
//   return (dispatch: Dispatch, getState: () => AppStateType) => {

//   };
// };

export const updateTaskTC = createAsyncThunk(
  "task/updateTask",
  async (
    params: {
      todoListID: string;
      taskID: string;
      model: IUpdateDomainTask;
    },
    { dispatch, getState }
  ) => {
    const { todoListID, taskID, model } = params;
    const state = getState() as AppStateType;

    const task = state.tasks[todoListID].find((task) => task.id === taskID);
    if (task) {
      const payload = { ...task, ...model };
      try {
        const { data } = await todoListsAPI.updateTask(
          todoListID,
          taskID,
          payload
        );
        if (data.resultCode === 0) {
          return { todoListID, taskID, model };
        } else if (data.messages.length) {
          handleFailedRequest(dispatch, data.messages[0]);
        } else {
          handleFailedRequest(dispatch, defaultErrorMessage);
        }
      } catch (e) {
        handleFailedRequest(dispatch, defaultErrorMessage);
      }
    }
  }
);
