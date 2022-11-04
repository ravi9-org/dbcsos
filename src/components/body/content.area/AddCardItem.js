import React, { useState, useEffect, useContext, useRef } from "react";

import ContextComponent from "../../app.context";
import Field from "./Field";
import Utils from "../../utils";

const AddCardItem = ({ props }) => {
  let { userData } = useContext(ContextComponent);
  let cardInitialData = props.cardInitialData,
    setNewCardData = props.setNewCardData,
    pageMode = props.pageMode || "add",
    inputElementClassNames = props.inputElementClassNames || "";

  let inputCardImage = useRef();

  let [cardData, setCardData] = useState(cardInitialData || {});
  let [fields, setFields] = useState(cardInitialData.fields || []);
  let [fieldsData, setFieldsData] = useState(cardInitialData.fieldsData || {});
  let [cardImage, setCardImage] = useState(
    cardInitialData?.cardImage || {}
  );
  let [fieldsSchema, setFieldsSchema] = useState(
    cardInitialData.fieldsSchema || {}
  );

  useEffect(() => {
    //Utils.getCardDetails(cardId).then(success, fail);
  }, []);

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const inputFileHandler = async (e) => {
    console.log(e);
    console.log(inputCardImage.current);

    let file = inputCardImage.current.files[0];
    await fileToDataUri(file).then((dataUri) => {
      console.log(" ==================== dataUri : " + dataUri);
      setCardImage(dataUri);
    });
  };

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

      <div className="dbc-card-upload-picture dbc-card-upload-picture-with-no-bg">
        <input
          type="file"
          className="dbc-card-upload-picture-file-input"
          ref={inputCardImage}
          onChange={inputFileHandler}
        />
        <input type="hidden" className="dbc-image-input-element" value={cardImage} />
      </div>
      <div className="dbc-info-wrapper">
        <div className="dbc-card-name fw-bold">
          {userData.firstName} {userData.lastName}
        </div>
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
