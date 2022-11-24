import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { Button, Modal, Alert } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Form from "react-bootstrap/Form";

import Utils from "../../../Utils";

const AddAddressPage = ({ props }) => {
  let tableData = props?.tableData || [];
  let setTableData = props?.setTableData || (() => {});
  let [fullAddress, setFullAddress] = useState({});

  const hideModal = (e) => {
    props.setAddModalCanOpen(false);
  };

  const saveAddress = (e) => {
    const success = (res) => {
      hideModal();
      let newRecord = [
        res.data.id,
        false,
        res.data.name,
        res.data.address,
        res.data.brand,
        res.data.city,
        res.data.country,
        res.data.zip,
        res.data.longitude,
        res.data.latitude,
        res.data.contact,
      ];
      let tempTableData = [...tableData];
      tempTableData.push(newRecord);
      setTableData(tempTableData);
    };
    const fail = (err) => {
      console.log(err);
    };

    let formData = fullAddress;
    formData["brand"] = selectedBrandValue;
    try {
      Utils.addAddress(formData).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const inputHandler = (e) => {
    let value = e.currentTarget.value;
    let key = e.currentTarget.id;
    setFullAddress({ ...fullAddress, [key]: value });
  };

  useEffect(() => {}, [props.addModalCanOpen]);

  const handleClose = (e) => {
    props.setAddModalCanOpen(false);
  };

  let [brandsDataAvailable, setBrandsDataAvailable] = useState(false);
  let [brands, setBrands] = useState([]);
  let [selectedBrandValue, setSelectedBrandValue] = useState("");

  const brandsFetchSuccess = (res) => {
    console.log(res);
    setBrands(res.data);
    setBrandsDataAvailable(true);
    setSelectedBrandValue(res.data[0].name);
  };
  const brandsFetchFail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    Utils.getBrands().then(brandsFetchSuccess, brandsFetchFail);
  }, []);

  const updateBrandValue = e => {
    let selectedBrandName = e.currentTarget.value;
    setSelectedBrandValue(selectedBrandName);
  }

  return (
    <>
      {
        <Modal centered show={props.addModalCanOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new address</Modal.Title>
          </Modal.Header>
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
                        onChange={inputHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    {brandsDataAvailable && (
                      <FloatingLabel label="Select brand">
                        <Form.Select
                          defaultValue={brands[0].name}
                          id="brand"
                          size="sm"
                          className="indi-input-field indi-input-select-field"
                          onChange={updateBrandValue}
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
                    <FloatingLabel label="Address">
                      <Form.Control
                        type="textarea"
                        className="indi-input-field indi-input-textarea-field"
                        id="address"
                        placeholder="Enter address"
                        autoComplete="off"
                        onChange={inputHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="City">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="city"
                        placeholder="Enter city"
                        autoComplete="off"
                        onChange={inputHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Country">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="country"
                        placeholder="Enter country"
                        autoComplete="off"
                        onChange={inputHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Zip code">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="zip"
                        placeholder="Enter zip code"
                        autoComplete="off"
                        onChange={inputHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Longitude">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="longitude"
                        placeholder="Enter longitude"
                        autoComplete="off"
                        onChange={inputHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Latitude">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="latitude"
                        placeholder="Enter latitude"
                        autoComplete="off"
                        onChange={inputHandler}
                      />
                    </FloatingLabel>
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
