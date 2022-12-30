import { TaskPriorities, TaskStatuses } from "../../API/todoListsAPI";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { AppStateType } from "../../store/store";
import { Provider } from "react-redux";
import { RootReducerType } from "../../store/types";
import { appReducer } from "./../../store/reducers/app/appReducer";
import { authReducer } from "../../store/reducers/auth/authReducer";
import { combineReducers } from "redux";
import { tasksReducer } from "../../store/reducers/tasks/tasksReducer";
import thunk from "redux-thunk";
import { todoListsReducer } from "../../store/reducers/todolists/todoListsReducer";
import { v1 } from "uuid";

const rootReducer: RootReducerType = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
  app: appReducer,
  auth: authReducer,
});

const initialGlobalState: AppStateType = {
  todoLists: [
    {
      id: "1",
      title: "placeholder 1",
      filter: "all",
      addedDate: "",
      order: 1,
      entityStatus: "idle",
    },
    {
      id: "2",
      title: "placeholder 2",
      filter: "all",
      addedDate: "",
      order: 2,
      entityStatus: "idle",
    },
  ],
  tasks: {
    "1": [
      {
        id: v1(),
        title: "placeholder",
        priority: TaskPriorities.hi,
        order: 0,
        startDate: "",
        addedDate: "",
        todoListId: "1",
        description: "",
        status: TaskStatuses.completed,
        deadline: "",
      },
      {
        id: v1(),
        title: "placeholder",
        priority: TaskPriorities.hi,
        order: 0,
        startDate: "",
        addedDate: "",
        todoListId: "1",
        description: "",
        status: TaskStatuses.completed,
        deadline: "",
      },
      {
        id: v1(),
        title: "placeholder",
        priority: TaskPriorities.hi,
        order: 0,
        startDate: "",
        addedDate: "",
        todoListId: "1",
        description: "",
        status: TaskStatuses.completed,
        deadline: "",
      },
    ],
    "2": [
      {
        id: v1(),
        title: "placeholder",
        priority: TaskPriorities.hi,
        order: 0,
        startDate: "",
        addedDate: "",
        todoListId: "2",
        description: "",
        status: TaskStatuses.completed,
        deadline: "",
      },
      {
        id: v1(),
        title: "placeholder",
        priority: TaskPriorities.hi,
        order: 0,
        startDate: "",
        addedDate: "",
        todoListId: "2",
        description: "",
        status: TaskStatuses.completed,
        deadline: "",
      },
      {
        id: v1(),
        title: "placeholder",
        priority: TaskPriorities.hi,
        order: 0,
        startDate: "",
        addedDate: "",
        todoListId: "2",
        description: "",
        status: TaskStatuses.completed,
        deadline: "",
      },
    ],
  },
  app: {
    error: null,
    status: "succeeded",
    init: true,
  },
  auth: {
    isAuth: true,
  },
};
// const storyBookStore = createStore(
//   rootReducer,
//   initialGlobalState as AppStateType,
//   applyMiddleware(thunk)
// );

const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
});

export const ReduxStoreDecorator = (story: any) => {
  return <Provider store={storyBookStore}>{story()}</Provider>;
};
