import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Modal, Alert, OverlayTrigger, Popover } from "react-bootstrap";

import { Cropper } from "react-cropper";

import ContextComponent from "../../../AppContext";
import CardContext from "../cards/CardContext";
import Field from "../../../controls/input.elements/Field";
import Utils from "../../../Utils";

const AddCardItem = ({ props }) => {
  let pageInfo = props?.pageInfo || {};
  let templateInfo = pageInfo?.template || {};
  let cardInfo = pageInfo?.card || {};

  let { userData } = useContext(ContextComponent);
  let { cardCtxInfo } = useContext(CardContext);

  let pageMode = props.pageMode || "add";

  let inputElementClassNames = props.inputElementClassNames || "";

  let templateBadges = templateInfo.linkedBadges;

  let inputCardImage = useRef(null);

  let croppedInputCardImage = useRef(null);

  const cropperRef = useRef(null);

  const onCropMove = (e) => {
    // TODO: remove this
    const cropper = cropperRef.current.cropper;
    const { width, height } = cropper.getCroppedCanvas();
  };

  let [fields, setFields] = useState(cardInfo.userLinkedBadges || []);
  let [fieldsData, setFieldsData] = useState(cardInfo.fieldsData || {});
  let [cardImage, setCardImage] = useState(cardInfo?.cardImage || "");
  let [croppedImage, setCroppedImage] = useState(
    cardInfo?.croppedImage || cardImage || ""
  );
  let [cardName, setCardName] = useState(cardInfo?.cardName || "");

  const onChangeCardName = (e) => {
    let cardNameValue = e?.currentTarget?.value || "";
    setCardName(cardNameValue);
  };

  useEffect(() => {
    setFields(cardCtxInfo.userLinkedBadges);
    setFieldsData(cardCtxInfo.fieldsData);
  }, [cardCtxInfo.userLinkedBadges]);

  const [showModal, setShowModal] = useState(false);
  const [cardImageOnModal, setCardImageOnModal] = useState(cardImage);

  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();

  const inputFileHandler = async (e) => {
    let file = inputCardImage.current.files[0];
    await Utils.fileToDataUri(file).then((dataUri) => {
      setCardImage(dataUri);
      setCardImageOnModal(dataUri);
      setShowModal(true);
    });
  };

  const handleClose = (e) => {
    setShowModal(false);
  };

  const handleDoCrop = (e) => {
    setShowModal(false);
    let canvas = cropper.getCroppedCanvas();
    let dataUrl = canvas.toDataURL();
    setCroppedImage(dataUrl);
    croppedInputCardImage.current.value = dataUrl;
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div>
          <b>Please upload image in this format:</b>
        </div>
        <div>
          <b>Type:</b>JPEG, PNG, WebP, GID, AVIF, TIFF and SVG
        </div>
        <div>
          <b>Quality setting:</b> 80
        </div>
        <div>
          <b>Size:</b> 2048 X 2048 pixels
        </div>
        <div>
          <b>Colorspace:</b> RGB
        </div>
        <div>
          <b>Max file size:</b> 4 MB
        </div>
      </Popover.Body>
    </Popover>
  );

  // fields?.map((field, index) => { 
  //   console.log(field);
  //   debugger;
  // });
  return (
    <div
      className="indi-card-item-parent indi-add-card-wrapper card-with-bg"
      style={{
        background: `url(${templateInfo.backgroundImage})`,
      }}
    >
      <div className="d-none1 indi-card-company-logo-wrapper">
        <img src={templateInfo.logoImage} alt="logoiamge" />
      </div>

      <div className="indi-card-upload-picture indi-card-upload-picture-with-no-bg">
        <input
          type="file"
          className="indi-card-upload-picture-file-input"
          ref={inputCardImage}
          onChange={inputFileHandler}
        />
        <img
          src={croppedImage}
          className="indi-card-upload-picture-card-image"
          alt="card pic"
        />
        <input
          type="hidden"
          className="indi-image-input-element"
          value={cardImage}
        />
        <input
          type="hidden"
          ref={croppedInputCardImage}
          className="indi-cropped-image-input-element"
          value={croppedImage}
        />
      </div>
      <div className="indi-info-wrapper">
        <div className="indi-card-name fw-bold">
          {userData.firstName} {userData.lastName}
        </div>
        <div className="indi-card-title">{userData.designation}</div>
      </div>
      <div className="indi-card-fields">
        <div className="indi-card-field-wrapper">
          <div className="indi-card-field-item d-flex">
            <div className={`indi-card-field-item-img}`}></div>
            <input
              type="text"
              className="indi-add-card-name-input"
              required={true}
              defaultValue={cardName}
              //placeholder={`Enter ${fieldName}`}
              placeholder="Enter card name"
              onChange={onChangeCardName}
            ></input>
          </div>
          {fields?.map((field, index) => (
            <Field
              fieldIndex={index}
              fieldProps={{
                fieldSchema: field,
                fieldType: field.badgeUID,
                inputElementClassNames,
                fieldData: fieldsData[index],
                templateBadges,
              }}
              pageMode={pageMode}
              key={index}
            />
          ))}
        </div>
      </div>

      <Modal centered show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Insert image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <div className="indi-crop-dialog-modal-img-wrapper">
                <img
                  src={cardImageOnModal}
                  className="d-none indi-card-upload-picture-card-image-on-modal"
                  alt="card pic"
                />
                <div
                  className="box d-none"
                  style={{ width: "50%", float: "right" }}
                >
                  <div
                    className="img-preview"
                    style={{
                      width: "100%",
                      float: "left",
                      height: "300px",
                      maxWidth: "100px",
                      maxHeight: "100px",
                      overflow: "hidden",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <Cropper
                  style={{ height: "200px", width: "100%" }}
                  ref={cropperRef}
                  cropmove={onCropMove}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={cardImageOnModal}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  guides={true}
                />

                <OverlayTrigger
                  trigger="click"
                  placement="bottom-start"
                  overlay={popover}
                >
                  <div
                    className="indi-crop-card-info-btn indi-place-me-top-right"
                    role="button"
                  >
                    i
                  </div>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          <div className="indi-modal-card-crop-btn-wrapper">
            <Button variant="primary" onClick={handleDoCrop}>
              Save
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCardItem;
