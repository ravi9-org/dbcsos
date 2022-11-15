import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

import Utils from "../../../Utils";
import DefaultQRCode from "./../../../../assets/img/qrcode.png";

const QRCode = (props) => {
  const location = useLocation();
  let [cardData, setCardData] = useState(props.cardData || {});
  let [cardId, setCardId] = useState(props.cardId || "");
  let cardLink = document.location.href;
  let currentPath = location.pathname;
  cardLink = cardLink
    .replace(currentPath, Utils.APP_URLS.CARD_EXTERNAL_PAGE)
    .replace(":cardid", cardId);

  let [canRender, setCanRender] = useState(false);
  let [qrCode, setQrCode] = useState(DefaultQRCode);

  useEffect(() => {
    if (!Utils.isObjectEmpty(cardData)) {
      setQrCode(cardData.qrcode || DefaultQRCode);
      setCanRender(true);
    }
  }, [cardData]);

  const copyLinkHandler = (e) => {
    window.open(cardLink, "_blank", "noopener,noreferrer");
  };
  return (
    <>
      {canRender && (
        <>
          <div className="indi-card-item-page2-qrcode-image">
            <img src={qrCode} alt="qrcode" />
          </div>

          <div className="indi-card-item-page2-scan-or-click">
            Scan or click to preview
          </div>

          <div className="indi-card-item-page2-copy-link-btn">
            <CopyToClipboard text={cardLink}>
              <Button variant="light" onClick={copyLinkHandler}>
                Copy Link
              </Button>
            </CopyToClipboard>
          </div>
        </>
      )}
    </>
  );
};

export default QRCode;
