import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "react-bootstrap";

import Utils from "../../../Utils";
import DefaultQRCode from "./../../../../assets/img/qrcode.png";

const QRCode = (props) => {
  let [cardData, setCardData] = useState(props.cardData || {});
  let [cardId, setCardId] = useState(props.cardId || "");

  let [canRender, setCanRender] = useState(false);
  let [qrCode, setQrCode] = useState(DefaultQRCode);

  useEffect(() => {
    if (!Utils.isObjectEmpty(cardData)) {
      setQrCode(cardData.qrCode || DefaultQRCode);
      setCanRender(true);
    }
  }, [cardData]);

  const copyLinkHandler = (e) => {
    window.open(props.cardExtLink, "_blank", "noopener,noreferrer");
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
            <CopyToClipboard text={props.cardExtLink}>
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
