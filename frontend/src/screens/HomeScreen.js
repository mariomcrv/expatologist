import React from "react";
import { useState, useEffect } from "react"; // hook
import { Row, Col } from "react-bootstrap"; //Bootsrap dependencies
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Counsellors</h1>
      <Row>
        {products.map((product) => ( // here I render the Product cards in columns
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
