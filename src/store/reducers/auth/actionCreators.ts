import { AuthACEnum, ISetIsAuthAC } from "./types";

export const AuthAC = {
  setIsAuth: (value: boolean): ISetIsAuthAC => {
    return {
      type: AuthACEnum.SET_IS_AUTH,
      data: {
        value,
      },
    };
  },
};
