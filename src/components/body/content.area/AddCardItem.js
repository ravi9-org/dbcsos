import React, { useState, useEffect, useContext } from "react";

import ContextComponent from "../../app.context";
import Field from "./Field";
import Utils from "../../utils";

const AddCardItem = ({ props }) => {
  let { userData } = useContext(ContextComponent);
  let cardInitialData = props.cardInitialData,
    setNewCardData = props.setNewCardData,
    pageMode = props.pageMode || "add",
    inputElementClassNames = props.inputElementClassNames || "";

  let [cardData, setCardData] = useState(cardInitialData || {});
  let [fields, setFields] = useState(cardInitialData.fields || []);
  let [fieldsData, setFieldsData] = useState(cardInitialData.fieldsData || {});
  let [fieldsSchema, setFieldsSchema] = useState(
    cardInitialData.fieldsSchema || {}
  );

  useEffect(() => {
    //Utils.getCardDetails(cardId).then(success, fail);
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
                pageMode,
                inputElementClassNames,
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

export default AddCardItem;
