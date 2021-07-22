import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // the link function to move to another route
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Spinner,
} from "react-bootstrap"; // more bootstrap components
import Rating from "../components/Rating"; // our rating component
import { listProductDetails } from "../actions/productActions";
import DateTimePickerTest from "../components/DateTimePickerTest";

// match is the parameter to extract info from the url, and history leads to another page
const ProductScreen = ({ history, match }) => {
  // this is how we use the match property comming from props
  const dispatch = useDispatch();

  // i need use state to change the behavior of the booking button and the state of the date and time params
  const [disable, setDisable] = React.useState(true);
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

  // date and time details, this function bring the info about the date and time
  const dateTimeDataHadler = (dateTimeData) => {
    if (dateTimeData.date === null || dateTimeData.time === null) {
      setDisable(true);
    } else {
      setDisable(false);
      setDate(dateTimeData.date.toString().substring(0, 15).replace(/\s/g, "-")); // trim the date and time
      setTime(dateTimeData.time.toString().substring(16, 24));
    }
  };

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  // with this handler I will pass the info to the cart
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?date=${date}?time=${time}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? ( // if loading
        <Spinner animation='border' variant='primary' />
      ) : error ? ( // else if error
        <h3> {error}</h3>
      ) : (
        // else
        <Row>
          <Col md={3}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={5}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
                <h5>
                  {product.brand} | {product.category}
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: €{product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>€{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <DateTimePickerTest onAddDateTime={dateTimeDataHadler} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={disable}
                    onClick={addToCartHandler}
                  >
                    Book Appointment
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
