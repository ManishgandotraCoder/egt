import { createAction } from "@reduxjs/toolkit";
import { adminTypes } from "./actionTypes";
import {
  LoginPayload,
  RegisterPayload,
  RegisterSuccessPayload,
  StateInterface,
} from "./types";

export const authenticateRequest = createAction<LoginPayload>(
  adminTypes.AUTHENTICATE_REQUEST
);
export const authenticateSuccess = createAction<StateInterface>(
  adminTypes.AUTHENTICATE_SUCCESS
);
export const authenticateFailure = createAction<string>(
  adminTypes.AUTHENTICATE_FAILURE
);

export const registerRequest = createAction<RegisterPayload>(
  adminTypes.REGISTER_REQUEST
);
export const registerSuccess = createAction<RegisterSuccessPayload>(
  adminTypes.REGISTER_SUCCESS
);
export const registerFailure = createAction<string>(
  adminTypes.REGISTER_FAILURE
);
