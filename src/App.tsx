import React, {useState} from "react";
import "./App.css";
import {TodoList} from "./TodoList";
import {ITaskDomain, ITodoListDomain} from "./models/models";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography,} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskPriorities, TaskStatuses} from "./API/todoListsAPI";

// Types

export interface TodoListType {
  id: string;
  title: string;
  filter: TaskFilterType;
}

export type TaskFilterType = "all" | "active" | "completed";

export interface AllTasksType {
  [key: string]: ITaskDomain[];
}

// ? Data
let todoListId1 = v1();
let todoListId2 = v1();

const initAllTasks: AllTasksType = {
  [todoListId1]: [
    {
      id: v1(),
      title: "HTML&CSS",
      status: TaskStatuses.completed,
      todoListId: todoListId1,
      addedDate: "",
      order: 0,
      startDate: "",
      description: "",
      deadline: "",
      priority: TaskPriorities.low,
    },
    {
      id: v1(),
      title: "HTML&CSS",
      status: TaskStatuses.completed,
      todoListId: todoListId1,
      addedDate: "",
      description: "",
      order: 0,
      startDate: "",
      deadline: "",
      priority: TaskPriorities.low,
    },
  ],
  [todoListId2]: [
    {
      id: v1(),
      title: "HTML&CSS",
      status: TaskStatuses.completed,
      todoListId: todoListId1,
      addedDate: "",
      description: "",
      order: 0,
      startDate: "",
      deadline: "",
      priority: TaskPriorities.low,
    },
    {
      id: v1(),
      title: "HTML&CSS",
      status: TaskStatuses.completed,
      todoListId: todoListId1,
      addedDate: "",
      order: 0,
      description: "",
      startDate: "",
      deadline: "",
      priority: TaskPriorities.low,
    },
  ],
};

const initTodoLists: ITodoListDomain[] = [
  {
    id: todoListId1,
    title: "What to learn",
    filter: "all",
    addedDate: "",
    order: 0,
  },
  {
    id: todoListId2,
    title: "What to buy",
    filter: "all",
    addedDate: "",
    order: 0,
  },
];

// Component
function App() {
  // ? States
  const [todoLists, setTodoLists] = useState<TodoListType[]>(initTodoLists);
  const [allTasks, setAllTasks] = useState<AllTasksType>(initAllTasks);

  // ? Utils
  const removeTask = (id: string, todoListId: string): void => {
    const tasks = allTasks[todoListId];
    allTasks[todoListId] = tasks.filter((task) => task.id !== id);
    setAllTasks({ ...allTasks });
  };
  const addTask = (title: string, todoListId: string): void => {
    const task = {
      id: v1(),
      title: title,
      status: TaskStatuses.completed,
      todoListId: todoListId,
      addedDate: "",
      order: 0,
      description: "",
      startDate: "",
      deadline: "",
      priority: TaskPriorities.low,
    };
    allTasks[todoListId] = [task, ...allTasks[todoListId]];
    setAllTasks({ ...allTasks });
  };

  const changeFilter = (value: TaskFilterType, todoListId: string) => {
    const todoList = todoLists.find((todoList) => todoList.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  const changeStatus = (id: string, todoListId: string) => {
    const tasks = allTasks[todoListId];
    const task = tasks.find((task) => task.id === id);
    if (task) {
      task.status = TaskStatuses.completed;
      setAllTasks({ ...allTasks });
    }
  };

  const removeTodoList = (todoListId: string) => {
    const filteredTodoLists = todoLists.filter(
      (todoList) => todoList.id !== todoListId
    );
    setTodoLists(filteredTodoLists);
    delete allTasks[todoListId];
    setAllTasks({ ...allTasks });
  };

  const filterTasks = (
    tasks: ITaskDomain[],
    filter: TaskFilterType
  ): ITaskDomain[] => {
    if (filter === "all") return tasks;
    return tasks.filter((task) =>
      filter === "active"
        ? task.status === TaskStatuses.inProgress
        : task.status === TaskStatuses.completed
    );
  };

  const addTodoListItem = (title: string) => {
    const newTodoList: TodoListType = { id: v1(), title, filter: "all" };
    setTodoLists([newTodoList, ...todoLists]);
    setAllTasks({
      ...allTasks,
      [newTodoList.id]: [],
    });
  };

  const changeTaskTitle = (
    title: string,
    taskId: string,
    todoListId: string
  ) => {
    const tasks = allTasks[todoListId];
    const taskToChange = tasks.find((task) => task.id === taskId);
    if (taskToChange) {
      taskToChange.title = title;
      setAllTasks({ ...allTasks });
    }
  };

  const changeTodoListName = (title: string, todoListId: string) => {
    const todoList = todoLists.find((tl) => tl.id === todoListId);

    if (todoList) {
      todoList.title = title;
      setTodoLists([...todoLists]);
    }
  };

  // ? Return
  return (
    <div className="App">
      <AppBar position={"static"}>
        <Toolbar>
          <IconButton edge={"start"} color="inherit" aria-label={"menu"}>
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "10px" }}>
          <div>
            <Typography variant={"h5"}>Add new task</Typography>
            <AddItemForm addItemCallback={addTodoListItem} />
          </div>
        </Grid>
        <Grid container spacing={4}>
          {todoLists.map((todoList) => {
            const filteredTasks = filterTasks(
              allTasks[todoList.id],
              todoList.filter
            );

            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <TodoList
                    key={todoList.id}
                    id={todoList.id}
                    title={todoList.title}
                    changeFilter={changeFilter}
                    filter={todoList.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListName={changeTodoListName}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
