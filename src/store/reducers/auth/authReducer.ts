import { AuthACEnum, AuthAT, IAuthState } from "./types";

const intialState: IAuthState = {
  isAuth: false,
};

export const authReducer = (
  state: IAuthState = intialState,
  action: AuthAT
) => {
  switch (action.type) {
    case AuthACEnum.SET_IS_AUTH:
      return { ...state, isAuth: action.data.value };

    default:
      return state;
  }
};
