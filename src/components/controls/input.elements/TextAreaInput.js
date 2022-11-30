import React, { useRef } from "react";

const TextAreaInput = (props) => {
  let schema = props.props.schema;
  let fieldData = schema.value || schema.defaultValue || '';
  let fieldName = props.props.fieldName;
  let inputElementClassNames = props.props.inputElementClassNames;
  let fieldClassNames = "indi-add-card-input-field " + inputElementClassNames;
  let inputEle = useRef(null);
  let value = fieldData;
  let isRequired = schema?.required || false;
  let isReadOnly = schema?.readonly || false;
  const onChangeInput = (e) => {};
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
