import React, { useState, useContext, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import DataTable from "../../../controls/table/DataTable";
import AddIcon from "../../../../assets/img/add.png";
import EditIcon from "../../../../assets/img/Edit.png";
import DeleteIcon from "../../../../assets/img/Delete.png";
import AddAddressPage from "./AddAddressPage";
import AddressBulkUpload from "./AddressBulkUpload";
import BulkUploadIcon from "../../../../assets/img/Upload.png";
import EditAddressPage from "./EditAddressPage";

const AddressesTable = () => {
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  let [selectedItemCount, setSelectedItemCount] = useState(0);

  const DISABLED_ICON = "indi-disable-action-icon";
  let [editIconClass, setEditIconClass] = useState(DISABLED_ICON);

  let [tableSelectedItems, setTableSelectedItems] = useState([]);
  let [addressIdForEdit, setAddressIdForEdit] = useState("");

  useEffect(() => {
    if (tableSelectedItems.length === 1) {
      setEditIconClass("");
      setAddressIdForEdit(tableSelectedItems[0]);
    } else {
      setEditIconClass(DISABLED_ICON);
      setAddressIdForEdit("");
    }
  }, [tableSelectedItems]);

  let { setCanRedirectToLogin, setLoadingState, setAlert } =
    useContext(ContextComponent);

  let [tableColumns, setTableColumns] = useState([
    "id",
    "select",
    "name",
    "brand",
    "address",
    "city",
    "country",
    "zip",
    "longitude",
    "latitude",
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
      title: "Name",
    },
    brand: {
      type: "text",
      title: "Brand",
    },
    address: {
      type: "text",
      title: "Address",
    },
    city: {
      type: "text",
      title: "City",
    },
    country: {
      type: "text",
      title: "Country",
    },
    zip: {
      type: "text",
      title: "Zip code",
    },
    longitude: {
      type: "text",
      title: "Longitude",
    },
    latitude: {
      type: "text",
      title: "Latitude",
    },
  });

  let [tableData, setTableData] = useState([]);
  let [canRender, setCanRender] = useState(false);
  let [updateTable, setUpdateTable] = useState(false);
  let [allAddresses, setAllAddresses] = useState([]);

  const success = (res) => {
    setAllAddresses(res.data);
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

  const loadFreshAddresses = () => {
    Utils.getAddresses().then(success, fail);
  };

  useEffect(() => {
    setLoadingState({
      applyMask: true,
      text: "Loading addresses",
    });
    loadFreshAddresses();
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
    setAlert({
      show: true,
      message: "Successfully deleted!",
    });
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
    Utils.deleteAddresses(tableSelectedItems).then(deleteSuccess, deleteFail);
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

  let [editModalCanOpen, setEditModalCanOpen] = useState(false);
  let [editableAddress, setEditableAddress] = useState({});
  let [editableAddressIndex, setEditableAddressIndex] = useState(-1);

  const openEditModal = (e) => {
    e.preventDefault();
    setEditModalCanOpen(true);
    let targetAddress = {};
    allAddresses.forEach((address, index) => {
      if (address.id === addressIdForEdit) {
        targetAddress = address;
        setEditableAddressIndex(index);
      }
    });
    !Utils.isObjectEmpty(targetAddress) && setEditableAddress(targetAddress);
  };

  useEffect(() => {}, [editableAddress]);

  const closeAddModal = (e) => {
    setAddModalCanOpen(false);
  };

  return (
    <div className="indi-body-cards-wrapper d-flex w-100">
      <div className="indi-add-card-title">
        Addresses
        <div className="d-none1 w-50 indi-body-actions">
          <div
            className="indi-body-action"
            role="button"
            onClick={openBulkUploadModal}
          >
            <img
              className="indi-w-24 indi-bulk-upload-img"
              src={BulkUploadIcon}
              alt="Bulk-upload-icon"
            ></img>
            Bulk upload
          </div>
          <div
            className="indi-body-action"
            role="button"
            onClick={openAddModal}
          >
            <img className="indi-w-20" src={AddIcon} alt="add-icon"></img>
            Add
          </div>
          <div
            className={`indi-body-action ${editIconClass}`}
            role="button"
            onClick={openEditModal}
          >
            <img className="indi-w-20" src={EditIcon} alt="edit-icon"></img>
            Edit
          </div>

          <div className="indi-body-action" role="button" onClick={handleShow}>
            <img className="indi-w-20" src={DeleteIcon} alt="Delete-icon"></img>
            Delete
          </div>
        </div>
      </div>
      {canRender && (
        <DataTable
          tableProps={{
            tableColumns,
            tableColumnSchema,
            tableData,
            tableSelectedItems,
            setTableSelectedItems,
          }}
        />
      )}

      <Modal centered show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete confirmation?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete select {selectedItemCount} item(s)?
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
        <AddAddressPage
          props={{
            addModalCanOpen,
            setAddModalCanOpen,
            tableData,
            setTableData,
          }}
        />
      )}

      {bulkUploadModalCanOpen && (
        <AddressBulkUpload
          props={{
            addModalCanOpen: bulkUploadModalCanOpen,
            setAddModalCanOpen: setBulkUploadModalCanOpen,
            tableData,
            setTableData,
            success,
          }}
        />
      )}

      {editModalCanOpen && (
        <EditAddressPage
          props={{
            editModalCanOpen,
            setEditModalCanOpen,
            tableData,
            setTableData,
            editableAddress,
            editableAddressIndex,
            allAddresses,
            setAllAddresses,
          }}
        />
      )}
    </div>
  );
};

export default AddressesTable;
