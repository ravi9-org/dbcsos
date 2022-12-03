import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";

const EditBadgePage = ({ props }) => {
  let { setAlert } = useContext(ContextComponent);
  let tableData = props?.tableData || [];
  let editableBadge = props?.editableBadge || {};
  let editableBadgeIndex = props?.editableBadgeIndex || {};

  let setTableData = props?.setTableData || (() => {});
  let [badgeName, setBadgeName] = useState(editableBadge.name || "");
  let [prefixUrl, setPrefixUrl] = useState(editableBadge.prefixurl || "");
  let [badgeType, setBadgeType] = useState(editableBadge.type || "text");
  let [badgeIconImage, setBadgeIconImage] = useState(
    editableBadge.iconImage || ""
  );
  let [badgeDarkIconImage, setBadgeDarkIconImage] = useState(
    editableBadge.darkIconImage || ""
  );
  //   let [badgeUID, setBadgeUID] = useState(editableBadge.badgeUID || "");

  useEffect(() => {}, [prefixUrl]);

  const hideModal = (e) => {
    props.setEditModalCanOpen(false);
  };

  const updateBadge = (e) => {
    const success = (res) => {
      setAlert({
        show: true,
        message: "Successfully updated badge!",
      });
      hideModal();
      let updatedRecord = [
        res.data.id,
        false,
        res.data.name,
        res.data.iconImage,
        res.data.darkIconImage,
        res.data.prefixurl,
        res.data.type,
      ];
      let tempTableData = [...tableData];
      tempTableData[editableBadgeIndex] = updatedRecord;
      setTableData(tempTableData);

      let tempAllBadges = [...props?.allBadges];
      let currentBadge = tempAllBadges[editableBadgeIndex];

      currentBadge.name = updatedRecord[2];
      currentBadge.prefixurl = updatedRecord[5];
      currentBadge.iconImage = updatedRecord[3];
      currentBadge.darkIconImage = updatedRecord[4];
      currentBadge.type = updatedRecord[6];

      props?.setAllBadges(tempAllBadges);
    };
    const fail = (err) => {
      setAlert({
        show: false,
      });
      console.log(err);
    };

    let formData = {
      iconImage: badgeIconImage,
      darkIconImage: badgeDarkIconImage,
      name: badgeName,
      prefixurl: prefixUrl,
      badgeUID: editableBadge.badgeUID,
      type: badgeType,
    };

    try {
      Utils.editBadge(formData, editableBadge.id).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const nameHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setBadgeName(value);
  };

  const prefixUrlHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    setPrefixUrl(value);
  };

  const selectHandler = (e) => {
    let value = e.currentTarget.value;
    setBadgeType(value);
  };

  const fileToDataUri = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  let [iconImagePreview, setIconImagePreview] = useState(
    editableBadge.iconImage || ""
  );
  let [iconDarkImagePreview, setDarkIconImagePreview] = useState(
    editableBadge.darkIconImage || ""
  );

  const updateGeneralImageInfo = async (file, callback, setFun) => {
    await fileToDataUri(file).then((dataUri) => {
      callback(dataUri);
      setFun(dataUri);
    });
  };

  const updateImageInfo = async (e) => {
    e.preventDefault();
    let file = e.currentTarget.files[0];
    await updateGeneralImageInfo(file, setBadgeIconImage, setIconImagePreview);
  };

  const updateDarkImageInfo = async (e) => {
    e.preventDefault();
    let file = e.currentTarget.files[0];
    await updateGeneralImageInfo(
      file,
      setBadgeDarkIconImage,
      setDarkIconImagePreview
    );
  };

  useEffect(() => {}, [props.editModalCanOpen]);

  const handleClose = (e) => {
    props.setEditModalCanOpen(false);
  };

  return (
    <>
      {
        <Modal centered show={props.editModalCanOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit badge</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="indi-add-form-wrapper d-flex flex-column">
                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Badge name">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="name"
                        defaultValue={badgeName}
                        placeholder="Enter badge name"
                        autoComplete="off"
                        onChange={nameHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Prefix Url">
                      <Form.Control
                        type="text"
                        className="indi-input-field"
                        id="prefixUrl"
                        defaultValue={prefixUrl}
                        placeholder="Enter prefix url"
                        autoComplete="off"
                        onChange={prefixUrlHandler}
                      />
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-column">
                  <div className="indi-add-form-item-input row">
                    <FloatingLabel label="Badge type">
                      <Form.Select
                        defaultValue={badgeType}
                        id="type"
                        onChange={selectHandler}
                        size="sm"
                        className="indi-input-field indi-input-select-field"
                      >
                        {Object.keys(Utils.BADGE_TYPES).map(
                          (badgeKey, index) => (
                            <option value={badgeKey} key={index}>
                              {Utils.BADGE_TYPES[badgeKey].label}
                            </option>
                          )
                        )}
                      </Form.Select>
                    </FloatingLabel>
                  </div>
                </div>

                <div className="indi-add-form-item d-flex flex-row align-items-center">
                  <div className="indi-add-form-item-label">
                    Upload image for ribbon
                  </div>
                  <div className="indi-add-form-item-input">
                    <input
                      type="file"
                      id="iconImage"
                      className="indi-upload-picture-file-input"
                      onChange={updateImageInfo}
                    />
                    <div className="indi-add-img-wrapper"></div>
                  </div>
                  <div
                    className="indi-img-preview"
                    style={{ backgroundImage: `url(${iconImagePreview})` }}
                  ></div>
                </div>

                <div className="indi-add-form-item d-flex flex-row align-items-center">
                  <div className="indi-add-form-item-label">
                    Upload image for form
                  </div>
                  <div className="indi-add-form-item-input">
                    <input
                      type="file"
                      id="darkIconImage"
                      className="indi-upload-picture-file-input"
                      onChange={updateDarkImageInfo}
                    />
                    <div className="indi-add-img-wrapper"></div>
                  </div>
                  <div
                    className="indi-img-preview"
                    style={{ backgroundImage: `url(${iconDarkImagePreview})` }}
                  ></div>
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
                    onClick={updateBadge}
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

export default EditBadgePage;
