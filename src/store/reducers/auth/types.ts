export enum AuthACEnum {
  SET_IS_AUTH = "SET_IS_AUTH",
}

export interface ISetIsAuthAC1 {
  type: AuthACEnum.SET_IS_AUTH;
  data: {
    value: boolean;
  };
}

export type AuthAT = ISetIsAuthAC1;
