import React, {useCallback} from "react";
import "./App.css";
import {TodoList} from "./TodoList";
import {TaskType} from "./types";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
   ADD_TASK, ADD_TODOLIST,
   CHANGE_TASK_STATUS, CHANGE_TASK_TITLE,
   CHANGE_TODOLIST_FILTER, CHANGE_TODOLIST_TITLE,
   REMOVE_TASK,
   REMOVE_TODOLIST
} from "./state/actionCreators";
import {AppStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {log} from "util";

// Types

export interface TodoListsType {
   id: string;
   title: string;
   filter: TaskFilterType
}

export type TaskFilterType = 'all' | 'active' | 'completed'

export interface AllTasksType {
   [key: string]: TaskType[]
}

// ? Data


// Component
function AppWithReducer() {

   const dispatch = useDispatch()
   const todoLists = useSelector<AppStateType, TodoListsType[]>((state) => state.todoLists)


   const removeTodoList = useCallback((todoListId: string) => {
      dispatch(REMOVE_TODOLIST(todoListId))
   }, [dispatch])

   const changeFilter = useCallback((value: TaskFilterType, todoListId: string) => {
      dispatch(CHANGE_TODOLIST_FILTER(todoListId, value))
   }, [dispatch])

   const addTodoListItem = useCallback((title: string) => {
      dispatch(ADD_TODOLIST(title))
   }, [dispatch])

   const changeTodoListName = useCallback((title: string, todoListId: string) => {
      dispatch(CHANGE_TODOLIST_TITLE(todoListId, title))
   }, [dispatch])


   // ? Return
   return (
      <div className="App">
         <AppBar position={'static'}>
            <Toolbar>
               <IconButton edge={'start'} color='inherit' aria-label={'menu'}>
                  <Menu/>
               </IconButton>
               <Typography variant='h6'>
                  News
               </Typography>
               <Button color='inherit'>Login</Button>
            </Toolbar>
         </AppBar>

         <Container fixed>
            <Grid container style={{padding: '10px'}}>
               <div>
                  <Typography variant={'h5'}>Add new task</Typography>
                  <AddItemForm addItemCallback={addTodoListItem}/>
               </div>
            </Grid>
            <Grid container spacing={4}>
               {
                  todoLists.map((todoList) => {

                     return (
                        <Grid item key={todoList.id}
                        >
                           <Paper style={{padding: '10px'}}>
                              <TodoList
                                 id={todoList.id}
                                 title={todoList.title}
                                 changeFilter={changeFilter}
                                 filter={todoList.filter}
                                 removeTodoList={removeTodoList}
                                 changeTodoListName={changeTodoListName}
                              />
                           </Paper>

                        </Grid>
                     )
                  })
               }
            </Grid>

         </Container>

      </div>
   );
}

export default AppWithReducer;
