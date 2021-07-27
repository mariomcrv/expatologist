import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

// IMPORTANT
// I created this page copying the content from the login screen
// as the functionality is very similar, just a couple of changes

const RegisterScreen = ({ location, history }) => {
  // component level state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister); // useSelector is what gives me access to the state, the function takes the state and we request the userRegister form the state
  const { loading, error, userInfo } = userRegister; // we defined these in the user reducer and extract it's values

  const redirect = location.search ? location.search.split("=")[1] : "/"; // this redirect function is what takes us to the next screen based on the information of the url

  // REDIRECT IF WE ARE LOGGED IN //
  useEffect(() => {
    if (userInfo) {
      // if userIfo exists, go to the redirect url
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  // the e stands for event, so this is what happens when the event is triggered
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1 className='text-center'>REGISTER</h1>
      {message && <Alert variant='danger'>{message}</Alert>}
      {error && <Alert variant='danger'>{error}</Alert>}
      {loading && <Spinner />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
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
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='info'>
          Register
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          <p>Already have an account?</p>
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
