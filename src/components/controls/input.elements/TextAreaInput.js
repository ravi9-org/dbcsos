import React, { useRef } from "react";

const TextAreaInput = ({schema}) => {
  let fieldData = schema.value || schema.defaultValue || '';
  let fieldName = schema.fieldName;
  let fieldClassNames = "indi-add-card-input-field ";
  let inputEle = useRef(null);
  let value = fieldData;
  let isRequired = schema?.required || false;
  let isReadOnly = schema?.readonly || false;
  const onChangeInput = (e) => {
    schema.value = e.currentTarget.value;
  };
  return (
    <textarea
      className={fieldClassNames}
      required={isRequired}
      ref={inputEle}
      readOnly={isReadOnly}
      defaultValue={value}
      placeholder={`${fieldName}`}
      onChange={onChangeInput}
    ></textarea>
  );
};

export default TextAreaInput;
