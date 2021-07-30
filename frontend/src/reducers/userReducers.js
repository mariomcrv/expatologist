import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

// -- USER LOGIN REDUCER

export const userLoginReducer = (state = {}, action) => {
  // my state here is an empty object
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }; // when we make the request, we let know the component that we are loading data and return an empty array
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }; // when we get the response back, laoding is false because we are done and put the payload in the action object
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }; // if fail, we return loading false and the error in the payload
    case USER_LOGOUT:
      return {}; // return and empty object when we logout
    default:
      return state; // default case, just return the state
  }
};

//-- USER REGISTRATION REDUCER

export const userRegisterReducer = (state = {}, action) => {
  // my state here is an empty object
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }; // when we make the request, we let know the component that we are loading data and return an empty array
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }; // when we get the response back, laoding is false because we are done and put the payload in the action object
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }; // if fail, we return loading false and the error in the payload
    default:
      return state; // default case, just return the state
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

// add this to the store
