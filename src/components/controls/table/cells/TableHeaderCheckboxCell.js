import React from "react";
import Form from "react-bootstrap/Form";

const TableHeaderCheckboxCell = ({ props }) => {
  let classNames = props?.classNames || "";
  return (
    <th className={classNames}>
      <Form.Check type="checkbox" id={`indi-table-header-checkbox`} />
    </th>
  );
};

export default TableHeaderCheckboxCell;
