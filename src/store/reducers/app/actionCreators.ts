import {
  AppACEnum,
  AppStatusesType,
  ISetAppErrorAC,
  ISetAppStatusAC,
  ISetInitAC,
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
  setInit: (init: boolean): ISetInitAC => {
    return {
      type: AppACEnum.SET_INIT,
      data: {
        init,
      },
    };
  },
};
