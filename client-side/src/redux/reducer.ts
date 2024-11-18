import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  authenticateRequest,
  authenticateSuccess,
  authenticateFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./actions";
import { StateInterface, User } from "./types";

const initialState: StateInterface = {
  loading: false,
  user: null,
  message: "",
  token: "",
  isLoggedIn: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authenticateRequest, (state) => {
      state.loading = true;
      state.isLoggedIn = false;
    })
    .addCase(authenticateSuccess, (state, action) => {
      state.loading = false;
      state.user = action.payload?.user;
      state.message = action.payload?.message;
      state.token = action.payload?.token;
      state.isLoggedIn = true;
    })
    .addCase(authenticateFailure, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.isLoggedIn = false;
    })

    .addCase(registerRequest, (state) => {
      state.loading = true;
    })
    .addCase(registerSuccess, (state, action) => {
      state.loading = false;
      state.message = action.payload?.user?.message;
    })
    .addCase(registerFailure, (state, action) => {
      state.loading = false;
      state.message = action.payload;
    });
});

export default authReducer;
