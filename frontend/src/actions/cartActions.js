import axios from "axios"; // we make a call to our apis Mario
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (id, date, time) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      date,
      time,
    },
  });

  
// we need to patse the object into a string because we can only keep strings in local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
