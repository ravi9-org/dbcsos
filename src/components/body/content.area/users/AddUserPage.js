import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Form from "react-bootstrap/Form";

import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";

const AddUserPage = ({ props }) => {
  let { setAlert, setLoadingState } = useContext(ContextComponent);
  let tableData = props?.tableData || [];
  let setTableData = props?.setTableData || (() => {});
  let REGIONS = Utils.REGIONS || {};
  let PRONOUNS = Utils.PRONOUNS || {};
  let SALUATATION = Utils.SALUATATION || {};
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [pronoun, setPronoun] = useState("");
  let [saluatation, setSaluatation] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [department, setDepartment] = useState("");
  let [brand, setBrand] = useState("");
  let [region, setRegion] = useState(Object.keys(REGIONS)[0]);
  let [title, setTitle] = useState("");
  let [admin, setAdmin] = useState(false);
  let [picture, setPicture] = useState("");

  const hideModal = (e) => {
    props.setAddModalCanOpen(false);
  };

  const saveUser = (e) => {
    setLoadingState({
      applyMask: true,
      text: "Creating user",
    });
    const success = (res) => {
      hideModal();
      setLoadingState({
        applyMask: false
      });
      setAlert({
        show: true,
        message: "User added successfully!",
        type: "success",
      });
      let newRecord = [
        res.data.user.id,
        false,
        res.data.user.firstName,
        res.data.user.lastName,
        res.data.user.pronoun,
        res.data.user.email,
        res.data.user.department,
        res.data.user.brand,
        res.data.user.region,
        res.data.user.title,
        res.data.user.admin /*,
        res.data.user.picture,*/,
      ];
      let tempTableData = [...tableData];
      tempTableData.push(newRecord);
      setTableData(tempTableData);
    };
    const fail = (err) => {
      setLoadingState({
        applyMask: false
      });
      setAlert({
        show: true,
        message: "User addition failed",
        type: "error",
      });
      console.log(err);
    };

    let formData = {
      firstName,
      lastName,
      pronoun,
      email,
      password,
      department,
      brand,
      region,
      title,
      admin,
      picture,
    };
    try {
      // debugger;
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

  const saluatationHandler = (e) => {
    let value = e?.currentTarget?.value || saluatation;
    setSaluatation(value);
  };

  const pronounHandler = (e) => {
    let value = e?.currentTarget?.value || pronoun;
    setPronoun(value);
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

  const regionHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setRegion(value);
  };

  const titleHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setTitle(value);
  };

  const adminHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setAdmin(true);
  };

  useEffect(() => {}, [props.addModalCanOpen]);

  const handleClose = (e) => {
    props.setAddModalCanOpen(false);
  };

  let [brandsDataAvailable, setBrandsDataAvailable] = useState(false);
  let [brands, setBrands] = useState([]);

  const brandsFetchSuccess = (res) => {
    console.log(res);
    setBrands(res.data);
    setBrandsDataAvailable(true);
    setBrand(res.data[0].name);
  };
  const brandsFetchFail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    Utils.getBrands().then(brandsFetchSuccess, brandsFetchFail);
  }, []);

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
                    <FloatingLabel label="Saluatation">
                      <Form.Select
                        defaultValue={saluatation}
                        id="saluatation"
                        onChange={saluatationHandler}
                        size="sm"
                        className="indi-input-field indi-input-select-field"
                      >
                        {Object.keys(SALUATATION).map((keyName, index) => (
                          <option value={keyName} key={index}>
                            {SALUATATION[keyName]}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Pronoun">
                      <Form.Select
                        defaultValue={pronoun}
                        id="pronoun"
                        onChange={pronounHandler}
                        size="sm"
                        className="indi-input-field indi-input-select-field"
                      >
                        {Object.keys(PRONOUNS).map((keyName, index) => (
                          <option value={keyName} key={index}>
                            {PRONOUNS[keyName]}
                          </option>
                        ))}
                      </Form.Select>
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
                    <FloatingLabel label="Region">
                      <Form.Select
                        defaultValue={region}
                        id="region"
                        size="sm"
                        className="indi-input-field indi-input-select-field"
                        onChange={regionHandler}
                      >
                        {Object.keys(REGIONS).map((keyName, index) => (
                          <option value={keyName} key={index}>
                            {REGIONS[keyName]}
                          </option>
                        ))}
                      </Form.Select>
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
                    {brandsDataAvailable && (
                      <FloatingLabel label="Brand">
                        <Form.Select
                          defaultValue={brands[0].name}
                          id="brand"
                          size="sm"
                          className="indi-input-field indi-input-select-field"
                          onChange={brandHandler}
                        >
                          {brands?.map((brand, index) => (
                            <option value={brand.name} key={index}>
                              {brand.name}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    )}
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
                      id="admin"
                      label="is admin?"
                      onChange={adminHandler}
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
