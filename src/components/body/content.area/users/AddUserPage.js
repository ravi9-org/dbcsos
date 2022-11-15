import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { Button, Modal, Alert } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Form from "react-bootstrap/Form";

import Utils from "../../../Utils";

const AddUserPage = ({ props }) => {
  let tableData = props?.tableData || [];
  let setTableData = props?.setTableData || (() => {});
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [department, setDepartment] = useState("");
  let [brand, setBrand] = useState("");
  let [title, setTitle] = useState("");
  let [isAdmin, setIsAdmin] = useState(false);
  let [picture, setPicture] = useState("");

  const hideModal = (e) => {
    props.setAddModalCanOpen(false);
  };

  const saveUser = (e) => {
    const success = (res) => {
      hideModal();
      let newRecord = [
        res.data.user.id,
        false,
        res.data.user.firstName,
        res.data.user.lastName,
        res.data.user.email,
        res.data.user.department,
        res.data.user.brand,
        res.data.user.title,
        res.data.user.isAdmin/*,
        res.data.user.picture,*/
      ];
      let tempTableData = [...tableData];
      tempTableData.push(newRecord);
      setTableData(tempTableData);
    };
    const fail = (err) => {
      console.log(err);
    };

    let formData = {
      firstName,
      lastName,
      email,
      password,
      department,
      brand,
      title,
      isAdmin,
      picture,
    };

    try {
      Utils.addUser(formData).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const firstNameHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setFirstName(value);
  };

  const lastNameHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setLastName(value);
  };

  const emailHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setEmail(value);
  };

  const passwordHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setPassword(value);
  };

  const departmentHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setDepartment(value);
  };

  const brandHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setBrand(value);
  };

  const titleHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setTitle(value);
  };

  const isAdminHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setIsAdmin(value);
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
            <Modal.Title>Add new user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="indi-add-form-wrapper d-flex flex-column">
                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="First name">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="firstName"
                        placeholder="Enter first name"
                        autoComplete="off"
                        onChange={firstNameHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Last name">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="lastName"
                        placeholder="Enter last name"
                        autoComplete="off"
                        onChange={lastNameHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="E-mail">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="email"
                        placeholder="Enter email"
                        autoComplete="off"
                        onChange={emailHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Initial password">
                      <Form.Control
                        type="password"
                        className="indi-input-field"
                        id="password"
                        placeholder="Enter initial password"
                        autoComplete="off"
                        onChange={passwordHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Department">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="department"
                        placeholder="Enter department"
                        autoComplete="off"
                        onChange={departmentHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Brand">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="brand"
                        placeholder="Enter brand"
                        autoComplete="off"
                        onChange={brandHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Title">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="title"
                        placeholder="Enter title"
                        autoComplete="off"
                        onChange={titleHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex">
                  <div className="indi-add-form-item-input">
                    <Form.Check
                      type="switch"
                      className="indi-input-switch-field indi-input-field"
                      id="isadmin"
                      label="is admin?"
                      onChange={isAdminHandler}
                    />
                  </div>
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
                    onClick={saveUser}
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

export default AddUserPage;
