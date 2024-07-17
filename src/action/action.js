import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../reducers/isLoggedIn";

// Action creator for successful login
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user, // User data received after successful login
});

// Action creator for login failure
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error, // Error message for login failure
});

// Action creator for successful logout
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
