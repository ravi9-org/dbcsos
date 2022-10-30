import React from "react";

const Field = (props = {}) => {
  let fieldProps = props.fieldProps;
  let fieldType = fieldProps.fieldType;
  let filedSchema = fieldProps.filedSchema;
  let fieldData = fieldProps.fieldData;
  console.log(fieldProps);
  debugger;
  return (
    <div className="dbs-card-field-item d-flex">
      <div
        className={`dbs-card-field-item-img dbs-card-field-item-${fieldType}`}
      ></div>
      <div className="dbs-card-field-item-value"> {fieldData}</div>
    </div>
  );
};

export default Field;
