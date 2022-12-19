import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<{ value: boolean }>) {
      state.isAuth = action.payload.value;
    },
  },
});

export const authReducer = authSlice.reducer;
export const AuthAC = authSlice.actions;
