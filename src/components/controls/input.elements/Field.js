import React from "react";
import InputElement from "./InputElement";

const Field = (props = {}) => {
  let fieldProps = props.fieldProps;
  let fieldType = fieldProps.fieldType;
  let fieldSchema = fieldProps.filedSchema;
  let fieldData = fieldProps.fieldData;
  let mode = fieldProps.pageMode;
  let inputElementClassNames = fieldProps.inputElementClassNames;

  return (
    <div className="indi-card-field-item d-flex">
      <div
        className={`indi-card-field-item-img indi-card-field-item-${fieldType}`}
      ></div>

      {(mode === "readonly" || (mode !== "add" && mode !== "edit")) && (
        <div className="indi-card-field-item-value"> {fieldData}</div>
      )}

      {(mode === "add" || mode === "edit") && (
        <InputElement
          props={{
            fieldSchema,
            fieldData,
            fieldName: fieldType,
            inputElementClassNames,
          }}
        />
      )}
    </div>
  );
};

export default Field;
