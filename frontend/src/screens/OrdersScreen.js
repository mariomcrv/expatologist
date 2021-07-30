import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, Spinner, Alert, ListGroup, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";

const OrdersScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, history, userInfo, user]);

  return (
    <Col>
      <h2>My Bookings</h2>
      {loadingOrders ? (
        <Spinner />
      ) : errorOrders ? (
        <Alert variant='danger'>{errorOrders}</Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>€{order.totalPrice}</td>
                <td>
                  <Table>
                    <tbody>
                      <ListGroup>
                        {order.orderItems.map((item, index) => (
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
                    </tbody>
                  </Table>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Col>
  );
};

export default OrdersScreen;
