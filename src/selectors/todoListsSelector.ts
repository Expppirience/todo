import { AppStateType } from "../store/store";

export const todoListsSelector = (state: AppStateType) => state.todoLists;