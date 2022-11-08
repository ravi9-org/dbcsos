import React, { useState, useRef, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";

import TextCell from "./cells/TextCell";
import HiddenCell from "./cells/HiddenCell";
import CheckBoxCell from "./cells/CheckBoxCell";
import BooleanCell from "./cells/BooleanCell";
import ImageCell from "./cells/ImageCell";
import TableHeader from "./TableHeader";
import TableContext from "./TableContext";

const DataTable = ({ tableProps }) => {
  let [selectedItems, setSelectedItems] = useState([]);
  let [selectedItem, setSelectedItem] = useState({});
  let [tableColumns, setTableColumns] = useState(tableProps.tableColumns || []);
  let [tableColumnSchema, setTableColumnSchema] = useState(
    tableProps.tableColumnSchema || []
  );

  let [tableData, setTableData] = useState(tableProps.tableData || []);


  let setTableSelectedItems = tableProps?.setTableSelectedItems || (() => { });

  
  useEffect(() => {
    if (selectedItem?.selected) {
      let temp = [...selectedItems];
      temp.push(selectedItem.id);
      setSelectedItems(temp);
    } else {
      let newSelectedItems = selectedItems.filter((item) => {
        return item !== selectedItem.id;
      });
      setSelectedItems(newSelectedItems);
    }
  }, [selectedItem]);

  useEffect(() => {
    setTableSelectedItems(selectedItems);
  }, [selectedItems]);

  // useEffect(() => {
  //   console.log("new table data came...");
  // }, [tableData]);

  return (
    <TableContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
      }}
    >
      <div className="indi-data-table-wrapper">
        <Table responsive="sm">
          <thead className="indi-data-table-header">
            <tr>
              {tableColumns.map((col, index) => (
                <TableHeader key={index} props={{ tableColumnSchema, col }} />
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index} className="indi-data-table-tr">
                {tableColumns.map((col, colIndex) => (
                  <React.Fragment key={`${colIndex}`}>
                    {tableColumnSchema[col].type === "text" && (
                      <TextCell
                        props={{
                          data,
                          colIndex,
                          schema: tableColumnSchema[col],
                        }}
                      />
                    )}
                    {tableColumnSchema[col].type === "hidden" && (
                      <HiddenCell
                        props={{
                          data,
                          colIndex,
                          schema: tableColumnSchema[col],
                        }}
                      />
                    )}
                    {tableColumnSchema[col].type === "checkbox" && (
                      <CheckBoxCell
                        props={{
                          data,
                          colIndex,
                          schema: tableColumnSchema[col],
                        }}
                      />
                    )}
                    {tableColumnSchema[col].type === "image" && (
                      <ImageCell
                        props={{
                          data,
                          colIndex,
                          schema: tableColumnSchema[col],
                        }}
                      />
                    )}
                    {tableColumnSchema[col].type === "boolean" && (
                      <BooleanCell
                        props={{
                          data,
                          colIndex,
                          schema: tableColumnSchema[col],
                        }}
                      />
                    )}
                    {tableColumnSchema[col].type === "search" && (
                      <TextCell
                        props={{
                          data,
                          colIndex,
                          schema: tableColumnSchema[col],
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </TableContext.Provider>
  );
};

export default DataTable;
