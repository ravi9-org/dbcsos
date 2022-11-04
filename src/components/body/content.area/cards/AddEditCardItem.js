import React, { useState, useEffect, useContext, useRef } from "react";

import ContextComponent from "../../../AppContext";
import Field from "../../../controls/input.elements/Field";

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
  let [cardImage, setCardImage] = useState(cardInitialData?.cardImage || {});
  let [fieldsSchema, setFieldsSchema] = useState(
    cardInitialData.fieldsSchema || {}
  );

  useEffect(() => {}, []);

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const inputFileHandler = async (e) => {
    let file = inputCardImage.current.files[0];
    await fileToDataUri(file).then((dataUri) => {
      setCardImage(dataUri);
    });
  };

  return (
    <div
      className="indi-card-item-parent indi-add-card-wrapper card-with-bg"
      style={{
        background: `url(${cardData.backgroundImage})`,
      }}
    >
      <div className="d-none1 indi-card-company-logo-wrapper">
        <img src={cardData.logoImage} alt="logoiamge" />
      </div>

      <div className="indi-card-upload-picture indi-card-upload-picture-with-no-bg">
        <input
          type="file"
          className="indi-card-upload-picture-file-input"
          ref={inputCardImage}
          onChange={inputFileHandler}
        />
        <img
          src={cardImage}
          className="indi-card-upload-picture-card-image"
          alt="card pic"
        />
        <input
          type="hidden"
          className="indi-image-input-element"
          value={cardImage}
        />
      </div>
      <div className="indi-info-wrapper">
        <div className="indi-card-name fw-bold">
          {userData.firstName} {userData.lastName}
        </div>
        <div className="indi-card-title">{userData.designation}</div>
      </div>
      <div className="indi-card-fields">
        <div className="indi-card-field-wrapper">
          {fields?.map((field, index) => (
            <Field
              fieldProps={{
                fieldType: field,
                inputElementClassNames,
                filedSchema: fieldsSchema[field],
                fieldData: fieldsData[index],
              }}
              pageMode={pageMode}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCardItem;
