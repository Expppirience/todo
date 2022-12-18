import { ThunkAction } from "redux-thunk";
import { TodoListsAT } from "./reducers/todolists/types";
import { TasksAT } from "./reducers/tasks/types";
import { AppAT } from "./reducers/app/types";
import { AuthAT } from "./reducers/auth/types";

class AppStateType {}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AppActionTypes
>;
export type AppActionTypes = TodoListsAT | TasksAT | AppAT | AuthAT;
