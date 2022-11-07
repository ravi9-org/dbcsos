import React, { useState, useRef, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import DataTable from "../../../controls/table/DataTable";
import AddIcon from "../../../../assets/img/add.png";
import DeleteIcon from "../../../../assets/img/Delete.png";

const BadgesTable = () => {
  let navigate = useNavigate();

  let { setCanRedirectToLogin, setLoadingState } = useContext(ContextComponent);

  let [tableColumns, setTableColumns] = useState([
    "id",
    "select",
    "name",
    "iconImage",
    "darkIconImage",
    "type",
  ]);
  let [tableColumnSchema, setTableColumnSchema] = useState({
    id: {
      type: "hidden",
      title: "id",
    },
    select: {
      type: "checkbox",
      title: "-",
      center: true,
    },
    name: {
      type: "text",
      search: true,
      sort: false,
      title: "Badge name",
    },
    iconImage: {
      type: "image",
      title: "Icon",
      center: true,
    },
    darkIconImage: {
      type: "image",
      title: "Icon label",
      center: true,
    },
    type: {
      type: "text",
      title: "Type",
    },
  });

  let [tableData, setTableData] = useState([]);
  let [canRender, setCanRender] = useState(false);

  const success = (res) => {
    setLoadingState({
      applyMask: false,
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
      applyMask: false,
    });
    err?.message?.length && console.log(err);
    if (err?.redirect) {
      setCanRedirectToLogin(true);
    }
  };

  useEffect(() => {
    setLoadingState({
      applyMask: false,
      text: "Loading badges",
    });
    Utils.getNewBadges().then(success, fail);
  }, []);

  const navigateToAddBadgePage = e => {
    e.preventDefault();
    navigate(Utils.APP_URLS.ADD_BADGE_PAGE);
  }

  const handleShow = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="indi-body-cards-wrapper d-flex w-100">
      <div className="indi-add-card-title">
        Badges
        <div className="d-none1 w-50 indi-body-actions">
          <div
            className="indi-body-action"
            role="button"
            onClick={navigateToAddBadgePage}
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

export default BadgesTable;
