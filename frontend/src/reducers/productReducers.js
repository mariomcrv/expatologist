// the reducer takes in two things, initialState and an action
// based on the action we decided what to do, either a function or a payload
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

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

// we need to add this to the store
// no need to delcate the export default
// we already did it when we declared the function above, check line 4
// IMPORTANT. Remember import the reducers in the store.js
