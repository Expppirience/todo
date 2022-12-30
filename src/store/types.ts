import { AppAT } from "./reducers/app/types";
import { AuthAT } from "./reducers/auth/types";
import { TasksAT } from "./reducers/tasks/types";
import { ThunkAction } from "redux-thunk";
import { TodoListsAT } from "./reducers/todolists/types";
import { rootReducer } from "./store";

class AppStateType {}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AppActionTypes
>;
export type AppActionTypes = TodoListsAT | TasksAT | AppAT | AuthAT;
export type RootReducerType = typeof rootReducer;
