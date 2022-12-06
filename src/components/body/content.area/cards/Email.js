import React, { useState, useRef, useContext } from "react";
import { Button } from "react-bootstrap";

import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";

const Email = ({ cardId, cardExtLink }) => {
  let { setAlert, setLoadingState } = useContext(ContextComponent);

  let [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    cardId,
    cardExternalLink: cardExtLink
  });

  let sendButton = useRef(null);

  const sendHandler = (e) => {
    e.preventDefault();
    setLoadingState({
      applyMassk: true,
      text: "Sending card mail",
    });
    const success = (res) => {
      setLoadingState({
        applyMassk: false,
      });
      setAlert({
        show: true,
        message: "Card mailed successfully!",
      });
    };
    const fail = (err) => {
      setLoadingState({
        applyMassk: false,
      });
      setAlert({
        show: true,
        message: "Card mailed failed!",
      });
      console.log(err);
    };

    try {
      Utils.cardMail(formData).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const inputHandler = (e) => {
    let temp = { ...formData };
    temp[e.currentTarget.id] = e.currentTarget.value;
    setFormData(temp);
    let canEnable = true;
    Object.keys(temp).map((current) => {
      temp[current].length === 0 && (canEnable = false);
    });

    if (canEnable) {
      sendButton.current.classList.remove("indi-send-email-form-disable");
    } else {
      sendButton.current.classList.add("indi-send-email-form-disable");
    }
  };
  return (
    <div className="indi-email-form-page indi-card-field-item input">
      <div>Email your Personal card to:</div>
      <form>
        <input
          type="text"
          className="indi-add-card-input-field"
          placeholder="Name"
          id="name"
          required
          onChange={inputHandler}
        />
        <input
          type="text"
          placeholder="Email"
          required
          id="email"
          onChange={inputHandler}
        />
        <textarea
          placeholder="Message"
          required
          onChange={inputHandler}
          id="message"
        ></textarea>
        <Button
          ref={sendButton}
          variant="info"
          className="indi-send-email-form-disable"
          onClick={sendHandler}
        >
          SEND
        </Button>
      </form>
    </div>
  );
};

export default Email;
