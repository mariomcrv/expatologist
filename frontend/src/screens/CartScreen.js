import React, { useEffect } from "react"; // useEffect hook to track changes
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // links to move to another page
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap"; // style components
import { addToCart, removeFromCart } from "../actions/cartActions"; // actions

// rememeber Mario, here we deconstruct the props
// location allows us to extract the params in the url
// history, to redirect
const CartScreen = ({ match, location, history }) => {
  // extract the product id from the url
  const productId = match.params.id;

  // extract the date and time params from the URL
  const date = location.search
    ? location.search.split("=")[1].split("?")[0]
    : null;
  const time = location.search ? location.search.split("=")[2] : null;

  // console.log(date)
  // console.log(time)

  const dispatch = useDispatch();

  // useSelector to extract data from the state
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    // reloads data when the params change
    if (productId) {
      dispatch(addToCart(productId, date, time));
    }
  }, [dispatch, productId, date, time]);

  // remove item from cart handler
  const removeItemHandler = (id) => {
    // console.log('remove')
    dispatch(removeFromCart(id));
  };

  // checkout handler, redirect to login if not logged in, or placeorder where they can make the payment
  const checkoutHandler = () => {
    history.push("/login?redirect=placeorder");
  };

  // to render
  return (
    <Row>
      <Col md={10}>
        <h1>Bookings Cart</h1>
        {cartItems.length === 0 ? (
          <h2>Nothing here</h2>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className='text-center'>
                  <Col md={2}>{item.name}</Col>
                  <Col md={2}>{item.brand}</Col>
                  <Col md={2}>{item.category}</Col>
                  <Col md={2}>{item.date}</Col>
                  <Col md={2}>{item.time}</Col>
                  <Col md={1}>€{item.price}</Col>
                  <Col md={1}>
                    <Button
                      className='btn'
                      variant='danger'
                      size='sm'
                      onClick={() => removeItemHandler(item.product)}
                    >
                      <i className='fas fa-trash-alt'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={2}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h5>Subtotal</h5>
              <h5>
                €
                {cartItems
                  .reduce((acc, item) => acc + item.price, 0)
                  .toFixed(2)}
              </h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn'
                disabled={cartItems.length === 0 ? true : false}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
