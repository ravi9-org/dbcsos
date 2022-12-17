import React, { useEffect, useRef, useState, useContext } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import Utils from "../../Utils";
import ContextComponent from "../../AppContext";

const TextAreaInput = ({schema}) => {
  let fieldData = schema.value || schema.defaultValue || '';
  let fieldClassNames = "indi-add-card-input-field ";
  let fieldName = schema.fieldName;

  let { addrCtxData } = useContext(ContextComponent);

  let [showLookupModal, setShowLookupModal] = useState(false);

  let inputEle = useRef(null);
  let inputTextAreaEle = useRef(null);
  let isRequired = schema?.required || false;

  let [toggleModal, setToggleModal] = useState(false);

  let [addrIds, setAddrIds] = useState(addrCtxData.ids || {});
  let [addrNames, setAddrNames] = useState(addrCtxData.addressNames);
  let [fullAddrValues, setFullAddrValues] = useState(addrCtxData.fullAddresses);

  let currentId = 0;
  let currentIndex = 0;
  let currentAddressName = "";
  let currentAddress = "";
  let currentFullAddress = "";
  if (!!fieldData) {
    currentId = parseInt(fieldData, 10);
    currentIndex = addrCtxData.ids.indexOf(currentId);
    currentAddressName = addrCtxData["addressNames"][currentIndex];
    currentAddress = addrCtxData["addresses"][currentIndex];
    currentFullAddress = addrCtxData["fullAddresses"][currentIndex];
  }

  let [addressId, setAddressId] = useState(currentId);
  let [fullAddressValue, setFullAddressValue] = useState(currentFullAddress);

  const [previewId, setPreviewId] = useState(currentId);
  const [previewIdIndex, setPreviewIdIndex] = useState(currentIndex);
  const [previewFullAddress, setPreviewFullAddress] =
    useState(currentFullAddress || addrCtxData["fullAddresses"][currentIndex]);

  const onChangeInput = (e) => {
    schema.value = e.current.value;
  };

  const showModal = (e) => {
    //setToggleModal(!toggleModal);
    setShowLookupModal(!showLookupModal);
  };

  const handleClose = (e) => {
    setShowLookupModal(false);
  };
  const handleSelect = (e) => {
    console.log("set data and close dialog");
    setShowLookupModal(false);
    console.log(previewId);
    schema.value = previewId;

    inputEle.current.value = previewId;
    inputTextAreaEle.current.value = previewFullAddress;
  };

  // useEffect(() => {
  //   addrIds.length && setShowLookupModal(true);
  // }, [toggleModal]);

  const updatePreview = (e) => {
    let selectedVal = parseInt(e.currentTarget.value, 10);
    let targetIndex = addrIds.indexOf(selectedVal);
    setPreviewId(selectedVal);
    setPreviewIdIndex(targetIndex);
    setPreviewFullAddress(fullAddrValues[targetIndex]);
  };

  return (
    <>
      <div>
        <div>
          <textarea
            className={`indi-add-card-select-address-field`}
            required={isRequired}
            ref={inputTextAreaEle}
            readOnly={true}
            defaultValue={fullAddressValue}
            placeholder={`${fieldName}`}
            onChange={onChangeInput}
            onClick={showModal}
          ></textarea>
        </div>
      </div>
      <input
        type="text"
        id="addr"
        ref={inputEle}
        defaultValue={addressId}
        className={`${fieldClassNames} d-none`}
      />

      <Modal centered show={showLookupModal} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Choose address</Modal.Title>
        </Modal.Header> */}
        <Modal.Body className="indi-select-address-modal-body">
          <FloatingLabel label="Select address">
            <Form.Select
              defaultValue={previewId}
              id="address"
              size="sm"
              className="indi-input-field indi-input-select-field"
              onChange={updatePreview}
            >
              {addrIds?.map((addr, index) => (
                <option value={addr} key={index}>
                  {addrNames[index]}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <div className="indi-modal-addr-preview">
            <div className="indi-modal-addr-preview-full-address">
              {previewFullAddress}
            </div>
          </div>
          <div className="indi-select-address-modal-footer">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSelect}>
              Update
            </Button>
          </div>
        </Modal.Body>
        {/* { <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSelect}>
            Update
          </Button>
        </Modal.Footer> } */}
      </Modal>
    </>
  );
};

export default TextAreaInput;
