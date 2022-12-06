import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Container from "react-bootstrap/Container";

import CardItem from "../body/content.area/cards/CardItem";
import Utils from "../Utils";
import shareImage from "./../../assets/img/Share.png";
import downloadImage from "./../../assets/img/Upload.png";

const CardExternalDetailsPage = () => {
  const { cardid } = useParams();
  const cardPublicId = cardid;

  let [canRender, setCanRender] = useState(false);
  let [cardInfo, setCardInfo] = useState({});
  let [cardId, setCardId] = useState(cardPublicId);

  const success = (res) => {
    let tempCardInfo = res?.data || {};
    setCardInfo(tempCardInfo);
    setCardId(tempCardInfo?.id || '');

    let addrId = "";
    let addrIdx = -1;

    res.data.userLinkedBadges.map((badge, index) => {
      badge.badgeType === "address" && (addrId = badge.value) && (addrIdx = index);
    });
    if (addrId.length) {
      const addrSuccess = (res) => {
        tempCardInfo.userLinkedBadges[addrIdx].addressData = res.data;
        //setCardInfo({ ...tempCardInfo, addressData: res.data });
        setCanRender(true);
      };
      const addrFail = (err) => {
        err?.message?.length && console.log(err);
      };

      Utils.getAddressAsAnonymous(addrId).then(addrSuccess, addrFail);
    } else {
      setCanRender(true);
    }
  };
  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    Utils.getCardDetailsAsAnonymous(cardPublicId).then(success, fail);
  }, [cardPublicId]);

  const shareHandler = (e) => {
    e.preventDefault();
    console.log("do nothing for now");
  };

  const downloadHandler = (e) => {
    //console.log(cardInfo);

    let userFirstName = cardInfo.userFieldInfo.firstName;
    let userID = cardInfo.userFieldInfo.email;
    let userEmail = cardInfo.userFieldInfo.email;
    let title = cardInfo.userFieldInfo.title;

    let url = "https://cmsedge.com";
    let urlLink = "https://cmsedge.com";
    let telephone = "";

    cardInfo.userLinkedBadges.map((badge) => {
      if (badge.badgeUID === "phone") {
        telephone = badge.value || badge.defaultValue || "";
      }
      if (badge.badgeUID === "url") {
        url = badge.value || badge.defaultValue || "";
      }
      if (badge.badgeUID === "website") {
        urlLink = badge.value || badge.defaultValue || "";
      }
    });

    const POSTFIX = "\n";
    let vcfData = [];

    vcfData.push("BEGIN:VCARD" + POSTFIX);
    vcfData.push("VERSION:3.0" + POSTFIX);
    vcfData.push("FN:" + userFirstName + POSTFIX);
    vcfData.push("UID:" + userID + POSTFIX);
    vcfData.push("EMAIL:" + userEmail + POSTFIX);
    vcfData.push("TEL;TYPE=WORK::" + telephone + POSTFIX);
    vcfData.push("TITLE:" + title + POSTFIX);
    vcfData.push("URL:" + url + POSTFIX);
    vcfData.push("URL;TYPE=LINK:" + urlLink + POSTFIX);

    cardInfo.userLinkedBadges.map((field, index) => {
      let value = field.value || field.defaultValue || "";
      let pushString = "";
      if (value.trim().length > 0) {
        if (
          field.badgeUID === "vimeo" ||
          field.badgeUID === "wechat" ||
          field.badgeUID === "instagram" ||
          field.badgeUID === "linkedin" ||
          field.badgeUID === "twitter" ||
          field.badgeUID === "link"
        ) {
          pushString =
            "URL;TYPE=" + field.badgeUID.toUpperCase() + ":" + value + POSTFIX;
        }
      }
      pushString.length && vcfData.push(pushString);
    });

    //vcfData.push("NOTE:Created with by cmsedge" + POSTFIX);
    vcfData.push("N:;" + userFirstName + ";;;;" + POSTFIX);
    vcfData.push("END:VCARD");

    // console.log(vcfData);
    const file = new Blob(vcfData, { type: "text/vcard;charset=utf-8" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = userFirstName.replaceAll(" ", "_") + ".vcf";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <>
      {canRender && (
        <Container className="indi-app indi-ext-card-details-page">
          <div className="indi-ext-card-item-wrapper d-flex">
            <CardItem
              cardId={cardId}
              card={cardInfo}
              userData={cardInfo.userFieldInfo}
              showCardName={false}
              enableSocialLinks={true}
            />
            <div
              className="indi-card-ext-footer-btn indi-card-ext-download-card"
              role="button"
            >
              <img onClick={shareHandler} src={shareImage} alt="share" />
              <img
                onClick={downloadHandler}
                src={downloadImage}
                alt="download"
              />
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default CardExternalDetailsPage;
