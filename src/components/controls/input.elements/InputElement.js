import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import TextAreaInput from "./TextInput";

const InputElement = ({ props = {} }) => {
  let schema = props.fieldSchema;
  let fieldType = schema.type;
  let fieldData = props.fieldData;
  let fieldName = props.fieldName;
  let inputElementClassNames = props.inputElementClassNames;
//   console.log(fieldType);
//   console.log(schema);
//   console.log(fieldData);

  //debugger;
  if (fieldType === "text") {
    return <TextInput props={{ schema, fieldData, fieldName, inputElementClassNames }} />;
  } else if (fieldType === "textarea") {
    return <TextAreaInput props={{ schema, fieldData, fieldName, inputElementClassNames }} />;
  } else {
    return null;
  }
};

export default InputElement;
