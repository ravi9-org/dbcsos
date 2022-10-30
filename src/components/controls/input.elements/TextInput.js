import React, { useRef } from "react";

const TextInput = (props) => {
  let schema = props.props.schema;
  let fieldData = props.props.fieldData;
  let fieldName = props.props.fieldName;
  let inputElementClassNames = props.props.inputElementClassNames;
  let fieldClassNames = "dbc-add-card-input-field " + inputElementClassNames;
  let inputEle = useRef(null);
  let value = fieldData;
  let isRequired = schema?.required || false;
  let isReadOnly = schema?.readonly || false;
  const onChangeInput = (e) => {
    //console.log(inputEle);
    //debugger;
  };
  return (
    <input
      type="text"
      className={fieldClassNames}
      required={isRequired}
      ref={inputEle}
      readOnly={isReadOnly}
      defaultValue={value}
      //   value={value}
      placeholder={`Enter ${fieldName}`}
      onChange={onChangeInput}
    ></input>
  );
};

export default TextInput;
