import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Form from "react-bootstrap/Form";

import Utils from "../../../Utils";

const UsersBulkUpload = ({ props }) => {
  let [fileInput, setFileInput] = useState();
  let [fileName, setFileName] = useState("");

  const hideModal = (e) => {
    props.setAddModalCanOpen(false);
  };

  const uploadUsers = (e) => {
    const success = (res) => {
      hideModal();
      // update users table with latest data.
    };
    const fail = (err) => {
      console.log(err);
    };

    let formData = {
      file: fileInput,
    };
    try {
      Utils.bulkUsersUpload(formData).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const fileInputHandler = (e) => {
    let file = e?.currentTarget?.files[0];
    setFileName(file.name);
    setFileInput(file);
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
            <Modal.Title>Bulk users upload</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="indi-add-form-item d-flex flex-row align-items-center">
                <div className="indi-add-form-item-label">
                  Upload excel file:
                </div>
                <div className="indi-add-form-item-input">
                  <input
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    id="iconImage"
                    className="indi-upload-picture-file-input"
                    onChange={fileInputHandler}
                  />
                  <div className="indi-add-img-wrapper"></div>
                </div>
              </div>

              <div className="indi-bulk-upload-file-name indi-img-preview">
                {fileName}
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
                    onClick={uploadUsers}
                  >
                    Upload
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

export default UsersBulkUpload;
