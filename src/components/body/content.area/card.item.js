import React, { useState, useEffect, useContext } from "react";

import Field from "./Field";
import Utils from "../../utils";
import ContextComponent from "../../app.context";

const CardItem = (props) => {
  let cardId = props.cardId;

  let [cardData, setCardData] = useState({});
  let [fields, setFields] = useState([]);
  let [fieldsData, setFieldsData] = useState([]);
  let [fieldsSchema, setFieldsSchema] = useState({});

  let { userCards, setUserCards, userData, setUserData } =
    useContext(ContextComponent);

  const success = (res) => {
    //console.log(res.data);
    //debugger;
    setCardData(res.data);
    setFields(res.data.fields);
    setFieldsData(res.data.fieldsData);
    setFieldsSchema(res.data.fieldsSchema);
    //userCards.push(res.data);
    let existingUserData = { ...userData };
    existingUserData.cards.push(res.data.id);
    //console.log("res.data.id : " + res.data.id);
    //setUserData(existingUserData);
    return false;
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    Utils.getCardDetails(cardId).then(success, fail);
  }, []);

  return (
    <div
      className="dbc-card-item-parent card-with-bg"
      style={{
        background: `url(${cardData.backgroundImage})`,
      }}
    >
      <div className="d-none1 dbc-card-company-logo-wrapper">
        <img src={cardData.logoImage} alt="logoiamge" />
      </div>
        <div className="dbc-card-upload-picture"></div>
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
