import React, { useRef, useContext, useState, useEffect } from "react";

import ContextComponent from "../../AppContext";

const TextInput = ({ schema = {} }) => {
  let { userData } = useContext(ContextComponent);
  let fieldData = schema.value || schema.defaultValue || "";
  if (schema.badgeUID === "email" && fieldData === "") {
    fieldData = userData.email;
    schema.value = fieldData;
  }
  let fieldName = schema.badgeName;
  let fieldClassNames = "indi-add-card-input-field ";
  let inputEle = useRef(null);
  let value = fieldData;
  let isRequired = schema.required ?? false;
  let isReadOnly = schema.constant ?? schema.readonly ?? false;
  const onChangeInput = (e) => {
    schema.value = e.currentTarget.value;
  };
  let key = schema.badgeName + new Date().getMilliseconds();
  return (
    <input
      key={key}
      type="text"
      className={fieldClassNames}
      required={isRequired}
      ref={inputEle}
      readOnly={isReadOnly}
      defaultValue={value}
      placeholder={`${fieldName}`}
      onChange={onChangeInput}
    ></input>
  );
};

export default TextInput;
