import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Utils from "../../utils";

const Text = (props) => {
  let cardId = props.cardId;
  let userData = props.userData;
  const [cardInfo, setCardInfo] = useState({});
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const success = (res) => {
    setMobile(res.data.fieldsData[0]);
    setEmail(res.data.fieldsData[1]);
    setCardInfo(res.data);
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    Utils.getCardDetails(cardId).then(success, fail);
  }, [cardId]);

  return (
    <div className="dbc-text-wrapper dbs-signature-item">
<div className="dbc-qrcode-box row">        
        <div className="w-100 dbc-signature-title col-sm-12">{userData.firstName} {userData.lastName}</div>
        <div className=" d-flex flex-row dbc-signature-template">
          <div className="dbc-qrcode-box-info-col">
            <div className="dbc-qrcode-box-logo">
              {/* <img src={cardInfo.backgroundImage} alt={cardInfo.templateName} /> */}
              {/* <img src={cardInfo.logoImage} alt={cardInfo.templateName} /> */}
            </div>
            <div className="dbc-qrcode-box-personal-info">
              <div className="dbc-qrcode-box-personal-name d-none">
                {userData.firstName} {userData.lastName}
              </div>
              <div className="dbc-qrcode-box-personal-desgination">
                {userData.designation}
              </div>
            </div>
            <div className="dbc-qrcode-box-contacts">
              <div className="dbc-qrcode-box-mobile">{mobile}</div>
              <div className="dbc-qrcode-box-email">{email}</div>
            </div>
            <div className="dbc-qrcode-box-save-contact">
                <Button variant="primary">SAVE CONTACT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;
