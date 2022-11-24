// Types


import {TodoListsType} from "../App";
import {v1} from "uuid";
import {
    ADD_TODOLIST_TYPE,
    AddTodolistActionType, CHANGE_TODOLIST_FILTER_TYPE, CHANGE_TODOLIST_TITLE_TYPE,
    ChangeTodoListFilterActionType,
    ChangeTodolistTitleActionType, REMOVE_TODOLIST_TYPE,
    RemoveTodoListActionType
} from "./actionTypes";


type ActionType =
    RemoveTodoListActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodoListFilterActionType

// ==============================================================


// Reducer
export const todoListsReducer = (state: TodoListsType[], action: ActionType): TodoListsType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST_TYPE:
            return state.filter((todoList) => todoList.id !== action.data.todoListId)
        case ADD_TODOLIST_TYPE:
            const newTodoList: TodoListsType = {id: v1(), title: action.data.title, filter: 'all'}
            return [...state, newTodoList]
        case CHANGE_TODOLIST_TITLE_TYPE:
            return state.map((tl) => tl.id === action.data.id ? {...tl, title: action.data.title} : {...tl})
        case CHANGE_TODOLIST_FILTER_TYPE:
            return state.map((tl) => tl.id === action.data.id ? {...tl, filter: action.data.filter} : {...tl})
        default:
            return [...state]
    }
}