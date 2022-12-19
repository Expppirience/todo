import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import thunkMiddleware from "redux-thunk";

export type AppStoreType = typeof store;
export type AppStateType = ReturnType<typeof rootReducer>;

// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const rootReducer = combineReducers(reducers);
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(thunkMiddleware);
  },
});

// @ts-ignore
window.store = store;
