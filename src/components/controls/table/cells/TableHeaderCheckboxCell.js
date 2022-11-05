import React from "react";
import Form from "react-bootstrap/Form";

const TableHeaderCheckboxCell = () => {
  return (
    <th>
      <Form.Check type="checkbox" id={`indi-table-header-checkbox`} />
    </th>
  );
};

export default TableHeaderCheckboxCell;
