import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";
import ProfilePicture from "./../../../../assets/img/default-profile.png";

const Settings = () => {
  let { userData, setUserData } = useContext(ContextComponent);

  let [canRender, setCanRender] = useState(false);
  let [userInfo, setUserInfo] = useState({});
  let [profilePicture, setProfilePicture] = useState(ProfilePicture);

  useEffect(() => {
    if (!Utils.isObjectEmpty(userData)) {
      if (!!userData.picture) {
        setProfilePicture(userData.picture);
      }
      setUserInfo(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (!Utils.isObjectEmpty(userInfo)) {
      //console.log(userInfo);
      setCanRender(true);
    }
  }, [userInfo]);

  // return;
  // {
  //   canRender && <>user settings page</>;
  // }

  let [showProfileModal, setShowProfileModal] = useState(false);
  let [modalTitle, setModalTitle] = useState("");
  let [postfix, setPostfix] = useState("");

  const handleClose = () => {
    setShowProfileModal(false);
  };

  const openModal = (fieldsToUpdate) => {
    setShowProfileModal(true);
  };

  const allowEmailEdit = (e) => {
    setModalTitle("Change your email ID");
    setPostfix("email");
    openModal("email");
  };

  const allowResetPassword = (e) => {
    setModalTitle("Reset password");
    setPostfix("resetpassword");
    openModal("password");
  };

  const allowProfileEdit = (e) => {
    setModalTitle("Update profile");
    setPostfix("profile");
    openModal("profile");
  };

  const profileFieldChangeHandler = (e) => {
    let fieldName = e.currentTarget.id || "";
    let fieldObj = {};
    fieldObj[fieldName] = e.currentTarget.value;
  };

  let obj = {
    email: ["email"],
    resetpassword: ["password", "confirmPassword"],
    profile: ["firstName", "lastName", "title", "department", "organization", "picture"],
  };

  let [errorMessage, setErrorMessage] = useState("");

  // let [userProfilePicture, setUserProfilePicture] = useState(
  //   userData.picture || ProfilePicture
  // );

  const fileChangeHandler = async (e) => {
    let file = e.currentTarget.files[0];
    await Utils.fileToDataUri(file).then((dataUri) => {
      setProfilePicture(dataUri);
    });
  }

  const handleUpdate = (e) => {
    let userObjToBeSubmit = {};
    if (postfix === "resetpassword") {
      let emptyExists = false;
      let newPwd = "";
      let conNewPwd = "";
      obj[postfix].map((fieldKey, index) => {
        let pwdValue = document.querySelector("#" + fieldKey).value || "";
        index === 0 && (newPwd = pwdValue);
        index === 1 && (conNewPwd = pwdValue);
        pwdValue.trim().length === 0 && (emptyExists = true);
      });
      if (emptyExists) {
        setErrorMessage("All fields are mandatory");
        return false;
      }

      if (newPwd !== conNewPwd) {
        setErrorMessage("New password and confirm passwords are not matched.");
        return false;
      }
      setErrorMessage("");
      userObjToBeSubmit["password"] = newPwd;
    } else {
      obj[postfix].map((fieldKey, index) => {
        userObjToBeSubmit[fieldKey] = document.querySelector(
          "#" + fieldKey
        ).value;
      });
    }
    const success = (response) => {
      setErrorMessage("");
      setUserData(response.data);
      handleClose();
    };

    const fail = (err) => {
      err?.message?.length && console.log(err);
      setErrorMessage(err);
    };
    Utils.editUser(userObjToBeSubmit, userData.id).then(success, fail);
  };

  

  return (
    <>
      <Modal centered show={showProfileModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="indi-modal-edit-user-profile-header-title">
            {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={`indi-modal-edit-user-profile-email-section indi-modal-edit-user-profile-${postfix}`}
          >
            <FloatingLabel label="Email">
              <Form.Control
                type="text"
                className="indi-input-field"
                id="email"
                placeholder="Enter email"
                autoComplete="off"
                defaultValue={userData.email}
                onChange={profileFieldChangeHandler}
              />
            </FloatingLabel>
          </div>
          <div
            className={`indi-modal-edit-user-profile-resetpassword-section indi-modal-edit-user-profile-${postfix}`}
          >
            <div>
              <FloatingLabel
                label="New password"
                className="indi-modal-edit-user-profile-floating-inputs"
              >
                <Form.Control
                  type="password"
                  className="indi-input-field"
                  id="password"
                  placeholder="Enter new password"
                  autoComplete="off"
                  onChange={profileFieldChangeHandler}
                />
              </FloatingLabel>
              <FloatingLabel
                label="Confirm password"
                className="indi-modal-edit-user-profile-floating-inputs"
              >
                <Form.Control
                  type="password"
                  className="indi-input-field"
                  id="confirmPassword"
                  placeholder="Enter confirm password"
                  autoComplete="off"
                  onChange={profileFieldChangeHandler}
                />
              </FloatingLabel>
            </div>
          </div>
          <div
            className={`indi-modal-edit-user-profile-profile-section indi-modal-edit-user-profile-${postfix}`}
          >
            <div>
              <div className="indi-card-upload-picture-file-input-wrapper">
                <input
                  type="file"
                  onChange={fileChangeHandler}
                  className="indi-card-upload-picture-file-input"
                />
                <input type="hidden" id="picture" defaultValue={profilePicture} />
                <img
                  className="indi-card-upload-picture-img-input"
                  src={profilePicture}
                  alt="profilepic"
                />
              </div>
            </div>
            <FloatingLabel
              label="First name"
              className="indi-modal-edit-user-profile-floating-inputs"
            >
              <Form.Control
                type="text"
                className="indi-input-field"
                id="firstName"
                placeholder="Enter first name"
                autoComplete="off"
                defaultValue={userData.firstName}
                onChange={profileFieldChangeHandler}
              />
            </FloatingLabel>
            <FloatingLabel
              label="Last name"
              className="indi-modal-edit-user-profile-floating-inputs"
            >
              <Form.Control
                type="text"
                className="indi-input-field"
                id="lastName"
                placeholder="Enter last name"
                autoComplete="off"
                defaultValue={userData.lastName}
                onChange={profileFieldChangeHandler}
              />
            </FloatingLabel>
            <FloatingLabel
              label="Title"
              className="indi-modal-edit-user-profile-floating-inputs"
            >
              <Form.Control
                type="text"
                className="indi-input-field"
                id="title"
                placeholder="Enter title"
                autoComplete="off"
                defaultValue={userData.title}
                onChange={profileFieldChangeHandler}
              />
            </FloatingLabel>
            <FloatingLabel
              label="Department"
              className="indi-modal-edit-user-profile-floating-inputs"
            >
              <Form.Control
                type="text"
                className="indi-input-field"
                id="department"
                placeholder="Enter department"
                autoComplete="off"
                defaultValue={userData.department}
                onChange={profileFieldChangeHandler}
              />
            </FloatingLabel>
            <FloatingLabel
              label="Organization"
              className="indi-modal-edit-user-profile-floating-inputs"
            >
              <Form.Control
                type="text"
                className="indi-input-field"
                id="organization"
                placeholder="Enter organization"
                autoComplete="off"
                defaultValue={userData.organization}
                onChange={profileFieldChangeHandler}
              />
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="indi-user-profile-settings-error-msg">
            {errorMessage}
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {canRender && (
        <div className="d-flex indi-user-settings-page-wrapper">
          <div className="indi-user-settings-page-header w-100">
            User settings page
          </div>
          <div className="d-flex">
            <div className="indi-user-settings-page-account indi-user-settings-page-card">
              <div className="indi-user-settings-page-card-header d-flex">
                <img
                  className="indi-user-settings-page-card-header-img"
                  src={ProfilePicture}
                  alt=""
                />{" "}
                <div className="indi-user-settings-page-card-header-label">
                  Account
                </div>
              </div>
              <div className="indi-user-settings-page-card-inner d-flex">
                <div
                  role="button"
                  onClick={allowEmailEdit}
                  className="indi-user-settings-page-change-email d-flex indi-user-settings-page-card-inner-item"
                >
                  <div className="indi-user-settings-page-change-email-label">
                    Change your email ID
                  </div>
                  <div className="indi-user-settings-page-change-email-value">
                    {userInfo.email}
                  </div>
                </div>

                <div
                  role="button"
                  onClick={allowResetPassword}
                  className="indi-user-settings-page-reset-password indi-user-settings-page-card-inner-item"
                >
                  Reset password
                </div>
              </div>
            </div>

            <div className="indi-user-settings-page-profile indi-user-settings-page-card">
              <div className="indi-user-settings-page-card-header d-flex">
                <img
                  className="indi-user-settings-page-card-header-img"
                  src={ProfilePicture}
                  alt=""
                />{" "}
                <div className="indi-user-settings-page-card-header-label">
                  Profiles
                </div>
              </div>
              <div
                role="button"
                onClick={allowProfileEdit}
                className="indi-user-settings-page-card-inner d-flex"
              >
                <div className="indi-user-settings-page-image-wrapper">
                  <img
                    className="indi-user-settings-page-image"
                    src={profilePicture}
                    alt="profile"
                  />
                </div>
                <div className="indi-user-settings-page-display-name">
                  {userInfo.firstName} {userInfo.lastName}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
