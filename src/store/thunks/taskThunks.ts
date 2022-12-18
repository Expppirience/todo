import { Dispatch } from "redux";
import { TodoListsAT } from "../reducers/todolists/types";
import { AppAT } from "../reducers/app/types";
import { AppAC } from "../reducers/app/actionCreators";
import {
  TaskPriorities,
  TaskStatuses,
  todoListsAPI,
} from "../../API/todoListsAPI";
import { TasksAC } from "../reducers/tasks/actionCreators";
import { handleFailedRequest } from "../../utils/errorHandlers";
import { TasksAT } from "../reducers/tasks/types";
import { AppStateType } from "../store";
import { defaultErrorMessage } from "./todolistsThunks";

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

export const getTodoListsTC =
  () => (dispatch: Dispatch<TodoListsAT | AppAT>) => {
    dispatch(AppAC.setStatus("loading"));
    todoListsAPI
      .getTodoLists()
      .then(({ data }) => {
        if (data.length) {
          dispatch(TasksAC.setTodoList(data));
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
        if (!data.error) dispatch(TasksAC.setTasks(todoListID, data.items));
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
          dispatch(TasksAC.removeTask(todoListID, taskID));
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
          dispatch(TasksAC.addTask(task));
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
            dispatch(TasksAC.updateTask(todoListID, taskID, changesModel));
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
