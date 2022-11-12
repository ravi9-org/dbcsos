import React, { useState, useEffect, useContext } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";
import QRCode from "./QRCode";
import Email from "./Email";

const CardItemWithActions = (props) => {
  let cardId = props.cardId;

  const [selectedOption, setSelectedOption] = useState("code");

  let cardObj = props.cardData || {};

  let [cardData, setCardData] = useState(props.cardData || {});
  let [fields, setFields] = useState(cardData?.fields || []);
  let [fieldsData, setFieldsData] = useState(cardData?.fieldsData || []);
  let [fieldsSchema, setFieldsSchema] = useState(cardData?.fieldsSchema || {});

  let { userData } = useContext(ContextComponent);

  let [templateBackgroundImage, setTemplateBackgroundImage] = useState("");
  let [templateLogoImage, setTemplateLogoImage] = useState("");

  const templateSuccess = (res) => {
    setTemplateBackgroundImage(res.data.backgroundImage);
    setTemplateLogoImage(res.data.logoImage);
  };
  const templateFail = (err) => {
    err?.message?.length && console.log(err);
  };

  const getTemplate = (templateId) => {
    Utils.getTemplateDetails(cardId).then(templateSuccess, templateFail);
  };

  const success = (res) => {
    setCardData(res.data);
    getTemplate(res.data.templateId);
    setFields(res.data.fields);
    setFieldsData(res.data.fieldsData);
    setFieldsSchema(res.data.fieldsSchema);
    let existingUserData = { ...userData };
    existingUserData?.cards?.push(res.data.id);
    return false;
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
  }, [userData, selectedOption]);

  const handleChange = (e) => {
    setSelectedOption(e);
  };
  return (
    <div
      className={`indi-card-item-parent indi-card-item-page2 card-with-bg d-flex d-flex-row`}
      style={{
        background: `url(${templateBackgroundImage})`,
      }}
    >
      <div className="indi-card-item-page2-send-card-label">Send Card</div>

      {selectedOption === "code" && (
        <QRCode cardData={cardData} cardId={cardId} />
      )}
      {selectedOption === "email" && (
        <Email cardData={cardData} cardId={cardId} />
      )}

      <div className="indi-card-item-page2-code-email-options">
        <div className="d-flex indi-card-mini-options-wrapper">
          <ToggleButtonGroup
            type="radio"
            name="options"
            variant="outline-warning"
            defaultValue="code"
            onChange={handleChange}
          >
            <ToggleButton
              variant="outline-primary"
              className="indi-mini-card-selection-btn1"
              id={`tbg-radio-options-code`}
              value="code"
            >
              Code
            </ToggleButton>
            <ToggleButton
              variant="outline-primary"
              className="indi-mini-card-selection-btn1"
              id={`tbg-radio-options-email`}
              value="email"
            >
              Email
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default CardItemWithActions;
