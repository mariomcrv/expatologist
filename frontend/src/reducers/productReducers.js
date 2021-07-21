// the reducer takes in two things, initialState and an action
// based on the action we decided what to do, either a function or a payload
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";

// -- THERAPIST LIST REDUCER --

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }; // when we make the request, we let know the component that we are loading data and return an empty array
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }; // when we get the response back, laoding is false because we are done and put the payload in the action object
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }; // if fail, we return loading false and the error in the payload
    default:
      return state; // default case, just return the state
  }
};

// -- THERAPIST DETAILS REDUCER --

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }; // whatever is in the state, will be spreaded, same as sending an empty object 
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }; 
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state; // default case, just return the state
  }
};

// we need to add this to the store
// no need to declare the export default
// we already did it when we declared the function above, check line 4
// IMPORTANT. Remember import the reducers in the store.js
