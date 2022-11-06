import React, { useRef } from "react";

const TextAreaInput = (props) => {
  let schema = props.props.schema;
  let fieldData = props.props.fieldData;
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
      placeholder={`Enter ${fieldName}`}
      onChange={onChangeInput}
    >
      {value}
    </textarea>
  );
};

export default TextAreaInput;
