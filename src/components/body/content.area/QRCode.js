import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Utils from "../../utils";

const QRCode = (props) => {
  const location = useLocation();
  let [cardData, setCardData] = useState(props.cardData || {});
  let [cardId, setCardId] = useState(props.cardId || "");
  let cardLink = document.location.href;
  let currentPath = location.pathname;
  cardLink = cardLink
    .replace(currentPath, Utils.APP_URLS.CARD_EXTERNAL_PAGE)
    .replace(":cardid", cardId);
  useEffect(() => {}, [cardData]);

  const copyLinkHandler = (e) => {
    window.open(cardLink, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      <div className="dbc-card-item-page2-qrcode-image">
        <img src={cardData.qrcode} alt="qrcode" />
      </div>

      <div className="dbc-card-item-page2-scan-or-click">
        Scan or click to preview
      </div>

      <div className="dbc-card-item-page2-copy-link-btn">
        <CopyToClipboard text={cardLink}>
          <Button variant="light" onClick={copyLinkHandler}>
            Copy Link
          </Button>
        </CopyToClipboard>
      </div>
    </>
  );
};

export default QRCode;
