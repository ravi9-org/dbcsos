import React, { useState, useEffect, useContext } from "react";

import Utils from "../../Utils";
import ContextComponent from "../../AppContext";
import DefaultQRCode from "./../../../assets/img/qrcode.png";

const CardMiniItem = (props) => {
  let cardId = props.cardId;
  let card = props.card;
  let [cardData, setCardData] = useState(card || {});
  let [templateData, setTemplateData] = useState(card.templateInfo || {});
  let [canRender, setCanRender] = useState(false);
  let [qrcode, setQrcode] = useState(DefaultQRCode);

  let { userData } = useContext(ContextComponent);

  const success = (res) => {
    setCardData(res.data);
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    if (Utils.isObjectEmpty(card)) {
      Utils.getCardDetails(cardId).then(success, fail);
    } else {
      success({
        data: card,
      });
    }
  }, []);

  const templateSuccess = (res) => {
    setTemplateData(res.data);
    setCanRender(true);
  };

  useEffect(() => {
    if (!Utils.isObjectEmpty(cardData)) {
      setQrcode(cardData.qrCode || qrcode);
      Utils.getTemplateDetails(cardData.templateId).then(templateSuccess, fail);
    }
  }, [cardData]);

  return (
    <>
      {canRender && (
        <div
          className="indi-card-item-parent card-with-bg"
          style={{
            background: `url(${templateData.backgroundImage})`,
          }}
        >
          <div className="d-none1 indi-card-company-logo-wrapper indi-mini-card-company-logo-wrapper">
            <img src={templateData.logoImage} alt="logoiamge" />
          </div>

          <div className="indi-card-upload-picture d-none"></div>

          <div className="indi-info-wrapper d-flex flex-column align-items-start">
            <div className="d-flex flex-row align-items-end w-100">
              <div className="indi-info-left">
                <div className="indi-card-name indi-mini-card-name fw-bold">
                  {userData.firstName} {userData.lastName}
                </div>
                <div className="indi-card-title indi-mini-card-title">
                  {userData.title}
                </div>
              </div>
              <div className="indi-card-qr-right">
                <div className="indi-card-qr-code d-flex d-none">
                  <img src={qrcode} alt="qrcode" />
                </div>
              </div>
            </div>
            <div className="indi-info-left">
              {cardData?.userLinkedBadges?.map((badge, index) => (
                <a href="#"><img className="indi-mini-card-badge-icon" key={index} src={badge.darkIconImage} alt="" /></a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardMiniItem;
