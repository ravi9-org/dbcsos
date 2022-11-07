import React, { useState, useRef, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import AddIcon from "../../../../assets/img/add.png";
import DeleteIcon from "../../../../assets/img/Delete.png";
import DataTable from "../../../controls/table/DataTable";

const AdressesTable = () => {
  let navigate = useNavigate();

  let { setCanRedirectToLogin } = useContext(ContextComponent);

  let [tableColumns, setTableColumns] = useState([
    "id",
    "select",
    "name",
    "organization",
    "latitude",
    "longitude",
    "fulladdress"
  ]);
  let [tableColumnSchema, setTableColumnSchema] = useState({
    id: {
      type: "hidden",
      title: "id",
    },
    select: {
      type: "checkbox",
      title: "-",
    },
    name: {
      type: "text",
      search: true,
      sort: true,
      title: "Name",
    },
    organization: {
      type: "text",
      search: true,
      title: "Organization",
    },
    latitude: {
      type: "text",
      title: "Latitude",
    },
    longitude: {
      type: "text",
      title: "Longitude",
    },
    fulladdress: {
      type: "text",
      title: "Full address",
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
        userTableData.push("search");
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
    Utils.getAllAddresses().then(success, fail);
  }, []);

  const navigateToAddUserPage = (e) => {
    e.preventDefault();
    return false;
  };

  const handleShow = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="indi-body-cards-wrapper d-flex w-100">
      <div className="indi-add-card-title">
        Addresses
        <div className="d-none1 w-50 indi-body-actions">
          <div
            className="indi-body-action"
            role="button"
            onClick={navigateToAddUserPage}
          >
            <img className="indi-w-20" src={AddIcon} alt="Edit-icon"></img>
            Add
          </div>
          <div className="indi-body-action" role="button" onClick={handleShow}>
            <img className="indi-w-20" src={DeleteIcon} alt="Delete-icon"></img>
            Delete
          </div>
        </div>
      </div>
      {canRender && (
        <DataTable
          tableProps={{ tableColumns, tableColumnSchema, tableData }}
        />
      )}
    </div>
  );
};

export default AdressesTable;
