import { TaskPriorities, TaskStatuses } from "../../API/todoListsAPI";
import { applyMiddleware, combineReducers, createStore } from "redux";

import { AppStateType } from "../../store/store";
import { Provider } from "react-redux";
import { appReducer } from "./../../store/reducers/app/appReducer";
import { tasksReducer } from "../../store/reducers/tasksReducer";
import thunk from "redux-thunk";
import { todoListsReducer } from "../../store/reducers/todoListsReducer";
import { v1 } from "uuid";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
  app: appReducer,
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
    status: "idle",
    init: false,
  },
  auth: {
    isAuth: false,
  },
};
const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppStateType,
  applyMiddleware(thunk)
);

export const ReduxStoreDecorator = (story: any) => {
  return <Provider store={storyBookStore}>{story()}</Provider>;
};
