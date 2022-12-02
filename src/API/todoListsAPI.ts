import {baseRequests} from "./index";

// Types
interface ITodoListPayload {
   title: string
}

interface ITaskCreatePayload {
   title: string
}

interface ITaskPutPayload {
   title: string,
   description: string,
   priority: number,

}

interface ITodoList {
   id: string,
   title: string,
   addedDate: Date,
   order: number
}

interface ITask {
   description: string,
   title: string,
   status: number,
   priority: number,
   startDate: string,
   deadline: string,
   id: string,
   todoListId: string,
   order: number,
   addedDate: string,
}

interface IResponse<D = {}> {
   resultCode: number,
   messages: string[],
   data: D
}

interface ITasksResponse {
   items: ITask[]
   totalCount: number,
   error: null | string,
}


// Methods

// TodoLists
const getTodoLists = () => {
   return baseRequests.get<ITodoList[]>('/todo-lists')
}

const createTodoList = (payload: ITodoListPayload) => {
   return baseRequests.post<IResponse<{ item: ITodoList }>>('/todo-lists', payload)
}

const deleteTodoList = (todoListID: string) => {
   return baseRequests.delete<IResponse>(`/todo-lists/${todoListID}`)
}

const updateTodoList = (todoListID: string, payload: ITodoListPayload) => {
   return baseRequests.put<IResponse>(`/todo-lists/${todoListID}`, payload)
}

// Tasks

const getTasks = (todoListID: string) => {
   return baseRequests.get<ITasksResponse>(`/todo-lists/${todoListID}/tasks`)
}

const createTask = (todoListID: string, payload: ITaskCreatePayload) => {
   return baseRequests.post<IResponse<{ item: ITask }>>(`/todo-lists/${todoListID}/tasks/`, payload)
}

const deleteTask = (todoListID: string, taskID: string) => {
   return baseRequests.delete<IResponse>(`/todo-lists/${todoListID}/tasks${taskID}`)
}

const updateTask = (todoListID: string, taskID: string, payload: ITaskCreatePayload) => {
   return baseRequests.put<IResponse>(`/todo-lists/${todoListID}/tasks/${taskID}`, payload)
}

// Object
export const todoListsAPI = {
   getTodoLists, deleteTodoList, createTodoList, updateTodoList, getTasks, deleteTask, createTask, updateTask
}