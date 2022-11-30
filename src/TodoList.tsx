import React, {FC, useCallback, useMemo} from "react";
import {TaskType} from "./types";
import {TaskFilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableElement} from "./EditableElement";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";
import {ADD_TASK, CHANGE_TASK_STATUS, CHANGE_TASK_TITLE, REMOVE_TASK} from "./state/actionCreators";
import {AllTasksType} from "./AppWithRedux";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {Task} from "./Task";


// ? Types
interface TodoListProps {
   id: string;
   title: string;
   number?: number;
   filter: TaskFilterType;
   changeFilter: (value: TaskFilterType, todoListId: string) => void;
   removeTodoList: (todoListId: string) => void;
   changeTodoListName: (title: string, todoListId: string) => void;
}


export const TodoList: FC<TodoListProps> = React.memo((
   {
      title,
      changeFilter,
      filter,
      id,
      removeTodoList,
      changeTodoListName
   }
) => {

   // ? Utils

   const tasks = useSelector<AppStateType, TaskType[]>((state) => state.tasks[id])
   const dispatch = useDispatch()


   const filterTasks = (tasks: TaskType[], filter: TaskFilterType): TaskType[] => {
      console.log('filtering')
      if (filter === 'all') return tasks
      return tasks.filter((task) => filter === 'active' ? !task.isDone : task.isDone)
   }

   const removeTask = useCallback((id: string, todoListId: string): void => {
      dispatch(REMOVE_TASK(todoListId, id))
   }, [dispatch])
   const addTask = useCallback((title: string, todoListId: string): void => {
      dispatch(ADD_TASK(todoListId, title))
   }, [dispatch])

   const changeStatus = useCallback((id: string, todoListId: string) => {
      dispatch(CHANGE_TASK_STATUS(todoListId, id))
   }, [dispatch])


   const changeTaskTitle = useCallback((title: string, taskId: string, todoListId: string) => {
      dispatch(CHANGE_TASK_TITLE(todoListId, taskId, title))
   }, [dispatch])

   const removeClickHandler = useCallback(() => {
      removeTodoList(id)
   }, [removeTodoList, id])

   const addItem = useCallback((title: string) => {
      addTask(title, id)
   }, [addTask, id])

   const editTitleName = (title: string) => {
      changeTodoListName(title, id)
   }
   console.log('rendering todolist')
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
            {filterTasks(tasks, filter).map((task) => {

               return (
                  <Task
                        key={task.id}
                        task={task}
                        todolistId={id}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}/>
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
});

