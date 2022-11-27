import React, { useEffect, useState, useRef, useContext } from "react";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";

import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";

const AddressBulkUpload = ({ props }) => {
  let { setAlert } = useContext(ContextComponent);
  let [showAlert, setShowAlert] = useState(false);
  let [fileInput, setFileInput] = useState();
  let [fileName, setFileName] = useState("");
  let bulkUploadFileInput = useRef(null);
  let tableDataSuccess = props.success || (() => {});

  const hideModal = (e) => {
    props.setAddModalCanOpen(false);
  };

  const uploadUsers = (e) => {
    const success = (res) => {
      hideModal();
      setAlert({
        show: true,
        message: "Bulk upload successful!",
      });
      tableDataSuccess(res);
    };
    const fail = (err) => {
      console.log(err);
    };

    let formData = {
      file: bulkUploadFileInput.current.files[0],
    };
    try {
      Utils.bulkAddressUpload(formData).then(success, fail);
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
            <Modal.Title>Bulk address upload</Modal.Title>
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
                    ref={bulkUploadFileInput}
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

      <Alert
        show={showAlert}
        variant="success"
        className="indi-email-sign-copied-to-clipboard-alert"
      >
        <Alert.Heading>Success!</Alert.Heading>
        <p>Successfully uploaded users</p>
      </Alert>
    </>
  );
};

export default AddressBulkUpload;
