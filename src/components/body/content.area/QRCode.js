import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const QRCode = (props) => {
  let [cardData, setCardData] = useState(props.cardData || {});
  useEffect(() => {}, [cardData]);
  return (
    <>
      <div className="dbc-card-item-page2-qrcode-image">
        <img src={cardData.qrcode} alt="qrcode" />
      </div>

      <div className="dbc-card-item-page2-scan-or-click">
        Scan or click to preview
      </div>

      <div className="dbc-card-item-page2-copy-link-btn">
        <Button variant="light">Copy Link</Button>
      </div>
    </>
  );
};

export default QRCode;
