// Thi is the order
// create store allows us to as it says, create the store
// combineReduces, if we have many reducers handling peaces of functionality, this combines them
// applyMiddleware, this allows us to use middleware like thunk
// composeWithDevTools, necessary to use the chrome extension

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
}); // here we pass our reducers, check it is formatted as an object

const initialState = {}; // what is loaded from the beginning

const middleware = [thunk]; // at the moment, thunk is the middleware I will use

// store takes three arguments, the reducer, initialState and composewithDevTools
// composeWithDevTools takes the applyMiddleware module and accepts an array of middleware using the spread operator
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // we do not need brakets because we are spreading the array
);

export default store;

// make sure for every reducer, there is an action
