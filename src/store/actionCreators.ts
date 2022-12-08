import {
  ADD_TASK_TYPE,
  ADD_TODOLIST_TYPE,
  CHANGE_TODOLIST_FILTER_TYPE,
  CHANGE_TODOLIST_TITLE_TYPE,
  REMOVE_TASK_TYPE,
  REMOVE_TODOLIST_TYPE,
  SET_TASKS_TYPE,
  SET_TODOLIST_TYPE,
  UPDATE_TASK_TYPE,
} from "./actionTypes";
import { ITask, ITodoList } from "../API/todoListsAPI";
import { TaskFilterType } from "../AppWithRedux";
import { IUpdateDomainTask } from "./thunks/todolistsThunks";

// * TodoLists

export const removeTodolistAC = (todoListId: string) => {
  return {
    type: REMOVE_TODOLIST_TYPE,
    data: {
      todoListId: todoListId,
    },
  } as const;
};

export const addTodolistAC = (todolist: ITodoList) => {
  return {
    type: ADD_TODOLIST_TYPE,
    data: {
      todolist,
    },
  } as const;
};

export const changeTodolistTitleAC = (todoListId: string, title: string) => {
  return {
    type: CHANGE_TODOLIST_TITLE_TYPE,
    data: {
      id: todoListId,
      title,
    },
  } as const;
};

export const changeTodolistFilterAC = (
  todoListId: string,
  filter: TaskFilterType
) => {
  return {
    type: CHANGE_TODOLIST_FILTER_TYPE,
    data: {
      id: todoListId,
      filter,
    },
  } as const;
};

// * Tasks

export const removeTaskAC = (todoListId: string, taskId: string) => {
  return {
    type: REMOVE_TASK_TYPE,
    data: {
      todoListId,
      taskId,
    },
  } as const;
};

export const addTaskAC = (item: ITask) => {
  return {
    type: ADD_TASK_TYPE,
    data: {
      item,
    },
  } as const;
};

export const setTodolistsAC = (todoLists: ITodoList[]) => {
  return {
    type: SET_TODOLIST_TYPE,
    data: {
      todoLists,
    },
  } as const;
};

export const setTasksAC = (todoListID: string, tasks: ITask[]) => {
  return {
    type: SET_TASKS_TYPE,
    data: {
      todoListID,
      tasks,
    },
  } as const;
};

export const updateTaskAC = (
  todoListID: string,
  taskID: string,
  modelChanges: IUpdateDomainTask
) => {
  return {
    type: UPDATE_TASK_TYPE,
    data: {
      todoListID,
      taskID,
      modelChanges,
    },
  } as const;
};
