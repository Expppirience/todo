import React, {useReducer, useState} from "react";
import "./App.css";
import {TodoList} from "./TodoList";
import {TaskType} from "./types";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {todoListsReducer} from "./state/todoListsReducer";
import {tasksReducer} from "./state/tasksReducer";
import {
    ADD_TASK, ADD_TODOLIST,
    CHANGE_TASK_STATUS, CHANGE_TASK_TITLE,
    CHANGE_TODOLIST_FILTER, CHANGE_TODOLIST_TITLE,
    REMOVE_TASK,
    REMOVE_TODOLIST
} from "./state/actionCreators";

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
let todoListId1 = v1()
let todoListId2 = v1()

const initAllTasks: AllTasksType = {
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

const initTodoLists: TodoListsType[] = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'}
]

// Component
function AppWithReducer() {
    // ? States
    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, initTodoLists);
    const [allTasks, dispatchToTasks] = useReducer(tasksReducer, initAllTasks);

    // ? Utils
    const removeTask = (id: string, todoListId: string): void => {
        dispatchToTasks(REMOVE_TASK(todoListId, id))
    }
    const addTask = (title: string, todoListId: string): void => {
        dispatchToTasks(ADD_TASK(todoListId, title))
    }

    const changeFilter = (value: TaskFilterType, todoListId: string) => {
        dispatchToTodoLists(CHANGE_TODOLIST_FILTER(todoListId, value))
    }


    const changeStatus = (id: string, todoListId: string) => {
        dispatchToTasks(CHANGE_TASK_STATUS(todoListId, id))
    }

    const removeTodoList = (todoListId: string) => {
        dispatchToTodoLists(REMOVE_TODOLIST(todoListId))
        dispatchToTasks(REMOVE_TODOLIST(todoListId))
    }


    const filterTasks = (tasks: TaskType[], filter: TaskFilterType): TaskType[] => {
        if (filter === 'all') return tasks
        return tasks.filter((task) => filter === 'active' ? !task.isDone : task.isDone)
    }

    const addTodoListItem = (title: string) => {
        const action = ADD_TODOLIST(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }


    const changeTaskTitle = (title: string, taskId: string, todoListId: string) => {
        dispatchToTasks(CHANGE_TASK_TITLE(todoListId, taskId, title))
    }

    const changeTodoListName = (title: string, todoListId: string) => {
        dispatchToTodoLists(CHANGE_TODOLIST_TITLE(todoListId, title))

    }


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

                            const filteredTasks = filterTasks(allTasks[todoList.id], todoList.filter)
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
