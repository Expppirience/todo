import React, {FC} from "react";
import {TaskType} from "./types";
import {TaskFilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableElement} from "./EditableElement";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


// ? Types
interface TodoListProps {
  id: string;
  title: string;
  number?: number;
  tasks: TaskType[];
  filter: TaskFilterType;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: TaskFilterType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (id: string, todoListId: string) => void;
  removeTodoList: (todoListId: string) => void;
  changeTaskTitle: (title: string, taskId: string, todoListId: string) => void;
  changeTodoListName: (title: string, todoListId: string) => void;
}


export const TodoList: FC<TodoListProps> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeStatus,
        filter,
        id,
        removeTodoList,
        changeTaskTitle,
        changeTodoListName
    }
) => {

    // ? Utils

    const removeClickHandler = () => {
        removeTodoList(id)
    }

    const addItem = (title: string) => {
        addTask(title, id)
    }

    const editTitleName = (title: string) => {
        changeTodoListName(title, id)
    }


    // ? Return
    return (
        <div>
            <h3>
                <EditableElement title={title} onChange={editTitleName}/>
                <IconButton onClick={removeClickHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItemCallback={addItem}/>
            <ul>
                {tasks.map((task) => {
                    const editTaskText = (text: string) => {
                        changeTaskTitle(text, task.id, id)
                    }
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <Checkbox color={'success'} checked={task.isDone}
                                      onChange={() => changeStatus(task.id, id)}/>
                            <EditableElement title={task.title} onChange={editTaskText}/>
                            <IconButton onClick={() => removeTask(task.id, id)}>
                                <Delete/>
                            </IconButton>
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button
                    variant={filter === 'all' ? 'contained' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilter('all', id)}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'contained' : 'text'}
                    color={'success'}
                    onClick={() => changeFilter('active', id)}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'contained' : 'text'}
                    color={'error'}
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => changeFilter('completed', id)}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
};

