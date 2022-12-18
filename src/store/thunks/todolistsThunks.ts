import { AppAC } from "./../reducers/app/actionCreators";
import { AppAT } from "../reducers/app/types";
import { Dispatch } from "redux";
import { TodoListsAC } from "../reducers/todolists/actionCreators";
import { TodoListsAT } from "../reducers/todolists/types";
import { handleFailedRequest } from "./../../utils/errorHandlers";
import { todoListsAPI } from "../../API/todoListsAPI";

export const defaultErrorMessage = "Something went wrong";

export const removeTodolistTC = (todoListID: string) => {
  return (dispatch: Dispatch<TodoListsAT | AppAT>) => {
    dispatch(TodoListsAC.setTodoListStatus(todoListID, "loading"));
    dispatch(AppAC.setStatus("loading"));
    todoListsAPI
      .deleteTodoList(todoListID)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(TodoListsAC.removeTodoList(todoListID));
          dispatch(TodoListsAC.setTodoListStatus(todoListID, "succeeded"));
          dispatch(AppAC.setStatus("succeeded"));
        } else if (data.messages.length) {
          handleFailedRequest(dispatch, data.messages[0]);
        } else {
          handleFailedRequest(dispatch, defaultErrorMessage);
        }
      })
      .catch(() => {
        dispatch(TodoListsAC.setTodoListStatus(todoListID, "failed"));
        handleFailedRequest(dispatch, defaultErrorMessage);
      });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch<TodoListsAT | AppAT>) => {
    dispatch(AppAC.setStatus("loading"));
    const payload = { title };
    todoListsAPI
      .createTodoList(payload)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          const todoList = data.data.item;
          dispatch(TodoListsAC.addTodoList(todoList));
          dispatch(AppAC.setStatus("succeeded"));
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
  return (dispatch: Dispatch<TodoListsAT>) => {
    const payload = { title };
    todoListsAPI
      .updateTodoList(todoListID, payload)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(TodoListsAC.changeTodoListTitle(todoListID, title));
        } else if (data.messages.length) {
          handleFailedRequest(dispatch, data.messages[0]);
        } else {
          handleFailedRequest(dispatch, defaultErrorMessage);
        }
      })
      .catch((e) => {
        dispatch(TodoListsAC.setTodoListStatus(todoListID, "failed"));
        handleFailedRequest(dispatch, e.message);
      });
  };
};
