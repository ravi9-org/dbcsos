import React from "react";
import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";

const InputElement = ({ props = {} }) => {
  let schema = props.fieldSchema;
  let fieldType = schema.type;
  let fieldData = props.fieldData;
  let fieldName = props.fieldName;
  let inputElementClassNames = props.inputElementClassNames;

  if (fieldType === "text") {
    return (
      <TextInput
        props={{ schema, fieldData, fieldName, inputElementClassNames }}
      />
    );
  } else if (fieldType === "textarea") {
    return (
      <TextAreaInput
        props={{ schema, fieldData, fieldName, inputElementClassNames }}
      />
    );
  } else {
    return null;
  }
};

export default InputElement;
