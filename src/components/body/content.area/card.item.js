import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Field from "./Field";
import Utils from "../../utils";
import ContextComponent from "../../app.context";

const CardItem = (props) => {
  let cardId = props.cardId;

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
        "data": cardObj
      })
    }
  }, []);

  const navigateToCardDetailsPage = e => {
    if (applyActions) {
      e.preventDefault();
      navigate("/cards/" + cardId, { state: {cardData: cardData} });
    }
  }

  return (
    <div
      onClick={navigateToCardDetailsPage}
      className={`dbc-card-item-parent card-with-bg ${applyActions ? "dbc-card-with-actions" : ""}`}
      style={{
        background: `url(${cardData.backgroundImage})`,
      }}
    >
      <div className="d-none1 dbc-card-company-logo-wrapper">
        <img src={cardData.logoImage} alt="logoiamge" />
      </div>
      <div className="dbc-card-upload-picture">
        <img className="dbc-card-upload-picture-img" src={cardData.cardImage} alt="card image" />
        </div>
        <div className="dbc-info-wrapper">
        <div className="dbc-card-name fw-bold">{userData.firstName} {userData.lastName}</div>
        <div className="dbc-card-title">{userData.designation}</div>
      </div>
      <div className="dbc-card-fields">
        <div className="dbc-card-field-wrapper">
          {fields?.map((field, index) => (
            <Field
              fieldProps={{
                fieldType: field,
                filedSchema: fieldsSchema[field],
                fieldData: fieldsData[index],
              }}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardItem;
