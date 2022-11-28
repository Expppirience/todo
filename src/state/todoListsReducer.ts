// Types


import {TodoListType} from "../App";
import {v1} from "uuid";
import {
    ADD_TODOLIST_TYPE,
    AddTodolistActionType, CHANGE_TODOLIST_FILTER_TYPE, CHANGE_TODOLIST_TITLE_TYPE,
    ChangeTodoListFilterActionType,
    ChangeTodolistTitleActionType, REMOVE_TODOLIST_TYPE,
    RemoveTodoListActionType
} from "./actionTypes";
import {TodoListsType} from "../AppWithRedux";


type ActionType =
    RemoveTodoListActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodoListFilterActionType

// ==============================================================

export const todoListId1 = v1()
export const todoListId2 = v1()


const initialState: TodoListsType[] = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'}
]


// Reducer
export const todoListsReducer = (state: TodoListType[] = initialState, action: ActionType): TodoListType[] => {
    switch (action.type) {
        case REMOVE_TODOLIST_TYPE:
            return state.filter((todoList) => todoList.id !== action.data.todoListId)
        case ADD_TODOLIST_TYPE:
            const newTodoList: TodoListType = {id: action.data.id, title: action.data.title, filter: 'all'}
            return [newTodoList, ...state]
        case CHANGE_TODOLIST_TITLE_TYPE:
            return state.map((tl) => tl.id === action.data.id ? {...tl, title: action.data.title} : {...tl})
        case CHANGE_TODOLIST_FILTER_TYPE:
            return state.map((tl) => tl.id === action.data.id ? {...tl, filter: action.data.filter} : {...tl})
        default:
            return state
    }
}