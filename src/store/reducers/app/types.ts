export type AppStatusesType = "idle" | "loading" | "succeeded" | "failed";
export interface IAppState {
  status: AppStatusesType;
  error: string | null;
}

export enum AppACEnum {
  SET_STATUS = "SET_STATUS",
  SET_ERROR = "SET_ERROR",
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

export type AppAT = ISetAppErrorAC | ISetAppStatusAC;
