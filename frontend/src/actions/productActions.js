// in this file we set all the actions related to
// the reducers, the pattern would be something like this...
// constants, reducer, action, and component

// we need axios to call the api
import axios from "axios";

// just like we did in the product reducer, we bring the contants
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from "../constants/productConstants";
import { logout } from "./userActions";

// we need to export the actions
// this action is going to do what we did in the home screen component, fetch information about the therapitst form the api
// reducers are functions and the actions are the actual magic ACTIONS!
// redux-thunk allows us to create functions within functions,
// check how after the first arrow we can add an async function.
// dispatch is how we will dispatch the actions above

// -- THERAPIST LIST ACTION --

export const listProducts =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST }); // we pass an object and the type is the request, check the reducer file to see what it does

      const { data } = await axios.get(`/api/products?keyword=${keyword}`); // this call should give me the data

      // at this moment we dispatch the data with an object, once the data is loaded
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });

      // on error. We send an object back, the payload is the error message
      // since I have custom error handling, I will send back the custom message
      // on the other hand, send the actual error message
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// -- THERAPIST DETAILS ACTION

export const listProductDetails = (id) => async (dispatch) => {
  // when this action is called, it takes an id as a parameter
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST }); // we pass an object and the type is the request, check the reducer file to see what it does

    const { data } = await axios.get(`/api/products/${id}`); // this call should give me the data

    // at this moment we dispatch the data with an object, once the data is loaded
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });

    // on error. We send an object back, the payload is the error message
    // since I have custom error handling, I will send back the custom message
    // on the other hand, send the actual error message
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// delete product action

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// create counsellor action
export const createProduct = () => async (dispatch, getState) => {
  // does not take anything as we will create something
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// update counsellor action
// we pass the product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data }) // this reloads the information in the form
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
