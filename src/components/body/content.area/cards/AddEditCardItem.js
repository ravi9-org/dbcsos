import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Modal, Alert, OverlayTrigger, Popover } from "react-bootstrap";

import { Cropper } from "react-cropper";

import ContextComponent from "../../../AppContext";
import CardContext from "../cards/CardContext";
import Field from "../../../controls/input.elements/Field";

const AddCardItem = ({ props }) => {
  let { userData } = useContext(ContextComponent);
  let { cardCtxInfo, setCardCtxInfo } = useContext(CardContext);
  let cardInitialData = props.cardInitialData,
    setNewCardData = props.setNewCardData,
    pageMode = props.pageMode || "add",
    inputElementClassNames = props.inputElementClassNames || "";

  let inputCardImage = useRef();
  let croppedInputCardImage = useRef();

  const cropperRef = useRef(null);

  const onCropMove = (e) => {
    // TODO: remove this
    const cropper = cropperRef.current.cropper;
    const { width, height } = cropper.getCroppedCanvas();
  };

  let [cardData, setCardData] = useState(cardInitialData || {});
  let [fields, setFields] = useState(cardInitialData.fields || []);
  let [fieldsData, setFieldsData] = useState(cardInitialData.fieldsData || {});
  let [cardImage, setCardImage] = useState(cardInitialData?.cardImage || "");
  let [croppedImage, setCroppedImage] = useState(
    cardInitialData?.croppedImage || cardImage || ""
  );

  const [showModal, setShowModal] = useState(false);
  const [cardImageOnModal, setCardImageOnModal] = useState(cardImage);

  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();

  let [fieldsSchema, setFieldsSchema] = useState(
    cardInitialData.fieldsSchema || {}
  );

  useEffect(() => {
    console.log(" something needs to be add here... ");
  }, [cardCtxInfo]);

  const fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const inputFileHandler = async (e) => {
    let file = inputCardImage.current.files[0];
    await fileToDataUri(file).then((dataUri) => {
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
        <div>Please upload image in this format:</div>
        <div>Type: JPEG, PNG, WebP, GID, AVIF, TIFF and SVG</div>
        <div>Quality setting: 80</div>
        <div>Size: 2048 X 2048 pixels</div>
        <div>Colorspace: RGB</div>
        <div>Max file size: 4 MB</div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div
      className="indi-card-item-parent indi-add-card-wrapper card-with-bg"
      style={{
        background: `url(${cardData.backgroundImage})`,
      }}
    >
      <div className="d-none1 indi-card-company-logo-wrapper">
        <img src={cardData.logoImage} alt="logoiamge" />
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
          {fields?.map((field, index) => (
            <Field
              fieldProps={{
                fieldType: field,
                inputElementClassNames,
                filedSchema: fieldsSchema[field],
                fieldData: fieldsData[index],
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
                  <div className="indi-crop-card-info-btn" role="button">
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
