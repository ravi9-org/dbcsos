import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import TableContext from "../TableContext";

const CheckBoxCell = ({ props }) => {
  let { setSelectedItem } = useContext(TableContext);
  let data = props.data;
  let colIndex = props.colIndex;
  let textValue = data[colIndex];
  let checkedText = !!textValue;
  let isDisabled = props?.schema?.disabled || false;

  const updateCheckboxValue = (e) => {
    let id = data[0];
    let setObjValu = {
      id: id,
      selected: e.currentTarget.checked,
    };
    setSelectedItem(setObjValu);
  };
  return (
    <td>
      <Form.Check
        type="checkbox"
        //dataId={data[0]}        
        disabled={isDisabled ? true : false}
        onChange={updateCheckboxValue}
        defaultChecked={checkedText}
        id={`indi-table-item-${data[0]}`}
      />
    </td>
  );
};

export default CheckBoxCell;
