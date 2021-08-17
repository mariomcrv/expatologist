import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id; // get the product id from the url

  // useState to handle changes and store them as they change
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch(); // use dispatch to make use of our actions

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails; //deconstruct data

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate; //deconstruct data

  // validate form with useState
  const [validated, setValidated] = useState(true);

  // with use effect we reload the components when certain dependencies change
  useEffect(() => {
    // if update info is ok, we move to the counsellors list
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });

      history.push("/admin/productlist");
      // else, do the second check
    } else {
      if (!product.name || product._id !== productId) {
        // if I dont have these fields
        dispatch(listProductDetails(productId)); // dispatch the details of certain id
      } else {
        // else, set the content from the input
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate, validated]);

  // on submit
  const submitHandler = (e) => {
    // prevent changes
    e.preventDefault();

    // change the state
    setValidated(true);

    // e.preventDefault();
    // dispatch the creation of the item
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Counsellor info</h1>
        {loadingUpdate && <Spinner />}
        {errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid session price.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please provide a url.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter country'
                value={brand}
                required
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid country.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter specialization'
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid specialization.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
              <Form.Control.Feedback type='invalid'>
                Please provide a valid description.
              </Form.Control.Feedback>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
