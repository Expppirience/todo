import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginRequestTC, logoutRequestTC } from "../../thunks/authThunks";

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
  extraReducers: (builder) => {
    builder.addCase(loginRequestTC.fulfilled, (draft, action) => {
      draft.isAuth = true;
    });
    builder.addCase(logoutRequestTC.fulfilled, (draft, action) => {
      draft.isAuth = false;
    });
  },
});

export const authReducer = authSlice.reducer;
export const AuthAC = authSlice.actions;
