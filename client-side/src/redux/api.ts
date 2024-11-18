import { curame_axios } from "../helper/axios";
import { LoginPayload, RegisterPayload } from "./types";

export const authenticateAPI = (user: LoginPayload) => {
  curame_axios("auth/authenticate", "POST", user, null);
};

export const registerAPI = (user: RegisterPayload) => {
  curame_axios("auth/register", "POST", user, null);
};
