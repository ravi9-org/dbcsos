import React from "react";
import { Button } from "react-bootstrap";

const Email = () => {
  const submitFormHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="dbc-email-form-page">
      <div>Email your Personal card to:</div>
      <form onSubmit={submitFormHandler}>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Email" />
              <textarea placeholder="Message"></textarea>
              <Button>SEND</Button>
      </form>
    </div>
  );
};

export default Email;
