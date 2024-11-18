import { call, put, takeLatest } from "redux-saga/effects";
import {
  authenticateRequest,
  authenticateSuccess,
  authenticateFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./actions";
import { authenticateAPI, registerAPI } from "./api";
import { SagaIterator } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, RegisterPayload } from "./types";

function* authenticateSaga(action: PayloadAction<LoginPayload>): SagaIterator {
  try {
    const user = yield call(authenticateAPI, action.payload);
    yield put(authenticateSuccess(user));
  } catch (error: Error | any) {
    yield put(
      authenticateFailure(
        error?.message ? error.message : "An unknown error occurred"
      )
    );
  }
}

function* registerSaga(action: PayloadAction<RegisterPayload>): SagaIterator {
  try {
    const user = yield call(registerAPI, action.payload);
    yield put(registerSuccess({ user, message: "" }));
  } catch (error: Error | any) {
    yield put(
      registerFailure(
        error?.message ? error.message : "An unknown error occurred"
      )
    );
  }
}

export function* watchAuthSagas() {
  yield takeLatest(authenticateRequest.type, authenticateSaga);
  yield takeLatest(registerRequest.type, registerSaga);
}
