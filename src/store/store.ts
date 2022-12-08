import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import { tasksReducer } from "./tasksReducer";
import { todoListsReducer } from "./todoListsReducer";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppStoreType = typeof store;
export type AppStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todoListsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type ThunkAppDispatchType = ThunkDispatch<AppStateType, any, AnyAction>;
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

// @ts-ignore
window.store = store;
