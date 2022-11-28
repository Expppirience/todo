// Types


import {AllTasksType} from "../App";
import {v1} from "uuid";
import {
    ADD_TASK_TYPE, ADD_TODOLIST_TYPE,
    AddTaskActionType,
    AddTodolistActionType,
    CHANGE_TASK_STATUS_TYPE,
    CHANGE_TASK_TITLE_TYPE,
    ChangeTaskStatusActionType,
    ChangeTaskTitleActionType,
    REMOVE_TASK_TYPE, REMOVE_TODOLIST_TYPE,
    RemoveTaskActionType,
    RemoveTodoListActionType
} from "./actionTypes";
import {todoListId1, todoListId2} from "./todoListsReducer";


type ActionType =
    RemoveTodoListActionType
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType

// ==============================================================

const initialState: AllTasksType = {
    [todoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ],
    [todoListId2]: [
        {id: v1(), title: "Grooming", isDone: true},
        {id: v1(), title: "Pet shop", isDone: false},
        {id: v1(), title: "Nails", isDone: true},
    ]
}


// Reducer'
export const tasksReducer = (state: AllTasksType = initialState, action: ActionType): AllTasksType => {
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
                        isDone: !tl.isDone
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
            return {
                ...state,
                [action.data.id]: []
            }
        default:
            return state
    }
}

