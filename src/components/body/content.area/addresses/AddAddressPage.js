import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { Button, Modal, Alert } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Form from "react-bootstrap/Form";

import Utils from "../../../Utils";

const AddAddressPage = ({ props }) => {
  let tableData = props?.tableData || [];
  let setTableData = props?.setTableData || (() => {});
  let [name, setName] = useState("");
  let [address, setAddress] = useState("");

  const hideModal = (e) => {
    props.setAddModalCanOpen(false);
  };

  const saveAddress = (e) => {
    const success = (res) => {
      hideModal();
      let newRecord = [res.data.id, false, res.data.name, res.data.address];
      let tempTableData = [...tableData];
      tempTableData.push(newRecord);
      setTableData(tempTableData);
    };
    const fail = (err) => {
      console.log(err);
    };

    let formData = {
      name: name,
      address: address,
    };

    try {
      Utils.addAddress(formData).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const nameHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setName(value);
  };

  const addressHandler = (e) => {
    let value = e.currentTarget.value;
    setAddress(value);
  };

  useEffect(() => {}, [props.addModalCanOpen]);

  const handleClose = (e) => {
    props.setAddModalCanOpen(false);
  };

  return (
    <>
      {
        <Modal centered show={props.addModalCanOpen} onHide={handleClose}>
          <Modal.Body>
            <form>
              <div className="indi-add-form-wrapper d-flex flex-column">
                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Name">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="name"
                        placeholder="Enter name"
                        autoComplete="off"
                        onChange={nameHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Address">
                      <Form.Control
                        type="textarea"
                        className="indi-input-field indi-input-textarea-field"
                        id="address"
                        placeholder="Enter address"
                        autoComplete="off"
                        onChange={addressHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>
              </div>

              <div className="indi-add-footer">
                <div className="indi-add-page-footer-btn-wrapper">
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
                    onClick={saveAddress}
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

export default AddAddressPage;
