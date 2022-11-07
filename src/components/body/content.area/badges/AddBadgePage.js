import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";

import Utils from "../../../Utils";

const AddBadgePage = () => {
  const navigate = useNavigate();

  const goBack = (e) => {
    navigate(Utils.APP_URLS.NEW_BADGES_PAGE);
  };

  let inputElementClassNames = "indi-any-input-element";
  let imageInputElementClassNames = "indi-image-input-element";
  let croppedImageInputElementClassNames = "indi-cropped-image-input-element";

  let [badgeData, setBadgeData] = useState({
    iconImage: "",
    darkIconImage: "",
    name: "",
    badgeId: "",
    type: "",
  });

  const saveBadge = (e) => {
    const success = (res) => {
      goBack();
    };
    const fail = (err) => {
      console.log(err);
    };

    try {
      Utils.addNewBadge(badgeData).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const nameHandler = (e) => {
    let value = e?.currentTarget?.value || "";
    let badgeId = value.trim().replaceAll(" ", "").toLowerCase();
    console.log("selected value : " + value);
    let obj = { name: value, badgeId: badgeId };
    setBadgeData({ ...badgeData, ...obj });
  };

  const selectHandler = (e) => {
    let value = e.currentTarget.value;
    console.log("selected value : " + value);
    let obj = { type: value };
    setBadgeData({ ...badgeData, ...obj });
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

  const updateImageInfo = async (e) => {
    e.preventDefault();
    let file = e.currentTarget.files[0];
    let key = e.currentTarget.id;
    await fileToDataUri(file).then((dataUri) => {
      let obj = {};
      obj[key] = dataUri;
      setBadgeData({ ...badgeData, ...obj });
    });
  };

  return (
    <>
      {
        <form>
          <div className="indi-add-card-wrapper d-flex flex-column">
            <div className="indi-add-card-title">Add badge</div>

            <div className="indi-card-item-parent indi-add-card-wrapper card-with-bg indi-badge-add-form-div">
              <div className="indi-badge-img-upload-field">
                <input
                  type="file"
                  id="iconImage"
                  className="indi-badge-upload-picture-file-input"
                  onChange={updateImageInfo}
                />
                <div className="indi-badge-img-upload-label">
                  Upload icon image
                </div>
              </div>

              <div className="indi-badge-img-upload-field">
                <input
                  type="file"
                  id="darkIconImage"
                  className="indi-badge-upload-picture-file-input"
                  onChange={updateImageInfo}
                />
                <div className="indi-badge-img-upload-label">
                  Upload icon image for dark theme
                </div>
              </div>

              <div className="indi-card-field-item indi-add-badge-items-wrapper d-flex">
                <input
                  type="text"
                  className="indi-badge-input-field"
                  id="name"
                  onChange={nameHandler}
                  placeholder="Enter badge name"
                ></input>

                <Form.Select
                  defaultValue="text"
                  id="type"
                  onChange={selectHandler}
                  size="sm"
                  className="indi-badge-input-field indi-badge-input-select-field"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                  <option value="boolean">Boolean</option>
                </Form.Select>
              </div>
            </div>

            <div className="indi-add-card-item-footer d-flex d-flex-row">
              <div className="indi-add-badge-page-footer-btn-wrapper d-flex d-flex-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={goBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveBadge}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      }
    </>
  );
};

export default AddBadgePage;
