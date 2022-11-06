import React, { useState, useRef, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import DataTable from "../../../controls/table/DataTable";

const Badges = () => {
  let navigate = useNavigate();

  let { setCanRedirectToLogin, setLoadingState } = useContext(ContextComponent);

  let [tableColumns, setTableColumns] = useState([
    "id",
    "select",
    "name",
    "iconImage",
    "darkIconImage",
    "type",
    "readonly",
    "defaultValue",
    "constant",
    "isDefault",
    "multiple",
    "required",
  ]);
  let [tableColumnSchema, setTableColumnSchema] = useState({
    id: {
      type: "hidden",
      title: "id"
    },
    select: {
      type: "checkbox",
      title: "-",
      center: true
    },
    name: {
      type: "text",
      search: true,
      sort: false,
      title: "Badge name"
    },
    iconImage: {
      type: "image",
      title: "Icon",
      center: true
    },
    darkIconImage: {
      type: "image",
      title: "Icon label",
      center: true
    },
    type: {
      type: "text",
      title: "Type"
    },
    readonly: {
      type: "boolean",
      title: "Readonly",
      center: true
    },
    defaultValue: {
      type: "text",
      title: "Default value"
    },
    constant: {
      type: "boolean",
      title: "Constant",
      center: true
    },
    isDefault: {
      type: "boolean",
      title: "Is default?",
      center: true
    },
    multiple: {
      type: "boolean",
      title: "Allow multiple",
      center: true
    },
    required: {
      type: "boolean",
      title: "Required",
      center: true
    },
  });

  let [tableData, setTableData] = useState([]);
  let [canRender, setCanRender] = useState(false);

  const success = (res) => {
    setLoadingState({
      applyMask: false
    });
    let userInfo = res?.data;
    let usersArray = [];
    if (!Utils.isObjectEmpty(userInfo)) {
      usersArray = userInfo.map((user, index) => {
        let userTableObj = [];
        let userTableData = [];
        tableColumns.forEach((col) => {
          if (col === "select") {
            userTableData.push(false);
          } else if (col === "username") {
            userTableData.push(
              userInfo[index].firstName + " " + userInfo[index].lastName
            );
          } else {
            userTableData.push(userInfo[index][col]);
          }
        });
        userTableObj = userTableData;
        return userTableObj;
      });

      setTableData(usersArray);
      setCanRender(true);
    }
  };

  const fail = (err) => {
    setLoadingState({
      applyMask: false
    });
    err?.message?.length && console.log(err);
    if (err?.redirect) {
      setCanRedirectToLogin(true);
    }
  };

  useEffect(() => {
    setLoadingState({
      applyMask: false,
      text: "Loading badges"
    })
    Utils.getBadges().then(success, fail);
  }, []);

  return (
    <div>
      {canRender && (
        <DataTable
          tableProps={{ tableColumns, tableColumnSchema, tableData }}
        />
      )}
    </div>
  );
};

export default Badges;
