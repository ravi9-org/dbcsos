import React, { useState, useEffect } from "react";

import Field from "./Field";
import Utils from "../../utils";

const CardItem = (props) => {
  let cardId = props.cardId;

  let [cardData, setCardData] = useState({});
  let [fieldsOrder, setFieldsOrder] = useState([]);
  let [fieldsData, setFieldsData] = useState([]);
  let [fieldsSchema, setFieldsSchema] = useState({});

  const success = (res) => {
    setCardData(res.data);
    setFieldsOrder(res.data.fieldsOrder);
    setFieldsData(res.data.fieldsData);
    setFieldsSchema(res.data.fieldsSchema);
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
        <div className="dbc-card-name fw-bold">John Williams</div>
        <div className="dbc-card-title">Sr. Manager</div>
      </div>
      <div className="dbc-card-fields">
        <div className="dbc-card-field-wrapper">
          {fieldsOrder?.map((field, index) => (
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
