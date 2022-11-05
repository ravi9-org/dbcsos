import React, { useState, useRef, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";

import TextCell from "./cells/TextCell";
import HiddenCell from "./cells/HiddenCell";
import CheckBoxCell from "./cells/CheckBoxCell";
import BooleanCell from "./cells/BooleanCell";
import TableHeader from "./TableHeader";

const DataTable = ({ tableProps }) => {
  let [tableColumns, setTableColumns] = useState(tableProps.tableColumns || []);
  let [tableColumnSchema, setTableColumnSchema] = useState(
    tableProps.tableColumnSchema || []
  );
  let [tableData, setTableData] = useState(tableProps.tableData || []);

  useEffect(() => {}, []);

  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            {tableColumns.map((col, index) => (
              <TableHeader key={index} props={{ tableColumnSchema, col }} />
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              {tableColumns.map((col, colIndex) => (
                <React.Fragment key={`${colIndex}`}>
                  {tableColumnSchema[col].type === "text" && (
                    <TextCell props={{ data, colIndex }} />
                  )}
                  {tableColumnSchema[col].type === "hidden" && (
                    <HiddenCell props={{ data, colIndex }} />
                  )}
                  {tableColumnSchema[col].type === "checkbox" && (
                    <CheckBoxCell props={{ data, colIndex }} />
                  )}
                  {tableColumnSchema[col].type === "boolean" && (
                    <BooleanCell props={{ data, colIndex }} />
                  )}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
