import React from "react";
import Form from "react-bootstrap/Form";

const BooleanCell = ({ props }) => {
  let data = props.data;
  let colIndex = props.colIndex;
  let schema = props.schema;
  let classes = schema.center ? "text-center" : "";
  let textValue = data[colIndex];
  let checkedText = !!textValue;
  let disabled = !!props.disabled ? "disabled" : "";
  return (
    <td className={classes}>
      <Form.Check
        type="checkbox"
        disabled
        defaultChecked={checkedText}
        id={`indi-table-item-${data[0]}`}
      />
    </td>
  );
};

export default BooleanCell;
