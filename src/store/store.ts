import {AnyAction, applyMiddleware, combineReducers, createStore,} from "redux";
import {TasksAT, tasksReducer} from "./reducers/tasksReducer";
import {TodoListsAT, todoListsReducer} from "./reducers/todoListsReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import { appReducer } from './reducers/app/appReducer';
import { authReducer } from './reducers/auth/authReducer';
import { AppAT } from "./reducers/app/types";
import { AuthAT } from "./reducers/auth/types";

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppStoreType = typeof store;
export type AppStateType = ReturnType<typeof rootReducer>;
export type AppActionTypes = TodoListsAT | TasksAT | AppAT | AuthAT

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todoLists: todoListsReducer,
   app: appReducer,
   auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type ThunkAppDispatchType = ThunkDispatch<AppStateType, any, AnyAction>;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
export const useAppDispatch = useDispatch<ThunkAppDispatchType>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
   AppStateType,
   unknown,
   AppActionTypes>;

// @ts-ignore
window.store = store;

