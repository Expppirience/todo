import { ComponentStory } from "@storybook/react";
import AppWithRedux from "../../AppWithRedux";
import { Provider } from "react-redux";
import { AppStateType } from "../../state/store";
import { combineReducers, createStore } from "redux";
import { todoListsReducer } from "../../state/todoListsReducer";
import { tasksReducer } from "../../state/tasksReducer";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "../../API/todoListsAPI";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
});

const initialGlobalState: AppStateType = {
  todoLists: [
    { id: "1", title: "placeholder 1", filter: "all" },
    { id: "2", title: "placeholder 2", filter: "all" },
  ],
  tasks: {
    ["1"]: [
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
    ["2"]: [
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
};
const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppStateType
);

type StoryType = ComponentStory<typeof AppWithRedux>;
export const ReduxStoreDecorator = (story: any) => {
  return <Provider store={storyBookStore}>{story()}</Provider>;
};
