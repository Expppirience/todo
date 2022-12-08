import {
  ADD_TASK_TYPE,
  ADD_TODOLIST_TYPE,
  AddTaskActionType,
  AddTodolistActionType,
  CHANGE_TASK_STATUS_TYPE,
  CHANGE_TASK_TITLE_TYPE,
  CHANGE_TODOLIST_FILTER_TYPE,
  CHANGE_TODOLIST_TITLE_TYPE,
  ChangeTaskStatusActionType,
  ChangeTaskTitleActionType,
  ChangeTodoListFilterActionType,
  ChangeTodolistTitleActionType,
  REMOVE_TASK_TYPE,
  REMOVE_TODOLIST_TYPE,
  RemoveTaskActionType,
  RemoveTodoListActionType,
  SET_TASKS_TYPE,
  SET_TODOLIST_TYPE,
  SetTasksAT,
  SetTodoListsAT,
  UPDATE_TASK_TYPE,
  UpdateTaskAT,
} from "./actionTypes";
import { ITask, ITodoList, TaskStatuses } from "../API/todoListsAPI";
import { TaskFilterType } from "../AppWithRedux";
import { IUpdateDomainTask } from "./todolistsThunks";
// TodoLists

export const REMOVE_TODOLIST = (
  todoListId: string
): RemoveTodoListActionType => {
  return {
    type: REMOVE_TODOLIST_TYPE,
    data: {
      todoListId: todoListId,
    },
  };
};

export const ADD_TODOLIST = (todolist: ITodoList): AddTodolistActionType => {
  return {
    type: ADD_TODOLIST_TYPE,
    data: {
      todolist,
    },
  };
};

export const CHANGE_TODOLIST_TITLE = (
  todoListId: string,
  title: string
): ChangeTodolistTitleActionType => {
  return {
    type: CHANGE_TODOLIST_TITLE_TYPE,
    data: {
      id: todoListId,
      title,
    },
  };
};

export const CHANGE_TODOLIST_FILTER = (
  todoListId: string,
  filter: TaskFilterType
): ChangeTodoListFilterActionType => {
  return {
    type: CHANGE_TODOLIST_FILTER_TYPE,
    data: {
      id: todoListId,
      filter,
    },
  };
};

// Tasks

export const REMOVE_TASK = (
  todoListId: string,
  taskId: string
): RemoveTaskActionType => {
  return {
    type: REMOVE_TASK_TYPE,
    data: {
      todoListId,
      taskId,
    },
  };
};
export const ADD_TASK = (item: ITask): AddTaskActionType => {
  return {
    type: ADD_TASK_TYPE,
    data: {
      item,
    },
  };
};

export const CHANGE_TASK_STATUS = (
  todoListId: string,
  taskId: string,
  value: TaskStatuses
): ChangeTaskStatusActionType => {
  return {
    type: CHANGE_TASK_STATUS_TYPE,
    data: {
      todoListId,
      taskId,
      value,
    },
  };
};

export const CHANGE_TASK_TITLE = (
  todoListId: string,
  taskId: string,
  title: string
): ChangeTaskTitleActionType => {
  return {
    type: CHANGE_TASK_TITLE_TYPE,
    data: {
      todoListId,
      taskId,
      title,
    },
  };
};

export const SET_TODOLISTS = (todoLists: ITodoList[]): SetTodoListsAT => {
  return {
    type: SET_TODOLIST_TYPE,
    data: {
      todoLists,
    },
  };
};

export const SET_TASKS = (todoListID: string, tasks: ITask[]): SetTasksAT => {
  return {
    type: SET_TASKS_TYPE,
    data: {
      todoListID,
      tasks,
    },
  };
};

export const UPDATE_TASK = (
  todoListID: string,
  taskID: string,
  modelChanges: IUpdateDomainTask
): UpdateTaskAT => {
  return {
    type: UPDATE_TASK_TYPE,
    data: {
      todoListID,
      taskID,
      modelChanges,
    },
  };
};
