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
  Container,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id; // extract the id from the url

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails); // extract info from the state
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
      <Container className='text-center'>
        <h1>Happy days!</h1>
        <h3>{order.user.name}, Your appointment is confirmed</h3>
        <p>Order: {order._id}</p>
      </Container>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Counsellor</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderScreen;
