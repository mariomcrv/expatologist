import React, { useEffect } from "react";
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
import { getOrderDetails } from "../actions/orderActions";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id; // extract the id from the url

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails); // extract infro from the state
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId)); // bring the order data
  }, []);

  return loading ? (
    <Spinner />
  ) : error ? (
    <Alert variant='danger'>{error}</Alert>
  ) : (
    <>
    <h1>Happy days!</h1>
    <h3>Your appointment is confirmed</h3>
      <p>Order: {order._id}</p>
      <p>User: {order.user.name}</p>
    </>
  );
};

export default OrderScreen;
