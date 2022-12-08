import { Dispatch } from "redux";
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
import { AppStateType } from "../store";
import { TasksAT } from "../reducers/tasksReducer";
import { TodoListsAT } from "../reducers/todoListsReducer";

export const getTodoListsTC = () => {
  return (dispatch: Dispatch<TodoListsAT>) => {
    todoListsAPI.getTodoLists().then(({ data }) => {
      dispatch(setTodolistsAC(data));
    });
  };
};

export const getTasksTC = (todoListID: string) => {
  return (dispatch: Dispatch<TasksAT>) => {
    todoListsAPI.getTasks(todoListID).then(({ data }) => {
      dispatch(setTasksAC(todoListID, data.items));
    });
  };
};

export const removeTaskTC = (todoListID: string, taskID: string) => {
  return (dispatch: Dispatch<TasksAT>) => {
    todoListsAPI.deleteTask(todoListID, taskID).then(({ data }) => {
      if (data.resultCode === 0) {
        dispatch(removeTaskAC(todoListID, taskID));
      }
    });
  };
};

export const addTaskTC = (todoListID: string, title: string) => {
  return (dispatch: Dispatch<TasksAT>) => {
    const payload = { title };
    todoListsAPI.createTask(todoListID, payload).then(({ data }) => {
      if (data.resultCode === 0) {
        const task = data.data.item;
        dispatch(addTaskAC(task));
      }
    });
  };
};

export const updateTaskTC = (
  todoListID: string,
  taskID: string,
  changesModel: IUpdateDomainTask
) => {
  return (dispatch: Dispatch<TasksAT>, getState: () => AppStateType) => {
    const task = getState().tasks[todoListID].find(
      (task) => task.id === taskID
    );
    if (task) {
      const payload = { ...task, ...changesModel };
      todoListsAPI.updateTask(todoListID, taskID, payload).then(({ data }) => {
        if (data.resultCode === 0) {
          dispatch(updateTaskAC(todoListID, taskID, changesModel));
        }
      });
    }
  };
};

export const removeTodolistTC = (todoListID: string) => {
  return (dispatch: Dispatch<TodoListsAT>) => {
    todoListsAPI.deleteTodoList(todoListID).then(({ data }) => {
      if (data.resultCode === 0) {
        dispatch(removeTodolistAC(todoListID));
      }
    });
  };
};

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch<TodoListsAT>) => {
    const payload = { title };
    todoListsAPI.createTodoList(payload).then(({ data }) => {
      if (data.resultCode === 0) {
        const todoList = data.data.item;
        dispatch(addTodolistAC(todoList));
      }
    });
  };
};

export const changeTodolistTitleTC = (todoListID: string, title: string) => {
  return (dispatch: Dispatch<TodoListsAT>) => {
    const payload = { title };
    todoListsAPI.updateTodoList(todoListID, payload).then(({ data }) => {
      if (data.resultCode === 0)
        dispatch(changeTodolistTitleAC(todoListID, title));
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
