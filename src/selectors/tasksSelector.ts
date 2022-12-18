import { AppStateType } from "../store/store";

export const tasksSelector = (todoListID: string) => {
  return (state: AppStateType) => state.tasks[todoListID];
};
// export const tasksSelector = (state: AppStateType) => state.tasks;
