import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";

import ContextComponent from "../../AppContext";
import Utils from "../../Utils";
import DefaultQRCode from "./../../../assets/img/qrcode.png";

const Text = (props) => {
  let cardId = props.cardId;
  let card = props.cardInfo;

  let { userData } = useContext(ContextComponent);

  const [cardInfo, setCardInfo] = useState(card);
  const [templateInfo, setTemplateInfo] = useState(card.templateInfo);

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [canRender, setCanRender] = useState(false);

  const success = (res) => {
    let mobile = "";
    let email = "";
    let userLinkedBadges = res.data?.userLinkedBadges || [];
    userLinkedBadges.map((badge, index) => {
      if (badge.badgeUID === "phone") {
        mobile = badge.value || badge.defaultValue || '';
      }
      if (badge.badgeUID === "email") {
        email = badge.value || badge.defaultValue || '';
      }
    });
    setMobile(mobile);
    setEmail(email);
    setCardInfo(res.data);
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    if (Utils.isObjectEmpty(card)) {
      Utils.getCardDetails(cardId).then(success, fail);
    } else {
      success({
        data: card
      })
    }
  }, [card, cardId, cardInfo]);

  const templateSuccess = (res) => {
    setTemplateInfo(res.data);
    setCanRender(true);
  };

  useEffect(() => {
    if (Utils.isObjectEmpty(cardInfo)) {
      let templateId = cardInfo.templateId;
      Utils.getTemplateDetails(templateId).then(templateSuccess, fail);
    } else {
      templateSuccess({
        data: cardInfo.templateInfo
      })
    }
  }, [cardInfo]);

  return (
    <>
      {canRender && (
        <div className="indi-text-wrapper indi-signature-item">
          <div className="indi-qrcode-box row">
            <div className="w-100 indi-signature-title col-sm-12">
              {userData.firstName} {userData.lastName}
            </div>
            <div className=" d-flex flex-row indi-signature-template">
              <div className="indi-qrcode-box-info-col">
                <div className="indi-qrcode-box-logo"></div>
                <div className="indi-qrcode-box-personal-info">
                  <div className="indi-qrcode-box-personal-name d-none">
                    {userData.firstName} {userData.lastName}
                  </div>
                  <div className="indi-qrcode-box-personal-desgination">
                    {userData.designation}
                  </div>
                </div>
                <div className="indi-qrcode-box-contacts">
                  <div className="indi-qrcode-box-mobile">
                    <span className="indi-card-field-item-img indi-card-field-item-mobile"></span>
                    <span>{mobile}</span>
                  </div>
                  <div className="indi-qrcode-box-email">
                    <span className="indi-card-field-item-img indi-card-field-item-email"></span>
                    <span>{email}</span>
                  </div>
                </div>
                <div className="indi-qrcode-box-save-contact">
                  <Button variant="primary">SAVE CONTACT</Button>
                </div>
              </div>

              <div className="indi-qrcode-box-img-col">
                <div
                  className="indi-qrcode-bg"
                  style={{
                    background: `url(${cardInfo.cardImage})`,
                  }}
                >
                  <div className="indi-place-me-top-right ">
                    <img src={templateInfo.logoImage} alt="card"></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Text;
