import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import ContextComponent from "../../AppContext";
import Utils from "../../Utils";
import DefaultQRCode from "./../../../assets/img/qrcode.png";

const QRCode = (props) => {
  let cardId = props.cardId;
  let card = props.cardInfo;
  let { userData } = useContext(ContextComponent);

  const [cardInfo, setCardInfo] = useState(card);
  const [templateInfo, setTemplateInfo] = useState(card.templateInfo);

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [qrcode, setQrCode] = useState(DefaultQRCode);

  const [canRender, setCanRender] = useState(false);
  let [mobileImg, setMobileImg] = useState("");
  let [emailImg, setEmailImg] = useState("");

  const success = (res) => {
    let mobile = "";
    let email = "";
    let userLinkedBadges = res.data?.userLinkedBadges || [];
    userLinkedBadges.map((badge, index) => {
      if (badge.badgeUID === "phone") {
        let mobileValue = badge.value || badge.defaultValue || "";
        if (mobileValue.length && mobile === "") {
          mobile = mobileValue;
        }
        setMobileImg(badge.iconImage);
      }
      if (badge.badgeUID === "email") {
        email = badge.value || badge.defaultValue || "";
        setEmailImg(badge.iconImage);
      }
    });
    setMobile(mobile);
    setEmail(email);
    setQrCode(res.data.qrCode || DefaultQRCode);
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
        data: card,
      });
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
        data: cardInfo.templateInfo,
      });
    }
  }, [cardInfo]);

  return (
    <>
      {canRender && (
        <div className="indi-qrcode-wrapper indi-signature-item">
          <div className="indi-qrcode-box row">
            <div className="indi-signature-title col-sm-10">
              {cardInfo?.userFieldInfo?.firstName}{" "}
              {cardInfo?.userFieldInfo?.lastName}
            </div>
            <div className="col-sm-2 indi-logo-image">
              <img src={templateInfo.logoImage} alt="card"></img>
            </div>
            <div className="indi-signature-template">
              <div className="indi-qrcode-box-info-col">
                <div className="indi-qrcode-box-logo"></div>
                <div className="indi-qrcode-box-personal-info">
                  <div className="indi-qrcode-box-personal-name d-none">
                    {cardInfo?.userFieldInfo?.firstName}{" "}
                    {cardInfo?.userFieldInfo?.lastName}
                  </div>
                  <div className="indi-qrcode-box-personal-desgination">
                    {userData.designation}
                  </div>
                </div>
                <div className="indi-qrcode-box-contacts">
                  <div className="indi-qrcode-box-mobile">
                    <div className="indi-ellipsis">
                      <span className="indi-float-left">
                        <span
                          className="indi-card-field-item-img indi-card-field-item-mobile"
                          style={{
                            backgroundImage: `url(${mobileImg})`,
                          }}
                        ></span>
                      </span>
                      {mobile}
                    </div>
                  </div>
                  <div className="indi-qrcode-box-email">
                    <div className="indi-ellipsis">
                      <span className="indi-float-left">
                        <span
                          className="indi-card-field-item-img indi-card-field-item-email"
                          style={{
                            backgroundImage: `url(${emailImg})`,
                          }}
                        ></span>
                      </span>
                      {cardInfo?.userFieldInfo?.email || userData.email}
                    </div>
                  </div>
                </div>
                <div className="indi-qrcode-box-save-contact">
                  <Button variant="primary">SAVE CONTACT</Button>
                </div>
                <div className="indi-wrap-overflow-icons">
                  {cardInfo?.userLinkedBadges?.map((badge, index) => (
                    <React.Fragment key={index}>
                      {badge?.badgeUID !== "phone" &&
                        badge?.badgeUID !== "email" && (
                          <img
                            className="indi-mini-card-badge-icon"
                            key={index}
                            src={badge.iconImage}
                            alt=""
                          />
                        )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="indi-qrcode-box-img-col">
                <div
                  className="indi-qrcode-bg d-none"
                  style={{
                    background: `url(${templateInfo.backgroundImage})`,
                  }}
                >
                  <div
                    className="indi-qrcode-logo"
                    style={{
                      backgroundImage: `url(${templateInfo.logoImage})`,
                    }}
                  ></div>
                </div>
                <div className="indi-qrcode-box-codes">
                  <div className="indi-qrcode-box-qrcode">
                    <img
                      className="indi-qrcode-qrcode"
                      src={qrcode}
                      alt="qrcode"
                    />
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

export default QRCode;
