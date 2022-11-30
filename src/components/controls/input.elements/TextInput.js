import React, { useRef, useContext, useState } from "react";

import ContextComponent from "../../AppContext";

const TextInput = (props) => {
  let { userData } = useContext(ContextComponent);
  let schema = props.props.schema;
  let fieldData = schema.value || schema.defaultValue || '';
  if (schema?.badgeUID === "email" && fieldData === "") {
    fieldData = userData.email;
  }
  let fieldName = props.props.fieldName;
  let inputElementClassNames = props.props.inputElementClassNames;
  let fieldClassNames = "indi-add-card-input-field " + inputElementClassNames;
  let inputEle = useRef(null);
  let value = fieldData;
  let isRequired = schema?.required || false;
  let isReadOnly = schema?.constant || schema?.readonly || false;
  const onChangeInput = (e) => {};
  return (
    <input
      type="text"
      className={fieldClassNames}
      required={isRequired}
      ref={inputEle}
      readOnly={isReadOnly}
      defaultValue={value}
      //placeholder={`Enter ${fieldName}`}
      placeholder={`${fieldName}`}
      onChange={onChangeInput}
    ></input>
  );
};

export default TextInput;
