import React from "react";
import TableHeaderCheckboxCell from "./cells/TableHeaderCheckboxCell";
import TableHeaderSearchboxCell from "./cells/TableHeaderSearchboxCell";

const TableHeader = ({ props }) => {
  let tableColumnSchema = props?.tableColumnSchema;
  let col = props.col;
  let title = tableColumnSchema[col].title;
  let isSortable = !!tableColumnSchema[col].sort;

  const doSort = (e) => {
    e.preventDefault();
    console.log(" sorting here... ");
  };

  if (tableColumnSchema[col].type === "search") {
    <TableHeaderSearchboxCell
      props={{ classNames: "indi-data-table-checkbox-all" }}
    />;
  } else if (tableColumnSchema[col].type === "hidden") {
    return <></>;
  } else if (tableColumnSchema[col].type === "checkbox") {
    return (
      <TableHeaderCheckboxCell
        props={{ classNames: "indi-data-table-checkbox-all" }}
      />
    );
  } else {
    return (
      <th>
        {title}{" "}
        {isSortable && (
          <div role="button" className="d-none" onClick={doSort}>
            ^
          </div>
        )}
      </th>
    );
  }
};

export default TableHeader;
