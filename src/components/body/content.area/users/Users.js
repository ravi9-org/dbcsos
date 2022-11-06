import React, { useState, useRef, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import defaultUserImage from "../../../../assets/img/default-profile.png";
import DataTable from "../../../controls/table/DataTable";

const Users = () => {
  let navigate = useNavigate();

  let { setCanRedirectToLogin } = useContext(ContextComponent);

  let [tableColumns, setTableColumns] = useState([
    "id",
    "select",
    "username",
    "email",
    "department",
    "organization",
    "designation",
    "isAdmin",
  ]);
  let [tableColumnSchema, setTableColumnSchema] = useState({
    id: {
      type: "hidden",
      title: "id"
    },
    select: {
      type: "checkbox",
      title: "-"
    },
    username: {
      type: "text",
      search: true,
      sort: true,
      title: "User name"
    },
    email: {
      type: "text",
      search: true,
      title: "Email"
    },
    department: {
      type: "text",
      title: "Department"
    },
    organization: {
      type: "text",
      title: "Organization"
    },
    designation: {
      type: "text",
      title: "Designation"
    },
    isAdmin: {
      type: "boolean",
      title: "Admin",
      center:true
    },
  });
  let [tableData, setTableData] = useState([]);
  let [canRender, setCanRender] = useState(false);

  const success = (res) => {
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
    err?.message?.length && console.log(err);
    if (err?.redirect) {
      setCanRedirectToLogin(true);
    }
  };

  useEffect(() => {
    Utils.getAllUsers().then(success, fail);
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

export default Users;
