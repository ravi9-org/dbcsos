import React from "react";
import Form from "react-bootstrap/Form";

const CheckBoxCell = ({ props }) => {
  let data = props.data;
  let colIndex = props.colIndex;
  let textValue = data[colIndex];
  let checkedText = !!textValue;
  return (
    <td>
      <Form.Check
        type="checkbox"
        defaultChecked={checkedText}
        id={`indi-table-item-${data[0]}`}
      />
    </td>
  );
};

export default CheckBoxCell;
