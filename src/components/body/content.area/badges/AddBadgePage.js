import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { Button, Modal, Alert } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Form from "react-bootstrap/Form";

import Utils from "../../../Utils";

const AddBadgePage = ({ props }) => {
  let tableData = props?.tableData || [];
  let setTableData = props?.setTableData || (() => {});
  let [badgeName, setBadgeName] = useState("");
  let [badgeType, setBadgeType] = useState("text");
  let [badgeIconImage, setBadgeIconImage] = useState("");
  let [badgeDarkIconImage, setBadgeDarkIconImage] = useState("");
  let [badgeUID, setBadgeUID] = useState("");

  const hideModal = (e) => {
    props.setAddModalCanOpen(false);
  };

  const saveBadge = (e) => {
    const success = (res) => {
      hideModal();
      let newRecord = [
        res.data.id,
        false,
        res.data.name,
        res.data.iconImage,
        res.data.darkIconImage,
        res.data.type,
      ];
      let tempTableData = [...tableData];
      tempTableData.push(newRecord);
      setTableData(tempTableData);
    };
    const fail = (err) => {
      console.log(err);
    };

    let formData = {
      iconImage: badgeIconImage,
      darkIconImage: badgeDarkIconImage,
      name: badgeName,
      badgeUID: badgeUID,
      type: badgeType,
    };

    try {
      Utils.addBadge(formData).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const nameHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    let badgeUID = value.trim().replaceAll(" ", "").toLowerCase();
    setBadgeName(value);
    setBadgeUID(badgeUID);
  };

  const selectHandler = (e) => {
    let value = e.currentTarget.value;
    setBadgeType(value);
  };

  const fileToDataUri = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  let [iconImagePreview, setIconImagePreview] = useState("");
  let [iconDarkImagePreview, setDarkIconImagePreview] = useState("");

  const updateGeneralImageInfo = async (file, callback, setFun) => {
    await fileToDataUri(file).then((dataUri) => {
      callback(dataUri);
      setFun(dataUri);
    });
  };

  const updateImageInfo = async (e) => {
    e.preventDefault();
    let file = e.currentTarget.files[0];
    await updateGeneralImageInfo(file, setBadgeIconImage, setIconImagePreview);
  };

  const updateDarkImageInfo = async (e) => {
    e.preventDefault();
    let file = e.currentTarget.files[0];
    await updateGeneralImageInfo(
      file,
      setBadgeDarkIconImage,
      setDarkIconImagePreview
    );
  };

  useEffect(() => {}, [props.addModalCanOpen]);

  const handleClose = (e) => {
    props.setAddModalCanOpen(false);
  };

  return (
    <>
      {
        <Modal centered show={props.addModalCanOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new badge</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="indi-add-form-wrapper d-flex flex-column">
                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Badge name">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="name"
                        placeholder="Enter badge name"
                        autoComplete="off"
                        onChange={nameHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Badge type">
                      <Form.Select
                        defaultValue="text"
                        id="type"
                        onChange={selectHandler}
                        size="sm"
                        className="indi-input-field indi-input-select-field"
                      >
                        <option value="text">Text</option>
                        <option value="textarea">Textarea</option>
                        <option value="select">Select</option>
                        <option value="boolean">Boolean</option>
                      </Form.Select>
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-row align-items-center">
                  <div className="indi-add-form-item-label">
                    Upload image for ribbon
                  </div>
                  <div className="indi-add-form-item-input">
                    <input
                      type="file"
                      id="iconImage"
                      className="indi-upload-picture-file-input"
                      onChange={updateImageInfo}
                    />
                    <div className="indi-add-img-wrapper"></div>
                  </div>
                  <div
                    className="indi-img-preview"
                    style={{ background: `url(${iconImagePreview})` }}
                  ></div>
                </div>

                <div className="indi-add-form-item d-flex flex-row align-items-center">
                  <div className="indi-add-form-item-label">
                    Upload image for form
                  </div>
                  <div className="indi-add-form-item-input">
                    <input
                      type="file"
                      id="darkIconImage"
                      className="indi-upload-picture-file-input"
                      onChange={updateDarkImageInfo}
                    />
                    <div className="indi-add-img-wrapper"></div>
                  </div>
                  <div
                    className="indi-img-preview"
                    style={{ background: `url(${iconDarkImagePreview})` }}
                  ></div>
                </div>
              </div>

              <div className="indi-add-footer">
                <div className="indi-add-page-footer-btn-wrapper float-right">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={hideModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={saveBadge}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      }
    </>
  );
};

export default AddBadgePage;
