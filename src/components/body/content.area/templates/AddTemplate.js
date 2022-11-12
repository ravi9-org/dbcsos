import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Table, Form, Accordion, Button, FloatingLabel } from "react-bootstrap";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";

const AddTemplate = () => {
  const navigate = useNavigate();
  let { userData, badgesCtxData } = useContext(ContextComponent);
  let [canRender, setCanRnder] = useState(false);

  useEffect(() => {
    if (userData?.id && !Utils.isObjectEmpty(badgesCtxData)) {
      //console.log(badgesCtxData);
      setCanRnder(true);
    }
  }, [userData, badgesCtxData]);

  let [imgDataArray, setImgDataArray] = useState(["", "", ""]);

  const updateSelectedBadgeInfo = (e) => {};
  const updateSelectedUserInfo = (e) => {};
  let [userFields, setUserFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    department: false,
    organization: false,
    title: false,
  });
  const updateUserField = (e) => {
    let id = e.currentTarget.id;
    let tempUserFields = { ...userFields };
    tempUserFields[id] = e.currentTarget.checked;
    setUserFields({ ...userFields, ...tempUserFields });
  };
  const templateNameHandler = (e) => {
    setTempalteName(e.currentTarget.value);
  };
  const onChangeImage = async (e) => {
    let file = e.currentTarget.files[0];
    let targetIndex = parseInt(
      e.currentTarget.attributes["imgindex"].value,
      10
    );
    document
      .querySelector(".indi-add-img-wrapper-" + targetIndex)
      .classList.add("d-none");
    let imgPreviewEle = document.querySelector(
      ".indi-add-img-wrapper-preview-" + targetIndex
    );
    imgPreviewEle.classList.remove("d-none");
    await Utils.fileToDataUri(file).then((dataUri) => {
      imgDataArray[targetIndex] = dataUri;
      imgPreviewEle.src = dataUri;
      setImgDataArray(imgDataArray);
    });
  };

  let [templateName, setTempalteName] = useState("");
  let [backgroundImage, setBackgroundImage] = useState("");

  const onSaveTemplate = (e) => {
    let linkedBadges = [];
    let linkedUserFields = [];

    badgesCtxData.map((badge) => {
      let selectItem = document.querySelector(
        ".indi-template-badge-select-" + badge.badgeUID + " input"
      );
      if (selectItem.checked) {
        let isConstant = document.querySelector(
          ".indi-template-badge-constant-" + badge.badgeUID + " input"
        ).checked;
        let isDefault = document.querySelector(
          ".indi-template-badge-isdefault-" + badge.badgeUID + " input"
        ).checked;
        let isMultiple = document.querySelector(
          ".indi-template-badge-multiple-" + badge.badgeUID + " input"
        ).checked;
        let defaulValue =
          document.querySelector(
            ".indi-template-badge-defaultvalue-" + badge.badgeUID
          ).value || "";
        linkedBadges.push({
          [badge.badgeUID]: {
            constant: isConstant,
            isDefault: isDefault,
            multiple: isMultiple,
            defaultValue: defaulValue,
          },
        });
      }
    });

    let selectedUserFields = [];

    Object.keys(userFields).map((userField) => {
      let userFieldCheckboxEle = document.querySelector("#" + userField);
      userFieldCheckboxEle.checked && selectedUserFields.push(userField);
    });

    let templateInfo = {
      templateName,
      backgroundImage: imgDataArray[0],
      logoImage: imgDataArray[1],
      profilePicture: imgDataArray[2],
      linkedBadges: linkedBadges,
      linkedUserFields: selectedUserFields,
    };
    submitTemplateForm(templateInfo);

    return false;
  };

  const submitTemplateForm = (info) => {
    const success = (res) => {
      navigate(Utils.APP_URLS.TEMPLATES_PAGE);
    };
    const fail = (err) => {
      console.log(err);
    };

    try {
      Utils.addNewTemplate(info).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const navigateToTemplatesListPage = (e) => {
    navigate(Utils.APP_URLS.TEMPLATES_PAGE);
  };

  return (
    <>
      {canRender && (
        <form className="indi-add-template-form">
          <div>
            <div className="indi-body-title">Add template</div>
            <div className="indi-data-table-wrapper d-flex indi-text-btn-row">
              <FloatingLabel label="Template name">
                <Form.Control
                  type="text"
                  className="indi-input-field"
                  id="name"
                  placeholder="Enter template name"
                  autoComplete="off"
                  onChange={templateNameHandler}
                />
              </FloatingLabel>
              <div className="indi-right-button-wrapper">
                <Button onClick={onSaveTemplate}>Save</Button>
                <Button onClick={navigateToTemplatesListPage}>Cancel</Button>
              </div>
            </div>
          </div>
          <Accordion className="indi-data-table-wrapper" defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Image uploads</Accordion.Header>
              <Accordion.Body>
                <Table responsive="sm">
                  <thead className="indi-data-table-header">
                    <tr>
                      <th>Image place</th>
                      <th className="text-center">Upload</th>
                      <th className="text-center">Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-first-name">
                        Template background image
                      </td>

                      <td className="indi-data-table-td-template-image text-center">
                        <div className="indi-add-form-item-input indi-upload-picture-file-input-wrapper">
                          <input
                            type="file"
                            id="iconImage"
                            imgindex={0}
                            className="indi-upload-picture-file-input"
                            onChange={onChangeImage}
                          />
                          <div className="indi-add-img-wrapper"></div>
                        </div>
                      </td>

                      <td className="indi-data-table-td-template-img-prevew text-center">
                        <div className="indi-add-img-wrapper-0">no preview</div>
                        <img
                          src=""
                          alt="background"
                          className="d-none indi-add-img-wrapper-preview indi-add-img-wrapper-preview-0"
                        />
                      </td>
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-last-name">
                        Template logo image
                      </td>

                      <td className="indi-data-table-td-template-image text-center">
                        <div className="indi-add-form-item-input indi-upload-picture-file-input-wrapper">
                          <input
                            type="file"
                            imgindex={1}
                            id="iconImage"
                            className="indi-upload-picture-file-input"
                            onChange={onChangeImage}
                          />
                          <div className="indi-add-img-wrapper"></div>
                        </div>
                      </td>

                      <td className="indi-data-table-td-template-img-prevew text-center">
                        <div className="indi-add-img-wrapper-1">no preview</div>
                        <img
                          src=""
                          alt="background"
                          className="d-none indi-add-img-wrapper-preview indi-add-img-wrapper-preview-1"
                        />
                      </td>
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-user-email">
                        Template profile picture
                      </td>

                      <td className="indi-data-table-td-template-image text-center">
                        <div className="indi-add-form-item-input indi-upload-picture-file-input-wrapper">
                          <input
                            type="file"
                            imgindex={2}
                            id="iconImage"
                            className="indi-upload-picture-file-input"
                            onChange={onChangeImage}
                          />
                          <div className="indi-add-img-wrapper"></div>
                        </div>
                      </td>

                      <td className="indi-data-table-td-template-img-prevew text-center">
                        <div className="indi-add-img-wrapper-2">no preview</div>
                        <img
                          src=""
                          alt="background"
                          className="d-none indi-add-img-wrapper-preview indi-add-img-wrapper-preview-2"
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Badges selection</Accordion.Header>
              <Accordion.Body>
                <Table responsive="sm">
                  <thead className="indi-data-table-header">
                    <tr>
                      <th>Select </th>
                      <th>Badge name </th>
                      <th>Badge icon </th>
                      <th>Constant </th>
                      <th>isDefault? </th>
                      <th>Multiple </th>
                      {/* <th>Required </th> */}
                      <th>Default value </th>
                    </tr>
                  </thead>
                  <tbody>
                    {badgesCtxData?.map((badge, index) => (
                      <tr key={index} className="indi-data-table-tr">
                        <td className="indi-data-table-td-badge-id">
                          <Form.Check
                            type="checkbox"
                            className={`indi-template-badge-select-${badge.badgeUID}`}
                            badgeuid={badge?.badgeUID}
                            onChange={updateSelectedBadgeInfo}
                            id={badge?.id}
                          />
                        </td>

                        <td className="indi-data-table-td-badge-name">
                          {badge?.name}
                        </td>

                        <td className="indi-data-table-td-badge-logo text-center">
                          <img
                            src={badge.iconImage}
                            className="indi-add-template-badge-icon-image"
                            alt="icon"
                          />
                        </td>

                        <td className="indi-data-table-td-badge-constant text-center">
                          <Form.Check
                            type="checkbox"
                            className={`indi-template-badge-constant-${badge.badgeUID}`}
                            id={`badge-constant-${badge?.id}`}
                          />
                        </td>

                        <td className="indi-data-table-td-badge-isdefault text-center">
                          <Form.Check
                            type="checkbox"
                            className={`indi-template-badge-isdefault-${badge.badgeUID}`}
                            id={`badge-isdefault-${badge?.id}`}
                          />
                        </td>

                        <td className="indi-data-table-td-badge-multiple text-center">
                          <Form.Check
                            type="checkbox"
                            className={`indi-template-badge-multiple-${badge.badgeUID}`}
                            id={`badge-multiple-${badge?.id}`}
                          />
                        </td>

                        {/* <td className="indi-data-table-td-badge-required text-center">
                          <Form.Check
                            type="checkbox"
                            id={`badge-required-${badge?.id}`}
                          />
                        </td> */}

                        <td className="indi-data-table-td-badge-defaultvalue">
                          <Form.Control
                            type="text"
                            className={`indi-template-badge-defaultvalue-${badge.badgeUID}`}
                            id={`badge-defaultvalue-${badge?.id}`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>User fields selection</Accordion.Header>
              <Accordion.Body>
                <Table responsive="sm">
                  <thead className="indi-data-table-header">
                    <tr>
                      <th>Select </th>
                      <th>Field name </th>
                      {/* <th>Shuffle</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-first-name">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserField}
                          id="firstName"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">
                        First name
                      </td>

                      {/* <td className="indi-data-table-td-badge-logo">Shuffle</td> */}
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-last-name">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserField}
                          id="lastName"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">
                        Last name
                      </td>

                      {/* <td className="indi-data-table-td-badge-logo">Shuffle</td> */}
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-user-email">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserField}
                          id="email"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">Email</td>

                      {/* <td className="indi-data-table-td-badge-logo">Shuffle</td> */}
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-department">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserField}
                          id="department"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">
                        Department
                      </td>

                      {/* <td className="indi-data-table-td-badge-logo">Shuffle</td> */}
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-organization">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserField}
                          id="organization"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">
                        Organization
                      </td>

                      {/* <td className="indi-data-table-td-badge-logo">Shuffle</td> */}
                    </tr>

                    <tr className="indi-data-table-tr">
                      <td className="indi-data-table-td-badge-title">
                        <Form.Check
                          type="checkbox"
                          onChange={updateUserField}
                          id="title"
                        />
                      </td>

                      <td className="indi-data-table-td-badge-name">Title</td>

                      {/* <td className="indi-data-table-td-badge-logo">Shuffle</td> */}
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </form>
      )}
    </>
  );
};

export default AddTemplate;
