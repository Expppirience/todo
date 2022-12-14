import { ITask, ITodoList } from "./../API/todoListsAPI";

import { AppStatusesType } from "../store/reducers/app/types";
import { TaskFilterType } from "../App";

export interface ITodoListDomain extends ITodoList {
  filter: TaskFilterType;
  entityStatus: AppStatusesType;
}

export interface ITaskDomain extends ITask {}
