import { combineReducers } from "redux";
import authReducer from "../redux/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
