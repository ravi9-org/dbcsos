import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

import Field from "./Field";
import Utils from "../../utils";
import ContextComponent from "../../app.context";
import QRCode from "./QRCode";

const CardItemWithActions = (props) => {
  let cardId = props.cardId;

  const optionsArray = ["qrcode", "email"];

  const optionsObjects = {
    "qrcode": {
      displayLabel: "Code",
      defaultSelection: true,
      value: 1,
    },
    "email": {
      displayLabel: "Email",
      defaultSelection: false,
      value: 2,
    },
  };

  let cardObj = props.cardData || {};

  let [cardData, setCardData] = useState(props.cardData || {});
  let [fields, setFields] = useState(cardData?.fields || []);
  let [fieldsData, setFieldsData] = useState(cardData?.fieldsData || []);
  let [fieldsSchema, setFieldsSchema] = useState(cardData?.fieldsSchema || {});
  let [applyActions, setApplyActions] = useState(props.applyActions || false);

  const navigate = useNavigate();

  let { userData } = useContext(ContextComponent);

  const success = (res) => {
    setCardData(res.data);
    setFields(res.data.fields);
    setFieldsData(res.data.fieldsData);
    setFieldsSchema(res.data.fieldsSchema);
    let existingUserData = { ...userData };
    existingUserData?.cards?.push(res.data.id);
    return false;
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    if (Utils.isObjectEmpty(cardObj)) {
      Utils.getCardDetails(cardId).then(success, fail);
    } else {
      success({
        data: cardObj,
      });
    }
  }, []);

  const handleChange = (e) => {
    debugger;
  };
  return (
    <div
      className={`dbc-card-item-parent dbc-card-item-page2 card-with-bg d-flex d-flex-row`}
      style={{
        background: `url(${cardData.backgroundImage})`,
      }}
    >
      <div className="dbc-card-item-page2-send-card-label">Send Card</div>

      <div className="d-flex dbc-card-mini-options-wrapper">
        <ToggleButtonGroup
          type="radio"
          name="options"
          variant="outline-warning"
          defaultValue={optionsArray.length ? optionsArray[0] : 1}
          onChange={handleChange}
        >
          {optionsArray.map((option, index) => (
            <ToggleButton
              key={index}
              variant="outline-primary"
              className="dbc-mini-card-selection-btn"
              id={`tbg-radio-options-${index + 1}`}
              value={option}
            >
              {/* ===:{optionsObjects[option].displayLabel}:--- */}
              {/* ===:{optionsObjects[option]}:--- */}
              ===:{option}:---
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>

      <QRCode cardData={cardData} />

      <div className="dbc-card-item-page2-code-email-options">Code | Email</div>
    </div>
  );
};

export default CardItemWithActions;
