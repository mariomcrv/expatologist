import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
  ListGroupItem,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  // paypal sdk
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  // console.log(cart.cartItems)

  // extract information about the order, if success, everything is ok
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  // use effect, thing to do when the page loads and changes validates changes in the state and reloads when detected
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    addPayPalScript();

    if (success) {
      history.push(`/order/${order._id}`); // we move to the order id page
      dispatch({ type: ORDER_CREATE_RESET }); // this changes the status of the order and allow us to create more orders
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    // IDEA, THIS PLACEORDER HALDER MUST SUBMIT THE PAYMENT, IF SUCCESFULL, THE WE DISPATCH THE ORDER
    // TO CREATE IT ON THE DATABASE, AND THEN WE CAN STORE THE PAYMENT METHOD WITHIN THE PAYLOAD AND USE IT
    // IN THE BACKEND TO SAVE IT. THEN WE CAN REFRESH THE THE PAGE WITH THE USE EFFECT ABOVE, WHICH WILL
    // CHANGE ONCE THE ORDER IS CREATED, AND WITH THAT, WE CAN DISPLAY THE INFORMATION OF THE ORDER AND
    // CONFIRM THE PAYMENT, THIS WAY, I WONT NEED TO CREATE MORE SCREENS

    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  // CALCULATE TOTAL COST AND PRICES
  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price, 0)
    .toFixed(2);
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice)).toFixed(
    2
  );

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Bookings to pay</h2>
            {cart.cartItems.length === 0 ? (
              <Alert>Nothing here</Alert>
            ) : (
              <ListGroup variant='flush'>
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row className='text-center'>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>{item.name}</Col>
                      <Col md={3}>{item.date}</Col>
                      <Col md={2}>{item.time}</Col>
                      <Col md={2}>€{item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroup.Item className='text-center'>
            <h2>Summary</h2>
          </ListGroup.Item>
          <ListGroupItem>
            <Row>
              <Col>Price:</Col>
              <Col>€{cart.itemsPrice}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col>Tax:</Col>
              <Col>€{cart.taxPrice}</Col>
            </Row>
          </ListGroupItem>
          <ListGroupItem>
            <Row>
              <Col>Total:</Col>
              <Col>€{cart.totalPrice}</Col>
            </Row>
          </ListGroupItem>
          <ListGroup.Item>{error && <Alert>{error}</Alert>}</ListGroup.Item>
          <ListGroup.Item>
            {!sdkReady ? (
              <Spinner />
            ) : (
              <PayPalButton
                amount={cart.totalPrice}
                currency='EUR'
                onSuccess={successPaymentHandler}
              />
            )}
          </ListGroup.Item>
          {/* <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              onClick={placeOrderHandler}
            >
              Book appointment!
            </Button>
          </ListGroup.Item> */}

        </ListGroup>
      </Col>
    </Row>
  );
};

export default PlaceOrderScreen;
