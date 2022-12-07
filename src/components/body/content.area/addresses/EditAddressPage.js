import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";

const EditAddressPage = ({ props }) => {
  let { setAlert, setLoadingState } = useContext(ContextComponent);
  let tableData = props?.tableData || [];

  let editableAddress = props?.editableAddress || {};
  let editableAddressIndex = props?.editableAddressIndex || {};

  let setTableData = props?.setTableData || (() => {});
  let [fullAddress, setFullAddress] = useState({});

  const hideModal = (e) => {
    props.setEditModalCanOpen(false);
  };

  const editAddress = (e) => {
    setLoadingState({
      applyMask: true,
      text: "Updating address",
    });
    const success = (res) => {
      setLoadingState({
        applyMask: false,
      });
      setAlert({
        show: true,
        message: "Successfully updated address!",
      });
      hideModal();
      let updatedRecord = [
        res.data.id,
        false,
        res.data.name,
        res.data.brand.name,
        res.data.address,
        res.data.city,
        res.data.country,
        res.data.zip,
        res.data.longitude,
        res.data.latitude,
        res.data.contact,
      ];
      let tempTableData = [...tableData];
      tempTableData[editableAddressIndex] = updatedRecord;
      setTableData(tempTableData);

      let tempAllAddresses = [...props?.allAddresses];
      let currentAddress = tempAllAddresses[editableAddressIndex];

      currentAddress.name = updatedRecord[2];
      currentAddress.address = updatedRecord[3];
      currentAddress.brand = updatedRecord[4];
      currentAddress.city = updatedRecord[5];
      currentAddress.country = updatedRecord[6];
      currentAddress.zip = updatedRecord[7];
      currentAddress.longitude = updatedRecord[8];
      currentAddress.latitude = updatedRecord[9];
      currentAddress.contact = updatedRecord[10];

      props?.setAllAddresses(tempAllAddresses);
    };
    const fail = (err) => {
      setLoadingState({
        applyMask: false,
      });
      setAlert({
        show: true,
        message: "Updating address failed!",
      });
      console.log(err);
    };

    let formData = fullAddress;
    formData["brand"] = selectedBrandValue;
    try {
      Utils.editAddress(formData, props.editableAddress.id).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const inputHandler = (e) => {
    let value = e.currentTarget.value;
    let key = e.currentTarget.id;
    setFullAddress({ ...fullAddress, [key]: value });
  };

  useEffect(() => {}, [props.editModalCanOpen]);

  const handleClose = (e) => {
    props.setEditModalCanOpen(false);
  };

  let [brandsDataAvailable, setBrandsDataAvailable] = useState(false);
  let [brands, setBrands] = useState([]);
  let [selectedBrandValue, setSelectedBrandValue] = useState("");

  const brandsFetchSuccess = (res) => {
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

  const updateBrandValue = (e) => {
    let selectedBrandName = e.currentTarget.value;
    setSelectedBrandValue(selectedBrandName);
  };

  return (
    <>
      {
        <Modal centered show={props.editModalCanOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit address</Modal.Title>
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
                        defaultValue={editableAddress.name}
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
                          defaultValue={editableAddress.brand}
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
                        as="textarea"
                        defaultValue={editableAddress.address}
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
                        defaultValue={editableAddress.city}
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
                        defaultValue={editableAddress.country}
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
                        defaultValue={editableAddress.zip}
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
                        defaultValue={editableAddress.longitude}
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
                        defaultValue={editableAddress.latitude}
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
                    onClick={editAddress}
                  >
                    Update
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

export default EditAddressPage;
