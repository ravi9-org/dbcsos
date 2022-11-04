import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Utils from "../../Utils";

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
    <div className="indi-text-wrapper indi-signature-item">
      <div className="indi-qrcode-box row">
        <div className="w-100 indi-signature-title col-sm-12">
          {userData.firstName} {userData.lastName}
        </div>
        <div className=" d-flex flex-row indi-signature-template">
          <div className="indi-qrcode-box-info-col">
            <div className="indi-qrcode-box-logo">
            </div>
            <div className="indi-qrcode-box-personal-info">
              <div className="indi-qrcode-box-personal-name d-none">
                {userData.firstName} {userData.lastName}
              </div>
              <div className="indi-qrcode-box-personal-desgination">
                {userData.designation}
              </div>
            </div>
            <div className="indi-qrcode-box-contacts">
              <div className="indi-qrcode-box-mobile">{mobile}</div>
              <div className="indi-qrcode-box-email">{email}</div>
            </div>
            <div className="indi-qrcode-box-save-contact">
              <Button variant="primary">SAVE CONTACT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;
