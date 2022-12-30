import { AppStatusesType, IAppState } from "./types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { initAppTC } from "./../../thunks/appThunks";

const initialState: IAppState = {
  status: "idle",
  error: null,
  init: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setStatus(state, action: PayloadAction<{ status: AppStatusesType }>) {
      state.status = action.payload.status;
    },
    setInit(state, action: PayloadAction<{ init: boolean }>) {
      state.init = action.payload.init;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initAppTC.fulfilled, (draft, action) => {
      console.log("in builder");
      draft.init = true;
    });
  },
});

export const appReducer = appSlice.reducer;
export const AppAC = appSlice.actions;
