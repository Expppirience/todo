// Types


import {AllTasksType, TodoListsType} from "../App";
import {v1} from "uuid";
import {
    ADD_TASK_TYPE, ADD_TODOLIST_TYPE,
    AddTaskActionType,
    AddTodolistActionType,
    CHANGE_TASK_STATUS_TYPE,
    CHANGE_TASK_TITLE_TYPE,
    ChangeTaskStatusActionType,
    ChangeTaskTitleActionType,
    ChangeTodoListFilterActionType,
    ChangeTodolistTitleActionType,
    REMOVE_TASK_TYPE, REMOVE_TODOLIST_TYPE,
    RemoveTaskActionType,
    RemoveTodoListActionType
} from "./actionTypes";


type ActionType =
    RemoveTodoListActionType
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType

// ==============================================================


// Reducer
export const tasksReducer = (state: AllTasksType, action: ActionType): AllTasksType => {
    switch (action.type) {
        case REMOVE_TODOLIST_TYPE:
            delete state[action.data.todoListId]
            return {...state}
        case REMOVE_TASK_TYPE:
            return {
                ...state,
                [action.data.todoListId]:
                    state[action.data.todoListId].filter((task) => task.id !== action.data.taskId)
            }
        case ADD_TASK_TYPE:
            const newTask = {
                id: (state[action.data.todoListId].length + 1).toString(),
                title: action.data.title,
                isDone: false
            }
            return {
                ...state,
                [action.data.todoListId]: [
                    newTask, ...state[action.data.todoListId]
                ]
            }
        case CHANGE_TASK_STATUS_TYPE:
            return {
                ...state,
                [action.data.todoListId]:
                    state[action.data.todoListId].map((tl) => tl.id === action.data.taskId ? {
                        ...tl,
                        isDone: action.data.isDone
                    } : {...tl})

            }
        case CHANGE_TASK_TITLE_TYPE:
            return {
                ...state,
                [action.data.todoListId]:
                    state[action.data.todoListId].map((tl) => tl.id === action.data.taskId ? {
                        ...tl,
                        title: action.data.title
                    } : {...tl})
            }
        case ADD_TODOLIST_TYPE:
        default:
            return {...state}
    }
}

