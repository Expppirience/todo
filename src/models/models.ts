import { ITask, ITodoList } from "./../API/todoListsAPI";
import { TaskFilterType } from "../AppWithRedux";

export interface ITodoListDomain extends ITodoList {
  filter: TaskFilterType;
}

export interface ITaskDomain extends ITask {}
