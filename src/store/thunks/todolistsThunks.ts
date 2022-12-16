import {
  TaskPriorities,
  TaskStatuses,
  todoListsAPI,
} from "../../API/todoListsAPI";
import {
  addTaskAC,
  addTodolistAC,
  changeTodolistTitleAC,
  removeTaskAC,
  removeTodolistAC,
  setTasksAC,
  setTodolistsAC,
  updateTaskAC,
} from "../actionCreators";

import { AppAC } from "./../reducers/app/actionCreators";
import { AppAT } from "../reducers/app/types";
import { AppStateType } from "../store";
import { Dispatch } from "redux";
import { TasksAT } from "../reducers/tasksReducer";
import { TodoListsAT } from "../reducers/todoListsReducer";
import { handleFailedRequest } from "./../../utils/errorHandlers";
import { setTodoListStatusAC } from "./../actionCreators";

const defaultErrorMessage = "Something went wrong";

export const getTodoListsTC =
  () => (dispatch: Dispatch<TodoListsAT | AppAT>) => {
    dispatch(AppAC.setStatus("loading"));
    todoListsAPI
      .getTodoLists()
      .then(({ data }) => {
        if (data.length) {
          dispatch(setTodolistsAC(data));
          dispatch(AppAC.setStatus("idle"));
        } else handleFailedRequest(dispatch, "Unable to get todolists");
      })
      .catch((e) => {
        handleFailedRequest(dispatch, e.message);
      });
  };

export const getTasksTC = (todoListID: string) => {
  return (dispatch: Dispatch<TasksAT>) => {
    todoListsAPI
      .getTasks(todoListID)
      .then(({ data }) => {
        if (!data.error) dispatch(setTasksAC(todoListID, data.items));
        else handleFailedRequest(dispatch, data.error);
      })
      .catch((e) => {
        handleFailedRequest(dispatch, e.message);
      });
  };
};

export const removeTaskTC = (todoListID: string, taskID: string) => {
  return (dispatch: Dispatch<TasksAT>) => {
    todoListsAPI
      .deleteTask(todoListID, taskID)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(removeTaskAC(todoListID, taskID));
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

export const addTaskTC = (todoListID: string, title: string) => {
  return (dispatch: Dispatch<TasksAT | AppAT>) => {
    dispatch(AppAC.setStatus("loading"));
    const payload = { title };
    todoListsAPI
      .createTask(todoListID, payload)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          const task = data.data.item;
          dispatch(addTaskAC(task));
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

export const updateTaskTC = (
  todoListID: string,
  taskID: string,
  changesModel: IUpdateDomainTask
) => {
  return (
    dispatch: Dispatch<TasksAT | AppAT>,
    getState: () => AppStateType
  ) => {
    const task = getState().tasks[todoListID].find(
      (task) => task.id === taskID
    );
    if (task) {
      const payload = { ...task, ...changesModel };
      todoListsAPI
        .updateTask(todoListID, taskID, payload)
        .then(({ data }) => {
          if (data.resultCode === 0) {
            dispatch(updateTaskAC(todoListID, taskID, changesModel));
          } else if (data.messages.length) {
            handleFailedRequest(dispatch, data.messages[0]);
          } else {
            handleFailedRequest(dispatch, defaultErrorMessage);
          }
        })
        .catch((e) => {
          handleFailedRequest(dispatch, e.message);
        });
    }
  };
};

export const removeTodolistTC = (todoListID: string) => {
  return (dispatch: Dispatch<TodoListsAT | AppAT>) => {
    dispatch(setTodoListStatusAC(todoListID, "loading"));
    dispatch(AppAC.setStatus("loading"));
    todoListsAPI
      .deleteTodoList(todoListID)
      .then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(removeTodolistAC(todoListID));
          dispatch(setTodoListStatusAC(todoListID, "succeeded"));
          dispatch(AppAC.setStatus("succeeded"));
        } else if (data.messages.length) {
          handleFailedRequest(dispatch, data.messages[0]);
        } else {
          handleFailedRequest(dispatch, defaultErrorMessage);
        }
      })
      .catch(() => {
        dispatch(setTodoListStatusAC(todoListID, "failed"));
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
          dispatch(addTodolistAC(todoList));
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
          dispatch(changeTodolistTitleAC(todoListID, title));
        } else if (data.messages.length) {
          handleFailedRequest(dispatch, data.messages[0]);
        } else {
          handleFailedRequest(dispatch, defaultErrorMessage);
        }
      })
      .catch((e) => {
        dispatch(setTodoListStatusAC(todoListID, "failed"));
        handleFailedRequest(dispatch, e.message);
      });
  };
};

// * Types

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
