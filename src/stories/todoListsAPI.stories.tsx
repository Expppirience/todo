import React, {useEffect, useState} from 'react'
import {todoListsAPI} from "../API/todoListsAPI";

export default {
   title: "TodoLists API"
}


export const GetTodoLists = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
      todoListsAPI.getTodoLists()
         .then((response) => {
            console.log('IN GET settings state', response)
            setState(response.data)
         })
   }, [])

   return (<div>Current state: {JSON.stringify(state)}</div>)
}

export const CreateTodoList = () => {
   const [state, setState] = useState<any>(null);

   useEffect(() => {
   const payload = { title: "title placeholder" };
      todoListsAPI.createTodoList(payload)
         .then((response) => {
            console.log('IN POST settings state', response)
            setState(response.data)
         })
   }, [])

   return (<div>Current state: {JSON.stringify(state)}</div>)
}

export const DeleteTodoList = () => {
   const [state, setState] = useState<any>(null);
   const todoListID = "77e060b6-b0aa-4374-b65c-0e1e9c09dc78"
   useEffect(() => {
      todoListsAPI.deleteTodoList(todoListID)
         .then((response) => {
            console.log('IN DELETE settings state', response)
            setState(response.data)
         })
   }, [])
   return (<div>Current state: {JSON.stringify(state)}</div>)
}

export const UpdateTodoList = () => {
   const [state, setState] = useState<any>(null);
   useEffect(() => {
   const payload = { title: "AGKJHGWHJKNWGABKJNLWGAKJLNB" };
      todoListsAPI.updateTodoList("FWAFAWFAWFAW", payload)
         .then((response) => {
            console.log('IN PUT settings state', response)
            setState(response.data)
         })
   }, [])

   return (<div>Current state: {JSON.stringify(state)}</div>)
}


export const GetTasks = () => {
   const [state, setState] = useState<any>(null);
   const todoListID = 'abfdf18d-07c6-4139-9e3e-a2224eaade88'

   useEffect(() => {
      todoListsAPI.getTasks(todoListID)
         .then(({data}) => {
            console.log('IN GET TASKS', data)
            setState(data.items)
         })
   }, []);

   return (<div>Current State: {JSON.stringify(state)}</div>)
}

export const DeleteTask = () => {
   const [state, setState] = useState<any>(null);
   const todoListID = '2b467c96-aaee-4153-9615-ddea08321b87'
   const taskID = '2b467c96-aaee-4153-9615-ddea08321b87'

   useEffect(() => {
      todoListsAPI.deleteTask(todoListID, taskID)
         .then(({data}) => {
            console.log('IN DELETE TASKS', data)
            setState(data)
         })
   }, []);
   return (<div>Current State: {JSON.stringify(state)}</div>)
}

export const CreateTask = () => {
   const [state, setState] = useState<any>(null);
   const todoListID = 'abfdf18d-07c6-4139-9e3e-a2224eaade88'

   useEffect(() => {
   const payload = { title: "title placeholder" };
      todoListsAPI.createTask(todoListID, payload)
         .then(({data}) => {
            console.log('IN CREATE TASKS', data)
            setState(data)
         })
   }, []);

   return (<div>Current State: {JSON.stringify(state)}</div>)
}

export const UpdateTask = () => {
   const [state, setState] = useState<any>(null);
   const todoListID = 'abfdf18d-07c6-4139-9e3e-a2224eaade88'
   const taskID = 'abfdf18d-07c6-4139-9e3e-a2224eaade88'
   useEffect(() => {
   const payload = { title: "new title placeholder" };
      todoListsAPI.updateTask(todoListID, taskID, payload)
         .then(({data}) => {
            console.log('IN UPDATE TASKS', data)
            setState(data)
         })
   }, []);

   return (<div>Current State: {JSON.stringify(state)}</div>)
}