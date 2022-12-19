import { AppAC } from "../reducers/app/appReducer";
import { AppAT } from "../reducers/app/types";
import { Dispatch } from "redux";
import { TodoListsAC } from "../reducers/todolists/todoListsReducer";
import { TodoListsAT } from "../reducers/todolists/types";
import { handleFailedRequest } from "./../../utils/errorHandlers";
import { todoListsAPI } from "../../API/todoListsAPI";

export const defaultErrorMessage = "Something went wrong";

export const removeTodolistTC = (todoListID: string) => {
  return (dispatch: Dispatch) => {
    dispatch(
      TodoListsAC.setTodoListStatus({ todoListID, status: "succeeded" })
    );
    dispatch(AppAC.setStatus({ status: "loading" }));
    todoListsAPI
      .deleteTodoList(todoListID)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(TodoListsAC.removeTodoList({ todoListID }));
          dispatch(
            TodoListsAC.setTodoListStatus({ status: "succeeded", todoListID })
          );
          dispatch(AppAC.setStatus({ status: "succeeded" }));
        } else if (data.messages.length) {
          handleFailedRequest(dispatch, data.messages[0]);
        } else {
          handleFailedRequest(dispatch, defaultErrorMessage);
        }
      })
      .catch(() => {
        dispatch(
          TodoListsAC.setTodoListStatus({ status: "failed", todoListID })
        );
        handleFailedRequest(dispatch, defaultErrorMessage);
      });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(AppAC.setStatus({ status: "loading" }));
    const payload = { title };
    todoListsAPI
      .createTodoList(payload)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          const todoList = data.data.item;
          dispatch(TodoListsAC.addTodoList({ todoList }));
          dispatch(AppAC.setStatus({ status: "succeeded" }));
        } else if (data.messages.length) {
          handleFailedRequest(dispatch, data.messages[0]);
        } else {
          handleFailedRequest(dispatch, defaultErrorMessage);
        }
      })
      .catch((e) => {
        handleFailedRequest(dispatch, e.message);
      });
  };
};

export const changeTodolistTitleTC = (todoListID: string, title: string) => {
  return (dispatch: Dispatch) => {
    const payload = { title };
    todoListsAPI
      .updateTodoList(todoListID, payload)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(TodoListsAC.changeTodoListTitle({ todoListID, title }));
        } else if (data.messages.length) {
          handleFailedRequest(dispatch, data.messages[0]);
        } else {
          handleFailedRequest(dispatch, defaultErrorMessage);
        }
      })
      .catch((e) => {
        dispatch(
          TodoListsAC.setTodoListStatus({ todoListID, status: "failed" })
        );
        handleFailedRequest(dispatch, e.message);
      });
  };
};
