import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import TemplateField from "../../../controls/input.elements/TemplateField";
import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";
import CardContext from "./../cards/CardContext";

const TemplateItem = (props) => {
  let { userData } = useContext(ContextComponent);

  let template = props?.template;
  let templateFieldsInfo = [];
  let templateFieldsData = [];
  let badgesCtxData = [];
  // if (template.linkedBadges.length) {
  //   let badgesCtxData = template.linkedBadges;
  //   badgesCtxData?.map((badge) => {
  //     props?.template?.linkedBadges?.map((linkedBadge) => {
  //       // if (!Utils.isObjectEmpty(linkedBadge[badge.badgeUID])) {
  //         templateFieldsInfo.push({ [badge.badgeUID]: badge });
  //       templateFieldsData.push(linkedBadge[badge.badgeUID].defaultValue);
  //       console.log(templateFields);
  //       // }
  //     });
  //   });
  //   console.log(badgesCtxData);
  // }

  // let [templateFields, setTemplateFields] = useState(templateFieldsInfo || []);

  let [templateName, setTemplateName] = useState(template?.templateName || "");
  let [templateBrand, setTemplateBrand] = useState(template?.brand || "");

  let [backgroundImage, setBackgroundImage] = useState(
    template?.backgroundImage || ""
  );

  let [profilePicture, setProfilePicture] = useState(
    template?.profilePicture || ""
  );

  let [logoImage, setLogoImage] = useState(template?.logoImage || "");


  const navigateToTemplateDetailsPage = (e) => {
    e.preventDefault();
    return false;
  };
  return (
    <>
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
            {template.linkedBadges?.map((linkedBadge, index) => (
              <TemplateField
                fieldProps={{
                  badgeIndex: index,
                  linkedBadge,
                  showEmptyField: true,
                }}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="indi-template-title  indi-place-me-bottom-left">{templateName} ({ templateBrand})</div> 
      </div>
    </>
  );
};

export default TemplateItem;
