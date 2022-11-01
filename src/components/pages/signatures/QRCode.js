import React, { useEffect, useState } from "react";

const QRCode = (props) => {
    let cardId = props.cardId;
    let info = props.cardsInfo;
    const [cardsInfo, setCardsInso] = useState(info);
    
    useEffect(() => {
        //console.log(cardsInfo);
    }, cardsInfo);
  return <div>this is QR Code page : {cardId} </div>;
};

export default QRCode;
