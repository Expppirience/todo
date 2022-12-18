import { ITasksState, TasksACEnum, TasksAT } from "./types";

import { TodoListsACEnum } from "../todolists/types";

const initialState: ITasksState = {};

// Reducer'
export const tasksReducer = (
  state: ITasksState = initialState,
  action: TasksAT
): ITasksState => {
  switch (action.type) {
    case TodoListsACEnum.REMOVE_TODOLIST:
      delete state[action.data.todoListID];
      return { ...state };

    case TodoListsACEnum.ADD_TODOLIST:
      return {
        ...state,
        [action.data.todoList.id]: [],
      };

    case TasksACEnum.REMOVE_TASK:
      return {
        ...state,
        [action.data.todoListId]: state[action.data.todoListId].filter(
          (task) => task.id !== action.data.taskId
        ),
      };

    case TasksACEnum.ADD_TASK:
      return {
        ...state,
        [action.data.item.todoListId]: [
          action.data.item,
          ...state[action.data.item.todoListId],
        ],
      };

    case TasksACEnum.SET_TODOLISTS:
      const copyState = { ...state };
      action.data.todoLists.forEach((tl) => (copyState[tl.id] = []));
      return copyState;

    case TasksACEnum.SET_TASKS:
      return { ...state, [action.data.todoListID]: [...action.data.tasks] };

    case TasksACEnum.UPDATE_TASK:
      console.log(state, {
        ...state,
        [action.data.todoListID]: state[action.data.todoListID].map((t) => {
          return t.id === action.data.taskID
            ? { ...t, ...action.data.modelChanges }
            : t;
        }),
      });
      return {
        ...state,
        [action.data.todoListID]: state[action.data.todoListID].map((t) => {
          return t.id === action.data.taskID
            ? { ...t, ...action.data.modelChanges }
            : t;
        }),
      };

    default:
      return state;
  }
};
