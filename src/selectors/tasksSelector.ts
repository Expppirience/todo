import { AppStateType } from "../store/store";

export const tasksSelector = (state: AppStateType) => state.tasks;