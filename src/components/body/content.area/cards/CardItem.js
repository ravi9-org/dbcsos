import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Field from "../../../controls/input.elements/Field";
import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";
import CardContext from "./CardContext";

const CardItem = (props) => {
  let cardId = props.cardId;
  
  let cardObj = props.card || {};
  let [cardData, setCardData] = useState(cardObj || {});

  let [fields, setFields] = useState(cardData?.fields || []);
  let [fieldsData, setFieldsData] = useState(cardData?.fieldsData || []);
  let [fieldsSchema, setFieldsSchema] = useState(cardData?.fieldsSchema || {});
  let [applyActions, setApplyActions] = useState(props.applyActions || false);

  let [templateBackgroundImage, setTemplateBackgroundImage] = useState("");
  let [templateLogoImage, setTemplateLogoImage] = useState("");

  let [canRender, setCanRender] = useState(false);

  let [cardCtxInfo, setCardCtxInfo] = useState({
    fields: [],
    data: [],
    userLinkedBadges: [],
    fieldsData: [],
  });

  const navigate = useNavigate();

  let { userData, setCardObject = (() => { }) } = useContext(ContextComponent);

  const success = (res) => {
    debugger;
    setCardData(res.data);
    
    setFields(res.data.userLinkedBadges);
    setTemplateBackgroundImage(res.data.templateInfo.backgroundImage);
    setTemplateLogoImage(res.data.templateInfo.logoImage);
    //setFieldsData(res.data.fieldsData);
    //setFieldsSchema(res.data.fieldsSchema);

    // let tempCardCtxInfo = { ...cardCtxInfo };
    // tempCardCtxInfo.fields = res.data.userLinkedBadges;
    // tempCardCtxInfo.userLinkedBadges = res.data.userLinkedBadges;
    // tempCardCtxInfo.data = res.data.fieldsData;
    // tempCardCtxInfo.fieldsData = res.data.fieldsData;
    // setCardCtxInfo(tempCardCtxInfo);
    // setCardObject(tempCardCtxInfo);

    setCanRender(true);
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    if (Utils.isObjectEmpty(cardObj)) {
      Utils.getCardDetails(cardId).then(success, fail);
    } else {
      success({
        data: cardObj,
      });
    }
  }, []);

  const navigateToCardDetailsPage = (e) => {
    if (applyActions) {
      e.preventDefault();
      navigate(Utils.APP_URLS.CARDS_PAGE + "/" + cardId, {
        state: { cardData: cardData },
      });
    }
  };

  return (
    <>
      {canRender && <CardContext.Provider
        value={{
          cardCtxInfo,
          setCardCtxInfo,
        }}
      >
        <div
          onClick={navigateToCardDetailsPage}
          className={`indi-card-item-parent card-with-bg ${applyActions ? "indi-card-with-actions" : ""
            }`}
          style={{
            background: `url(${templateBackgroundImage})`,
          }}
        >
          <div className="d-none1 indi-card-company-logo-wrapper">
            <img src={templateLogoImage} alt="logoiamge" />
          </div>
          <div className="indi-card-upload-picture">
            <img
              className="indi-card-upload-picture-img"
              src={cardData.croppedImage}
              alt="upload img"
            />
          </div>
          <div className="indi-info-wrapper">
            <div className="indi-card-name fw-bold">
              {userData?.firstName} {userData?.lastName} ({userData?.pronoun})
            </div>
            <div className="indi-card-title">{userData?.designation}</div>
          </div>
          <div className="indi-card-fields">
            <div className="indi-card-field-wrapper">
              {fields?.map(
                (field, index) =>
                  !!field.value && (
                    <Field
                      fieldProps={field}
                      fieldIndex={index}
                      key={index}
                    />
                  )
              )}
            </div>
          </div>
          <div className="indi-template-title indi-place-me-bottom-left">{cardData.cardName}</div>
        </div>
      </CardContext.Provider>}
      </>
  );
};

export default CardItem;
