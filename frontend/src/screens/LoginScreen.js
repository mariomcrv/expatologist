import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = ({ location, history }) => {
  // component level state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin); // useSelector is what gives me access to the state, the function takes the state and we request the userLogin form the state
  const { loading, error, userInfo } = userLogin; // we defined these in the user reducer and extract it's values

  const redirect = location.search ? location.search.split("=")[1] : "/"; // this redirect function is what takes us to the next screen based on the information of the url


  // REDIRECT IF WE ARE LOGGED IN // 
  useEffect(() => {
    if (userInfo) { // if userIfo exists, go to the redirect url
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  // the e stands for event, so this is what happens when the event is triggered
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password)); // I pass my user and password info from the form
  };

  return (
    <FormContainer>
      <h1 className='text-center'>Welcome Back!</h1>
      {error && <Alert variant='danger'>{error}</Alert>}
      {loading && <Spinner />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='info'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <p>New on Expatologist?</p>
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register now!
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
