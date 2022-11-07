import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Field from "../../../controls/input.elements/Field";
import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";
import CardContext from "./../cards/CardContext";

const TemplateItem = (props) => {
  let template = props?.template;
  let templateId = template?.id;

  

  let [templateFields, setTemplateFields] = useState(template?.fields || []);
  let [templateFieldsData, setTemplateFieldsData] = useState(
    template?.fieldsData || []
  );
  let [templateName, setTemplateName] = useState(template?.templateName || "");
  let [templateDisplayName, setTemplateDisplayName] = useState(template?.templateDisplayName || "");
  let [backgroundImage, setBackgroundImage] = useState(
    template?.backgroundImage || ""
  );
  let [croppedImage, setCroppedImage] = useState(
    template?.croppedImage || ""
  );
  let [logoImage, setLogoImage] = useState(template?.logoImage || "");

  const navigate = useNavigate();

  let { userData } = useContext(ContextComponent);

  let tempCardCtxInfo = {};
  tempCardCtxInfo.fields = templateFields;
  tempCardCtxInfo.data = templateFieldsData;
    //setCardCtxInfo(tempCardCtxInfo);
    
    let [cardCtxInfo, setCardCtxInfo] = useState(tempCardCtxInfo);

  //   const success = (res) => {
  //     setCardData(res.data);
  //     setFields(res.data.fields);
  //     setFieldsData(res.data.fieldsData);
  //     setFieldsSchema(res.data.fieldsSchema);

  //     let tempCardCtxInfo = { ...cardCtxInfo };
  //     tempCardCtxInfo.fields = res.data.fields;
  //     tempCardCtxInfo.data = res.data.fieldsData;
  //     setCardCtxInfo(tempCardCtxInfo);
  //   };

  //   const fail = (err) => {
  //     err?.message?.length && console.log(err);
  //   };

  //   useEffect(() => {
  //     if (Utils.isObjectEmpty(cardObj)) {
  //       Utils.getTemplateDetails(cardId).then(success, fail);
  //     } else {
  //       success({
  //         data: cardObj,
  //       });
  //     }
  //   }, []);

  //   const navigateToCardDetailsPage = (e) => {
  //     if (applyActions) {
  //       e.preventDefault();
  //       navigate(Utils.APP_URLS.CARDS_PAGE + "/" + cardId, {
  //         state: { cardData: cardData },
  //       });
  //     }
  //   };

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
            src={croppedImage}
            alt="upload img"
          />
        </div>
        <div className="indi-info-wrapper">
          <div className="indi-card-name fw-bold">
            {templateDisplayName}
          </div>
          <div className="indi-card-title">{templateName}</div>
        </div>
        <div className="indi-card-fields">
          <div className="indi-card-field-wrapper">
            {templateFields?.map(
              (field, index) =>
                (
                  <Field
                    fieldProps={{
                      fieldType: field,
                                fieldData: templateFieldsData[index],
                      showEmptyField: true
                    }}
                    key={index}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </CardContext.Provider>
  );
};

export default TemplateItem;
