import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import TemplateField from "../../../controls/input.elements/TemplateField";
import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";
import CardContext from "./../cards/CardContext";

const TemplateItem = (props) => {
  let { userData, badgesCtxData } = useContext(ContextComponent);

  let template = props?.template;
  let templateFieldsInfo = [];
  let templateFieldsData = [];
  badgesCtxData?.map((badge) => {
    props?.template?.linkedBadges?.map((linkedBadge) => {
      if (!Utils.isObjectEmpty(linkedBadge[badge.badgeUID])) {
        templateFieldsInfo.push({ [badge.badgeUID]: badge });
        templateFieldsData.push(linkedBadge[badge.badgeUID].defaultValue);
      }
    });
  });

  let [templateFields, setTemplateFields] = useState(templateFieldsInfo || []);

  let [templateName, setTemplateName] = useState(template?.templateName || "");
  let [templateDisplayName, setTemplateDisplayName] = useState(
    template?.templateDisplayName || ""
  );
  let [backgroundImage, setBackgroundImage] = useState(
    template?.backgroundImage || ""
  );
  let [profilePicture, setProfilePicture] = useState(
    template?.profilePicture || ""
  );
  let [logoImage, setLogoImage] = useState(template?.logoImage || "");

  const navigate = useNavigate();

  let tempCardCtxInfo = {};
  tempCardCtxInfo.fields = templateFields;
  tempCardCtxInfo.data = templateFieldsData;
  //setCardCtxInfo(tempCardCtxInfo);

  let [cardCtxInfo, setCardCtxInfo] = useState(tempCardCtxInfo);

  const navigateToTemplateDetailsPage = (e) => {
    e.preventDefault();
    return false;
  };
  return (
    <CardContext.Provider
      value={{
        cardCtxInfo,
        setCardCtxInfo,
      }}
    >
      <div
        onClick={navigateToTemplateDetailsPage}
        className={`indi-card-item-parent card-with-bg ${
          false ? "indi-card-with-actions" : ""
        }`}
        style={{
          background: `url(${backgroundImage})`,
        }}
      >
        <div className="d-none1 indi-card-company-logo-wrapper">
          <img src={logoImage} alt="logoiamge" />
        </div>
        <div className="indi-card-upload-picture">
          <img
            className="indi-card-upload-picture-img"
            src={profilePicture}
            alt="upload img"
          />
        </div>
        <div className="indi-info-wrapper">
          <div className="indi-card-name fw-bold">{userData.firstName} {userData.lastName}</div>
          <div className="indi-card-title">{userData.title}</div>
        </div>
        <div className="indi-card-fields">
          <div className="indi-card-field-wrapper">
            {templateFields?.map((field, index) => (
              <TemplateField
                fieldProps={{
                  fieldType: field,
                  fieldData: templateFieldsData[index],
                  showEmptyField: true,
                }}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="indi-template-title  indi-place-me-bottom-left">{templateName}</div> 
      </div>
    </CardContext.Provider>
  );
};

export default TemplateItem;
