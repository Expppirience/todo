import { AppStateType } from "../store/store";

export const appStateSelector = (state: AppStateType) => state.app;
