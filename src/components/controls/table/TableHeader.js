import React from "react";
import TableHeaderCheckboxCell from "./cells/TableHeaderCheckboxCell";

const TableHeader = ({ props }) => {
  let tableColumnSchema = props.tableColumnSchema;
  let col = props.col;
  let textValue = tableColumnSchema[col];
  let title = tableColumnSchema[col].title;
  console.log(title);
  if (tableColumnSchema[col].type === "hidden") {
    return <></>;
  } else if (tableColumnSchema[col].type === "checkbox") {
    return <TableHeaderCheckboxCell />;
  } else {
    return <th>{title}</th>;
  }
};

export default TableHeader;
