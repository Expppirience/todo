import { Dispatch } from "redux";
import {
  TaskPriorities,
  TaskStatuses,
  todoListsAPI,
} from "../API/todoListsAPI";
import {
  ADD_TASK,
  ADD_TODOLIST,
  CHANGE_TASK_STATUS,
  CHANGE_TODOLIST_TITLE,
  REMOVE_TASK,
  REMOVE_TODOLIST,
  SET_TASKS,
  SET_TODOLISTS,
  UPDATE_TASK,
} from "./actionCreators";
import { AppStateType } from "./store";

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
        const task = data.data.item;
        dispatch(ADD_TASK(task));
      }
    });
  };
};

export const updateTaskTC = (
  todoListID: string,
  taskID: string,
  changesModel: IUpdateDomainTask
) => {
  return (dispatch: Dispatch, getState: () => AppStateType) => {
    const task = getState().tasks[todoListID].find(
      (task) => task.id === taskID
    );
    if (task) {
      const payload = { ...task, ...changesModel };
      todoListsAPI.updateTask(todoListID, taskID, payload).then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(UPDATE_TASK(todoListID, taskID, changesModel));
        }
      });
    }
  };
};

export const removeTodolistTC = (todoListID: string) => {
  return (dispatch: Dispatch) => {
    todoListsAPI.deleteTodoList(todoListID).then(({ data }) => {
      if (data.resultCode === 0) {
        dispatch(REMOVE_TODOLIST(todoListID));
      }
    });
  };
};

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    const payload = { title };
    todoListsAPI.createTodoList(payload).then(({ data }) => {
      if (data.resultCode === 0) {
        const todoList = data.data.item;
        dispatch(ADD_TODOLIST(todoList));
      }
    });
  };
};

export const changeTodolistTitleTC = (todoListID: string, title: string) => {
  return (dispatch: Dispatch) => {
    const payload = { title };
    todoListsAPI.updateTodoList(todoListID, payload).then(({ data }) => {
      if (data.resultCode === 0)
        dispatch(CHANGE_TODOLIST_TITLE(todoListID, title));
    });
  };
};
