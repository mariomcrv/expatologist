import React from "react";
import { useEffect } from "react"; // hook
import { useDispatch, useSelector } from "react-redux"; // usedispatch to call our actions and useSelector to select parts of the state
import { Row, Col, Spinner } from "react-bootstrap"; //Bootsrap dependencies
import Product from "../components/Product"; // component
import { listProducts } from "../actions/productActions"; // need to call our action

const HomeScreen = () => {
  const dispatch = useDispatch(); // this var will keep the hook useDispatch

  const productList = useSelector((state) => state.productList); // useSelector allows us to grab info from the state once the action is fired off
  const { loading, error, products } = productList; // here we breakdown the object into these parts of the state that could be sent

  useEffect(() => { // here we fire off the action to get the info and put it in the state
    //we put the function in useEffect, it does the request to the backend to get the list of therapists
    dispatch(listProducts()); //dispatch the action, we do not need to pass any arguments
  }, [dispatch]); //we put the dispatch dependency to avoid errors in the console


  // I made some changes in the code below. We can diplay a spinner or a message
  // when the information is bein loaded. we use the ternary operator to do so.
  // if loading, display a message, 
  // else if, error display the error. I used the bootstrap Spinner component
  // else, load the components
  return (
    <>
      <h1>International Counsellors 🌍</h1>
      {loading ? (
        <Spinner animation="grow" variant="primary" />
      ) : error ? (
        <h3> {error}</h3>
      ) : (
        <Row>
          {products.map(
            (
              product // here I render the Product cards in columns
            ) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            )
          )}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
