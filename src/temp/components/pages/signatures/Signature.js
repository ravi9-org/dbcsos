import React, { useEffect, useState } from "react";

import Text from "./Text";
import QRCode from "./QRCode";

import Utils from "../../Utils";

const Signature = (props) => {
  let cardId = props.cardId;
  let info = props.cardsInfo;
  let userData = props.userData;
  let selectedCardOption = props.selectedCardOption;
  const [cardInfo, setCardInfo] = useState(info);

  const success = (res) => {
    setCardInfo(res.data);
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    if (Utils.isObjectEmpty(info)) {
      Utils.getCardDetails(cardId).then(success, fail);
    } else {
      let obj = {
        res: {
          data: info,
        },
      };
      success(obj);
    }
  }, []);

  return (
    <>
      {selectedCardOption === "qrcode" && (
        <QRCode cardId={cardId} cardInfo={cardInfo} userData={userData} />
      )}
      {selectedCardOption === "text" && (
        <Text cardId={cardId} cardInfo={cardInfo} userData={userData} />
      )}
    </>
  );
};

export default Signature;
