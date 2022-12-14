import React, { useState, useContext, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import DataTable from "../../../controls/table/DataTable";
import EditIcon from "../../../../assets/img/Edit.png";
import AddIcon from "../../../../assets/img/add.png";
import DeleteIcon from "../../../../assets/img/Delete.png";
import AddBadgePage from "./AddBadgePage";
import EditBadgePage from "./EditBadgePage";

const BadgesTable = () => {
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  let [selectedItemCount, setSelectedItemCount] = useState(0);
  const DISABLED_ICON = "indi-disable-action-icon";
  let [editIconClass, setEditIconClass] = useState(DISABLED_ICON);

  let [tableSelectedItems, setTableSelectedItems] = useState([]);
  let [badgeIdForEdit, setBadgeIdForEdit] = useState("");

  useEffect(() => {
    if (tableSelectedItems.length === 1) {
      setEditIconClass("");
      setBadgeIdForEdit(tableSelectedItems[0]);
    } else {
      setEditIconClass(DISABLED_ICON);
      setBadgeIdForEdit("");
    }
  }, [tableSelectedItems]);

  let { setCanRedirectToLogin, setLoadingState, setAlert } =
    useContext(ContextComponent);

  let [tableColumns, setTableColumns] = useState([
    "id",
    "select",
    // "edit",
    "name",
    "iconImage",
    "darkIconImage",
    "prefixurl",
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
    // edit: {
    //   type: "image",
    //   title: "Edit",
    // },
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
      classes: "text-center",
    },
    darkIconImage: {
      type: "image",
      title: "Icon label",
      center: true,
      classes: "indi-apply-dark-background text-center",
    },
    prefixurl: {
      type: "text",
      title: "Prefix Url",
    },
    type: {
      type: "text",
      title: "Type",
    },
  });

  let [tableData, setTableData] = useState([]);
  let [canRender, setCanRender] = useState(false);
  let [updateTable, setUpdateTable] = useState(false);
  let [allBadges, setAllBadges] = useState([]);

  const success = (res) => {
    setLoadingState({
      applyMask: false,
    });
    let badgesInfo = res?.data;
    let usersArray = [];
    if (!Utils.isObjectEmpty(badgesInfo)) {
      setAllBadges(res.data);
      usersArray = badgesInfo.map((user, index) => {
        let userTableObj = [];
        let userTableData = [];
        tableColumns.forEach((col) => {
          if (col === "type") {
            let fieldType =
              badgesInfo[index][col] === "text"
                ? "phone"
                : badgesInfo[index][col];

            let badgeDisplayName = Utils.BADGE_TYPES[fieldType].label;
            userTableData.push(badgeDisplayName);
          } else if (col === "id") {
            userTableData.push(badgesInfo[index].id);
          } else if (col === "select") {
            userTableData.push(false);
          } else if (col === "username") {
            userTableData.push(
              badgesInfo[index].firstName + " " + badgesInfo[index].lastName
            );
          } else {
            userTableData.push(badgesInfo[index][col]);
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

  const loadFreshBadges = () => {
    Utils.getBadges().then(success, fail);
  };

  useEffect(() => {
    setLoadingState({
      applyMask: true,
      text: "Loading badges",
    });
    loadFreshBadges();
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
      message: "Successfully deleted badge(s)!",
    });

    setUpdateTable(!updateTable);
  };

  const deleteFail = (err) => {
    err?.message?.length && console.log(err);
  };

  const handleDelete = async (e) => {
    // console.log("in handleDelete");
    setShowDeleteModal(false);
    let tempTableData = tableData.filter((d) => {
      return tableSelectedItems.indexOf(d[0]) === -1;
    });
    setTableData(tempTableData);
    Utils.deleteBadges(tableSelectedItems).then(deleteSuccess, deleteFail);
  };

  let [addModalCanOpen, setAddModalCanOpen] = useState(false);

  const openAddModal = (e) => {
    e.preventDefault();
    setAddModalCanOpen(true);
  };

  let [editModalCanOpen, setEditModalCanOpen] = useState(false);
  let [editableBadge, setEditableBadge] = useState({});
  let [editableBadgeIndex, setEditableBadgeIndex] = useState(-1);

  const openEditModal = (e) => {
    e.preventDefault();
    setEditModalCanOpen(true);
    let targetBadge = {};
    allBadges.forEach((badge, index) => {
      if (badge.id === badgeIdForEdit) {
        targetBadge = badge;
        setEditableBadgeIndex(index);
      }
    });
    !Utils.isObjectEmpty(targetBadge) && setEditableBadge(targetBadge);
  };

  useEffect(() => {}, [editableBadge]);

  const closeAddModal = (e) => {
    setAddModalCanOpen(false);
  };

  const closeEditModal = (e) => {
    setEditModalCanOpen(false);
  };

  return (
    <div className="indi-body-cards-wrapper d-flex w-100">
      <div className="indi-add-card-title">
        Badges
        <div className="d-none1 w-50 indi-body-actions">
          <div
            className="indi-body-action"
            role="button"
            onClick={openAddModal}
          >
            <img className="indi-w-20" src={AddIcon} alt="add-icon"></img>
            Add
          </div>
          <div
            className={`indi-body-action aaa ${editIconClass}`}
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
        <AddBadgePage
          props={{
            addModalCanOpen,
            setAddModalCanOpen,
            tableData,
            setTableData,
          }}
        />
      )}

      {editModalCanOpen && (
        <EditBadgePage
          props={{
            editModalCanOpen,
            setEditModalCanOpen,
            tableData,
            setTableData,
            editableBadge,
            editableBadgeIndex,
            allBadges,
            setAllBadges,
          }}
        />
      )}
    </div>
  );
};

export default BadgesTable;
