import React, { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Collapse from "react-bootstrap/Collapse";

import ContextComponent from "../../AppContext";
import "./alert.css";

const defalutAlert = {
  message: "Success!",
  messages: [],
  type: "success",
  ttl: 5000,
};

const IndiAlert = () => {
  let [message, setMessage] = useState("");
  let [messages, setMessages] = useState([]);
  let [type, setType] = useState("");

  const { alert } = useContext(ContextComponent);
  let [allertClassName, setAllertClassName] = useState("indi-alert-hide");

  useEffect(() => {
    if (alert.show) {
      let alertObject = { ...defalutAlert, ...alert };
      setMessage(alertObject.message || "Success");
      setMessages(alertObject.messages || []);
      setType(alertObject.type || "success");
      setAllertClassName("");

      setTimeout(() => {
        setAllertClassName("indi-alert-hide");
      }, alertObject.ttl);
    }
  }, [alert]);

  return (
    <Container className={`indi-status-message-wrapper ${allertClassName}`}>
      <Alert className="indi-status-message in" variant={type}>
        {message}
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </Alert>
    </Container>
  );
};

export default IndiAlert;
