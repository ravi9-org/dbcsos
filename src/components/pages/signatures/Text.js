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
  let [mobileImg, setMobileImg] = useState("");
  let [emailImg, setEmailImg] = useState("");

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const [canRender, setCanRender] = useState(false);

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
        if (badge.constant) {
          email = badge.defaultValue || badge.value || "";          
        }
        setEmailImg(badge.iconImage);
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
  let displayName = userData.firstName + " " + userData.lastName;
  return (
    <>
      {canRender && (
        <div className="indi-text-wrapper indi-signature-item">
          <div className="indi-qrcode-box row">
            <div className="indi-signature-title col-sm-10">{displayName}</div>
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
                    {cardInfo?.userFieldInfo?.title}
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
                      {email}
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
                <img
                        className="indi-qrcode-bg"
                        src={cardInfo.cardImage}
                        alt="profile_picture"
                      />

              </div>
            </div>
          </div>
          {/*           {cardInfo?.userLinkedBadges?.map((badge, index) => (
                <img className="indi-mini-card-badge-icon" key={index} src={badge.iconImage} alt="" />
              ))} */}
        </div>
      )}
    </>
  );
};

export default Text;
