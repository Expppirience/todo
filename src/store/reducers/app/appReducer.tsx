import { AppACEnum, AppAT, IAppState } from "./types";

const initialState: IAppState = {
  status: "idle",
  error: null,
};

export const appReducer = (state: IAppState = initialState, action: AppAT) => {
  switch (action.type) {
    case AppACEnum.SET_ERROR:
      return { ...state, error: action.data.error };

    case AppACEnum.SET_STATUS:
      return { ...state, status: action.data.status };

    default:
      return state;
  }
};
