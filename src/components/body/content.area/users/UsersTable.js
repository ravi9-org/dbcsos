import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import DataTable from "../../../controls/table/DataTable";
import BulkUploadIcon from "../../../../assets/img/Upload.png";
import AddIcon from "../../../../assets/img/add.png";
import DeleteIcon from "../../../../assets/img/Delete.png";
import AddUserPage from "./AddUserPage";
import EmptyPage from "./../../../pages/EmptyPage";
import UsersBulkUpload from "./UsersBulkUpload";

const UsersTable = () => {
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  let [selectedItemCount, setSelectedItemCount] = useState(0);

  let [tableSelectedItems, setTableSelectedItems] = useState([]);

  let { setCanRedirectToLogin, setLoadingState, userData } =
    useContext(ContextComponent);

  let [tableColumns, setTableColumns] = useState([
    "id",
    "select",
    "firstName",
    "lastName",
    "pronoun",
    "region",
    "email",
    "department",
    "brand",
    "title",
    "admin",
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
    firstName: {
      type: "text",
      search: true,
      sort: true,
      title: "First name",
    },
    lastName: {
      type: "text",
      search: true,
      sort: true,
      title: "Last name",
    },
    pronoun: {
      type: "text",
      title: "Pronoun",
    },
    region: {
      type: "text",
      title: "Region",
    },
    email: {
      type: "text",
      search: true,
      title: "Email",
    },
    department: {
      type: "text",
      title: "Department",
    },
    brand: {
      type: "text",
      title: "Brand",
    },
    title: {
      type: "text",
      title: "Title",
    },
    admin: {
      type: "boolean",
      title: "admin",
      disabled: true,
      center: true,
    },
  });

  let [tableData, setTableData] = useState([]);
  let [canRender, setCanRender] = useState(false);
  let [renderDataTable, setRenderDataTable] = useState(false);
  let [renderEmptyPage, setRenderEmptyPage] = useState(false);
  let [updateTable, setUpdateTable] = useState(false);

  const updateTableData = (data) => {
    let userInfo = data;
    let usersArray = [];
    if (!Utils.isObjectEmpty(userInfo)) {
      usersArray = userInfo.map((user, index) => {
        let userTableObj = [];
        let userTableData = [];
        tableColumns.forEach((col) => {
          if (col === "pronoun") {
            let regionValue = userInfo[index][col]
              ? Utils.PRONOUNS[userInfo[index][col]]
              : "";
            userTableData.push(regionValue);
          } else if (col === "region") {
            let regionValue = userInfo[index][col]
              ? Utils.REGIONS[userInfo[index][col]]
              : "";
            userTableData.push(regionValue);
          } else if (col === "select") {
            userTableData.push(false);
          } else if (col === "brand") {
            userTableData.push(userInfo[0].brands[0]);
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

  const success = (res) => {
    setLoadingState({
      applyMask: false,
    });
    updateTableData(res.data);

    setRenderDataTable(res.data.length !== 0);
    setRenderEmptyPage(res.data.length === 0);
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

  const loadAllUsers = () => {
    Utils.getAllUsers().then(success, fail);
  };

  useEffect(() => {
    setLoadingState({
      applyMask: true,
      text: "Loading users",
    });
    loadAllUsers();
  }, []);

  const handleShow = async (e) => {
    if (tableSelectedItems?.length > 0) {
      await setSelectedItemCount(tableSelectedItems?.length);
      setShowDeleteModal(true);
    }
  };

  const handleClose = async (e) => {
    await setSelectedItemCount(tableSelectedItems?.length);
    setShowDeleteModal(false);
  };

  const deleteSuccess = (res) => {
    setUpdateTable(!updateTable);
  };

  const deleteFail = (err) => {
    err?.message?.length && console.log(err);
  };

  const handleDelete = async (e) => {
    setShowDeleteModal(false);
    // setLoadingState({
    //   applyMask: true,
    //   text: "Deleting selected " + tableSelectedItems.length + " items",
    // });
    let tempTableData = tableData.filter((d) => {
      return tableSelectedItems.indexOf(d[0]) === -1;
    });
    setTableData(tempTableData);
    Utils.deleteUsers(tableSelectedItems).then(deleteSuccess, deleteFail);
  };

  let [addModalCanOpen, setAddModalCanOpen] = useState(false);
  let [bulkUploadModalCanOpen, setBulkUploadModalCanOpen] = useState(false);

  const openBulkUploadModal = (e) => {
    e.preventDefault();
    setBulkUploadModalCanOpen(true);
  };
  
  const openAddModal = (e) => {
    e.preventDefault();
    setAddModalCanOpen(true);
  };

  const closeAddModal = (e) => {
    setAddModalCanOpen(false);
  };

  const saveAction = (data) => {
    //console.log(data);
  };

  let REGIONS = Utils.REGIONS;
  let sortedRegions = Object.keys(REGIONS).sort();

  const regionHandler = (e) => {
    let regionId = e.currentTarget.value;

    if (regionId === "clear") {
      loadAllUsers();
    } else {
      const usersFilterSuccess = (res) => {
        console.log(res);
        updateTableData(res.data);
      };
      const usersFilterFail = (err) => {
        err?.message?.length && console.log(err);
      };

      Utils.getFilteredUsers("region", regionId).then(success, fail);
    }
  };

  return (
    <div className="indi-body-cards-wrapper d-flex w-100">
      <div className="indi-add-card-title">
        Users
        <div className="d-none1 w-50 indi-body-actions">
          <div className="indi-body-action" role="button" onClick={handleShow}>
            {/* <img className="indi-w-20" src={DeleteIcon} alt="Delete-icon"></img> */}
            <FloatingLabel label="">
              <Form.Select
                defaultValue="clear"
                id="region"
                size="sm"
                className="indi-input-field indi-input-select-field"
                onChange={regionHandler}
              >
                <option value="clear">All</option>
                {sortedRegions.map((keyName, index) => (
                  <option value={keyName} key={index}>
                    {REGIONS[keyName]}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </div>
          <div
            className="indi-body-action"
            role="button"
            onClick={openBulkUploadModal}
          >
            <img className="indi-w-24 indi-bulk-upload-img" src={BulkUploadIcon} alt="Bulk-upload-icon"></img>
            Bulk upload
          </div>
          <div
            className="indi-body-action"
            role="button"
            onClick={openAddModal}
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
        <>
          {renderDataTable && (
            <DataTable
              minRows={0}
              tableProps={{
                tableColumns,
                tableColumnSchema,
                tableData,
                tableSelectedItems,
                setTableSelectedItems,
              }}
            />
          )}
          {!renderDataTable && (
            <EmptyPage
              props={{
                emptyMessage: "No users are available",
              }}
            />
          )}
        </>
      )}

      <Modal centered show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete confirmation?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete select {selectedItemCount} user(s)?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {addModalCanOpen && (
        <AddUserPage
          props={{
            addModalCanOpen,
            setAddModalCanOpen,
            tableData,
            setTableData,
          }}
        />
      )}
      
      {bulkUploadModalCanOpen && (
        <UsersBulkUpload
          props={{
            addModalCanOpen: bulkUploadModalCanOpen,
            setAddModalCanOpen: setBulkUploadModalCanOpen,
            tableData,
            setTableData,
            success,
          }}
        />
      )}
    </div>
  );
};

export default UsersTable;
