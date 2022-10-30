import React from "react";
import InputElement from "./../../controls/input.elements/InputElement";

const Field = (props = {}) => {
  let fieldProps = props.fieldProps;
  let fieldType = fieldProps.fieldType;
  let fieldSchema = fieldProps.filedSchema;
  let fieldData = fieldProps.fieldData;
  let mode = fieldProps.pageMode;
  //console.log(filedSchema);
  //debugger;
  return (
    <div className="dbs-card-field-item d-flex">
      <div
        className={`dbs-card-field-item-img dbs-card-field-item-${fieldType}`}
      ></div>

      {mode === "readonly" && (
        <div className="dbs-card-field-item-value"> {fieldData}</div>
      )}

      {(mode === "add" || mode === "edit") && (
        <InputElement props={{fieldSchema, fieldData, fieldName: fieldType}} />
      )}
    </div>
  );
};

export default Field;
