import { AppAC } from "../reducers/app/appReducer";
import { Dispatch } from "redux";
import { TodoListsAC } from "../reducers/todolists/todoListsReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleFailedRequest } from "./../../utils/errorHandlers";
import { todoListsAPI } from "../../API/todoListsAPI";

export const defaultErrorMessage = "Something went wrong";

export const removeTodolistTC = createAsyncThunk(
  "todolist/removeTodolist",
  async (todoListID: string, { dispatch, rejectWithValue }) => {
    dispatch(TodoListsAC.setTodoListStatus({ todoListID, status: "loading" }));
    dispatch(AppAC.setStatus({ status: "loading" }));
    try {
      const { data } = await todoListsAPI.deleteTodoList(todoListID);
      if (data.resultCode === 0) {
        dispatch(
          TodoListsAC.setTodoListStatus({ status: "succeeded", todoListID })
        );
        dispatch(AppAC.setStatus({ status: "succeeded" }));
        return { todoListID };
      } else if (data.messages.length) {
        handleFailedRequest(dispatch, data.messages[0]);
      } else {
        handleFailedRequest(dispatch, defaultErrorMessage);
      }
    } catch {
      dispatch(TodoListsAC.setTodoListStatus({ status: "failed", todoListID }));
      handleFailedRequest(dispatch, defaultErrorMessage);
    }
  }
);

// export const removeTodolistTC = (todoListID: string) => {
//   return (dispatch: Dispatch) => {
//     dispatch(
//       TodoListsAC.setTodoListStatus({ todoListID, status: "succeeded" })
//     );
//     dispatch(AppAC.setStatus({ status: "loading" }));
//     todoListsAPI
//       .deleteTodoList(todoListID)
//       .then(({ data }) => {
//         if (data.resultCode === 0) {
//           dispatch(TodoListsAC.removeTodoList({ todoListID }));
//           dispatch(
//             TodoListsAC.setTodoListStatus({ status: "succeeded", todoListID })
//           );
//           dispatch(AppAC.setStatus({ status: "succeeded" }));
//         } else if (data.messages.length) {
//           handleFailedRequest(dispatch, data.messages[0]);
//         } else {
//           handleFailedRequest(dispatch, defaultErrorMessage);
//         }
//       })
//       .catch(() => {
//         dispatch(
//           TodoListsAC.setTodoListStatus({ status: "failed", todoListID })
//         );
//         handleFailedRequest(dispatch, defaultErrorMessage);
//       });
//   };
// };

export const addTodolistTC = createAsyncThunk(
  "todolist/addTodolist",
  async (title: string, { dispatch }) => {
    dispatch(AppAC.setStatus({ status: "loading" }));
    const payload = { title };
    try {
      const { data } = await todoListsAPI.createTodoList(payload);
      if (data.resultCode === 0) {
        const todoList = data.data.item;
        dispatch(AppAC.setStatus({ status: "succeeded" }));
        return { todoList };
      } else if (data.messages.length) {
        handleFailedRequest(dispatch, data.messages[0]);
      } else {
        handleFailedRequest(dispatch, defaultErrorMessage);
      }
    } catch {
      handleFailedRequest(dispatch, defaultErrorMessage);
    }
  }
);

export const changeTodolistTitleTC = createAsyncThunk(
  "todolist/changeTodoListTitle",
  async (params: { todoListID: string; title: string }, { dispatch }) => {
    const { todoListID, title } = params;
    const payload = { title };
    try {
      const { data } = await todoListsAPI.updateTodoList(todoListID, payload);
      if (data.resultCode === 0) {
        return { todoListID, title };
      } else if (data.messages.length) {
        handleFailedRequest(dispatch, data.messages[0]);
      } else {
        handleFailedRequest(dispatch, defaultErrorMessage);
      }
    } catch (e) {
      dispatch(TodoListsAC.setTodoListStatus({ todoListID, status: "failed" }));
      handleFailedRequest(dispatch, defaultErrorMessage);
    }
  }
);
