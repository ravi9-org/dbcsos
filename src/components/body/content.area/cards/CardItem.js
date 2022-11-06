import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Field from "../../../controls/input.elements/Field";
import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";
import CardContext from "./CardContext";

const CardItem = (props) => {
  let cardId = props.cardId;

  let cardObj = props.cardData || {};

  let [cardData, setCardData] = useState(props.cardData || {});
  let [fields, setFields] = useState(cardData?.fields || []);
  let [fieldsData, setFieldsData] = useState(cardData?.fieldsData || []);
  let [fieldsSchema, setFieldsSchema] = useState(cardData?.fieldsSchema || {});
  let [applyActions, setApplyActions] = useState(props.applyActions || false);

  let [cardCtxInfo, setCardCtxInfo] = useState({ fields: [], data: [] });

  const navigate = useNavigate();

  let { userData } = useContext(ContextComponent);

  const success = (res) => {
    setCardData(res.data);
    setFields(res.data.fields);
    setFieldsData(res.data.fieldsData);
    setFieldsSchema(res.data.fieldsSchema);
    
    let tempCardCtxInfo = { ...cardCtxInfo };
    tempCardCtxInfo.fields = res.data.fields;
    tempCardCtxInfo.data = res.data.fieldsData;
    setCardCtxInfo(tempCardCtxInfo);
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
    <CardContext.Provider
      value={{
        cardCtxInfo,
        setCardCtxInfo,
      }}
    >
    <div
      onClick={navigateToCardDetailsPage}
      className={`indi-card-item-parent card-with-bg ${
        applyActions ? "indi-card-with-actions" : ""
      }`}
      style={{
        background: `url(${cardData.backgroundImage})`,
      }}
    >
      <div className="d-none1 indi-card-company-logo-wrapper">
        <img src={cardData.logoImage} alt="logoiamge" />
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
          {userData.firstName} {userData.lastName}
        </div>
        <div className="indi-card-title">{userData.designation}</div>
      </div>
      <div className="indi-card-fields">
        <div className="indi-card-field-wrapper">
          {fields?.map(
            (field, index) =>
              (!!fieldsData[index] &&
                <Field
                  fieldProps={{
                    fieldType: field,
                    fieldData: fieldsData[index],
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

export default CardItem;
