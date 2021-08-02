import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Alert, Spinner, ListGroup, Row, Image, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>Appointments</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>COMPLETE</th>
              <th>DETAILS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
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
                                 <Col md={4}>{item.name}</Col>
                                 <Col md={4}>{item.date}</Col>
                                 <Col md={2}>{item.time}</Col>
                                 {/* <Col md={2}>€{item.price}</Col> */}
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
    </>
  )
}

export default OrderListScreen