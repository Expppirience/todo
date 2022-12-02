import {combineReducers, compose, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListsReducer} from "./todoListsReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export type AppStoreType = typeof store
export type AppStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
})

export const store = createStore(rootReducer, composeEnhancers())

// @ts-ignore
window.store = store
