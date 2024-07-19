import { combineReducers } from "redux";
import authReducer from "./isLoggedIn";

const rootReducer = combineReducers({
  isAuthenticate: authReducer,
});

export default rootReducer;
