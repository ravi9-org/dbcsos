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
      <div className="dbc-text-box d-flex">
        <div className="dbc-text-box-row-1">
          <div className="dbc-text-box-personal-info">
            <div className="dbc-text-box-personal-name">
              {userData.firstName} {userData.lastName}
            </div>
            <div className="dbc-text-box-personal-desgination">
              {userData.designation}
            </div>
          </div>
        </div>
        <div className="dbc-text-box-row-2">
          <div className="dbc-text-box-contacts">
            <div className="dbc-text-box-mobile">{mobile}</div>
            <div className="dbc-text-box-email">{email}</div>
          </div>
          <div className="dbc-text-box-codes">
            <div className="dbc-text-box-save-contact">
              <Button variant="primary">SAVE CONTACT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;
