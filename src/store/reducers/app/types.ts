export type AppStatusesType = "idle" | "loading" | "succeeded" | "failed";
export interface IAppState {
  status: AppStatusesType;
  error: string | null;
  init: boolean;
}

export enum AppACEnum {
  SET_STATUS = "SET_STATUS",
  SET_ERROR = "SET_ERROR",
  SET_INIT = "SET_INIT",
}

export interface ISetAppStatusAC {
  type: AppACEnum.SET_STATUS;
  data: {
    status: AppStatusesType;
  };
}

export interface ISetAppErrorAC {
  type: AppACEnum.SET_ERROR;
  data: {
    error: string | null;
  };
}

export interface ISetInitAC {
  type: AppACEnum.SET_INIT;
  data: {
    init: boolean;
  };
}

export type AppAT = ISetAppErrorAC | ISetAppStatusAC | ISetInitAC;
