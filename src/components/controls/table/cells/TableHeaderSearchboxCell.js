import React from "react";
import Form from "react-bootstrap/Form";

const TableHeaderSearchboxCell = ({ props }) => {
  
  return (
    <th className="indi-table-header-searchbox">
      <input type="search" placeholder="Search" />
    </th>
  );
};

export default TableHeaderSearchboxCell;
