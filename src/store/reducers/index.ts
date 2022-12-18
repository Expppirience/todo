import { todoListsReducer } from "./todolists/todoListsReducer";
import { tasksReducer } from "./tasks/tasksReducer";
import { authReducer } from "./auth/authReducer";
import { appReducer } from "./app/appReducer";

export const reducers = {
  tasks: tasksReducer,
  todoLists: todoListsReducer,
  app: appReducer,
  auth: authReducer,
};
