import React, { useEffect, useState } from "react";

import Text from "./Text";
import QRCode from "./QRCode";

import Utils from "../../Utils";

const Signature = (props) => {
  let cardId = props.cardId;
  let card = props.cardInfo;
  let userData = props.userData;

  let selectedCardOption = props.selectedCardOption;
  let [cardInfo, setCardInfo] = useState(card || {});
  let [canRender, setCanRender] = useState(false);

  const success = (res) => {
    setCardInfo(res.data);
    setCanRender(true);
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    if (Utils.isObjectEmpty(card)) {
      Utils.getCardDetails(cardId).then(success, fail);
    } else {
      let obj = {
        data: card,
      };
      success(obj);
    }
  }, [card, cardId, cardInfo]);

  return (
    <>
      {canRender && selectedCardOption === "qrcode" && (
        <QRCode cardId={cardId} cardInfo={cardInfo} userData={userData} />
      )}
      {canRender && selectedCardOption === "text" && (
        <Text cardId={cardId} cardInfo={cardInfo} userData={userData} />
      )}
    </>
  );
};

export default Signature;
