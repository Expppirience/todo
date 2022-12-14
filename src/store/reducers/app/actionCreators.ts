import {
  AppACEnum,
  AppStatusesType,
  ISetAppErrorAC,
  ISetAppStatusAC,
} from "./types";

export const AppAC = {
  setError: (error: string | null): ISetAppErrorAC => {
    return {
      type: AppACEnum.SET_ERROR,
      data: {
        error,
      },
    };
  },
  setStatus: (status: AppStatusesType): ISetAppStatusAC => {
    return {
      type: AppACEnum.SET_STATUS,
      data: {
        status,
      },
    };
  },
};
