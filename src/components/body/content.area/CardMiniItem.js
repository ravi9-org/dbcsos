import React, { useState, useEffect, useContext } from "react";

import Utils from "../../Utils";
import ContextComponent from "../../AppContext";

const CardMiniItem = (props) => {
  let cardId = props.cardId;
  let addCardsInfo = props.addCardsInfo;

  let [cardData, setCardData] = useState({});

  let { userData } = useContext(ContextComponent);

  const success = (res) => {
    setCardData(res.data);
    addCardsInfo(res.data);
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    Utils.getCardDetails(cardId).then(success, fail);
  }, []);

  return (
    <div
      className="indi-card-item-parent card-with-bg"
      style={{
        background: `url(${cardData.backgroundImage})`,
      }}
    >
      <div className="d-none1 indi-card-company-logo-wrapper">
        <img src={cardData.logoImage} alt="logoiamge" />
      </div>
      <div className="indi-card-upload-picture d-none"></div>
      <div className="indi-info-wrapper">
        <div className="indi-card-name fw-bold">
          {userData.firstName} {userData.lastName}
        </div>
        <div className="indi-card-title">{userData.designation}</div>
        <div className="indi-card-qr-code d-flex">
          <img src={cardData.qrcode} alt="qrcode" />
        </div>
      </div>
    </div>
  );
};

export default CardMiniItem;
