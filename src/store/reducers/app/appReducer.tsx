import { AppACEnum, AppAT, IAppState } from "./types";

const initialState: IAppState = {
  status: "idle",
  error: null,
  init: false,
};

export const appReducer = (state: IAppState = initialState, action: AppAT) => {
  switch (action.type) {
    case AppACEnum.SET_ERROR:
      return { ...state, error: action.data.error };

    case AppACEnum.SET_STATUS:
      return { ...state, status: action.data.status };

    case AppACEnum.SET_INIT:
      return { ...state, init: action.data.init };

    default:
      return state;
  }
};
