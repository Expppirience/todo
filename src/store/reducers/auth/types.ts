export interface IAuthState {
  isAuth: boolean;
}

export enum AuthACEnum {
  SET_IS_AUTH = "SET_IS_AUTH",
}

export interface ISetIsAuthAC {
  type: AuthACEnum.SET_IS_AUTH;
  data: {
    value: boolean;
  };
}

export type AuthAT = ISetIsAuthAC;
