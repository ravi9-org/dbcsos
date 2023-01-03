import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Modal, OverlayTrigger, Popover, Form } from "react-bootstrap";

import { Cropper } from "react-cropper";

import ContextComponent from "../../../AppContext";
import CardContext from "../cards/CardContext";
import Field from "../../../controls/input.elements/Field";
import Utils from "../../../Utils";

const AddCardItem = ({ props }) => {
  let { userData } = useContext(ContextComponent);
  let { cardCtxInfo } = useContext(CardContext);

  let [pronoun, setPronoun] = useState(Utils.PRONOUNS[userData.pronoun]);
  let [saluatation, setSaluatation] = useState(Utils.SALUATATION[userData?.saluatation ?? ""]);

  let pageMode = props.pageMode ?? "add";

  let inputCardImage = useRef(null);

  let croppedInputCardImage = useRef(null);

  const cropperRef = useRef(null);
  const rangeInput = useRef(null);

  const onCropMove = (e) => {
    // TODO: remove this
    const cropper = cropperRef.current.cropper;
    const { width, height } = cropper.getCroppedCanvas();
  };

  let [cardImage, setCardImage] = useState(cardCtxInfo?.cardImage || "");
  let [croppedImage, setCroppedImage] = useState(
    cardCtxInfo?.croppedImage || cardImage || ""
  );
  let [cardName, setCardName] = useState(cardCtxInfo?.cardName || "");

  const onChangeCardName = (e) => {
    let cardNameValue = e?.currentTarget?.value || "";
    setCardName(cardNameValue);
  };
  let [cardCustomID, setCardCustomID] = useState(cardCtxInfo?.customId || "");

  const onChangeCardCustomID = (e) => {
    let cardCustomIDValue = e?.currentTarget?.value || "";
    setCardCustomID(cardCustomIDValue);
  };

  useEffect(() => {
    console.log(" rendering AddEditCardItem...");
  }, [cardCtxInfo]);

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

  let zoomDefaultValue = 1;
  let prev = 1;

  const rangeHandler = (e) => {
    cropper.zoomTo(e.target.value);
  };
  return (
    <div
      className="indi-card-item-parent indi-add-card-wrapper card-with-bg"
      style={{
        background: `url(${cardCtxInfo.templateInfo.backgroundImage})`,
      }}
    >
      <div className="d-none1 indi-card-company-logo-wrapper">
        <img src={cardCtxInfo.templateInfo.logoImage} alt="logoiamge" />
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
          {saluatation} {userData.firstName} {userData.lastName} ({pronoun})
        </div>
        <div className="indi-card-title">{userData.title}</div>
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
          <div className="indi-card-field-item d-flex">
            <div className={`indi-card-field-item-img}`}></div>
            <input
              type="text"
              className="indi-add-card-custom-id-input"
              required={true}
              defaultValue={cardCustomID}
              placeholder="Enter friendly id"
              onChange={onChangeCardCustomID}
            ></input>
          </div>
          {cardCtxInfo.userLinkedBadges?.map((field, index) => (
            <Field
              fieldIndex={index}
              field={field}
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
                  zoomTo={zoomDefaultValue}
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
                  // crop={(event) => {
                  //   console.log(event.detail);
                  // }}
                  zoom={(e) => {
                    let rangeValue = zoomDefaultValue;
                    // console.log("zoom", e.detail.ratio);
                    if (e.detail.ratio > 5) {
                      e.preventDefault();
                      rangeValue = 5;
                    } else if (prev === e.detail.ratio && e.detail.ratio < 2) {
                      rangeValue = 1;
                    } else {
                      rangeValue = e.detail.ratio;
                    }
                    rangeValue !== 1 && (prev = rangeValue);
                    rangeInput.current.value = rangeValue;
                  }}
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

          <div className="indi-range-input">
            <Form.Range
              min={1.5}
              max={5}
              step={0.1}
              defaultValue={zoomDefaultValue}
              onChange={rangeHandler}
              ref={rangeInput}
            />
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
