import { Dispatch } from "redux";
import { TaskStatuses, todoListsAPI } from "../API/todoListsAPI";
import {
  ADD_TASK,
  CHANGE_TASK_STATUS,
  REMOVE_TASK,
  SET_TASKS,
  SET_TODOLISTS,
} from "./actionCreators";
import { AppStateType } from "./store";

export const getTodoListsTC = () => {
  return (dispatch: Dispatch) => {
    todoListsAPI.getTodoLists().then(({ data }) => {
      dispatch(SET_TODOLISTS(data));
    });
  };
};

export const getTasksTC = (todoListID: string) => {
  return (dispatch: Dispatch) => {
    todoListsAPI.getTasks(todoListID).then(({ data }) => {
      dispatch(SET_TASKS(todoListID, data.items));
    });
  };
};

export const removeTaskTC = (todoListID: string, taskID: string) => {
  return (dispatch: Dispatch) => {
    todoListsAPI.deleteTask(todoListID, taskID).then(({ data }) => {
      if (data.resultCode === 0) {
        dispatch(REMOVE_TASK(todoListID, taskID));
      }
    });
  };
};

export const addTaskTC = (todoListID: string, title: string) => {
  return (dispatch: Dispatch) => {
    const payload = { title };
    todoListsAPI.createTask(todoListID, payload).then(({ data }) => {
      if (data.resultCode === 0) {
        dispatch(ADD_TASK(data.data.item));
      }
    });
  };
};

export const changeTaskStatusTC = (
  todoListID: string,
  taskID: string,
  status: TaskStatuses
) => {
  return (dispatch: Dispatch, getState: () => AppStateType) => {
    const task = getState().tasks[todoListID].find(
      (task) => task.id === taskID
    );
    if (task) {
      const payload = { ...task, status };
      todoListsAPI.updateTask(todoListID, taskID, payload).then(({ data }) => {
        dispatch(CHANGE_TASK_STATUS(todoListID, taskID, status));
      });
    }
  };
};
