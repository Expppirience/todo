import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasksReducer";
import {todoListsReducer} from "./todoListsReducer";

export type AppStoreType = typeof store
export type AppStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
})

export const store = createStore(rootReducer)

