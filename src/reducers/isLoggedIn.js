// authReducer.js

// Define your initial authentication state
const initialState = {
  user: null, // null when no user is authenticated
  isAuthenticated: false, // indicates whether a user is authenticated
  loading: false, // indicates whether authentication-related actions are in progress
  error: null, // holds any authentication-related errors
};

// Define action types (constants)
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

// Create the authentication reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload, // Update user with the authenticated user data
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload, // Store any login failure error message
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
