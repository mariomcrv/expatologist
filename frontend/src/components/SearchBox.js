import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <div>
    <Form onSubmit={submitHandler} inline className="text-center">
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Find a Counsellor...'
        className='mr-sm-2 ml-sm-5 rounded-pill'
      ></Form.Control>
      <Button type='submit' variant='outline-light' className='btn p-2 rounded-circle'> GO!! 
      </Button>
    </Form>
    </div>
  );
};

export default SearchBox;
