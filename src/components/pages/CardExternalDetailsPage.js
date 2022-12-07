import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import html2canvas from "html2canvas";

import CardItem from "../body/content.area/cards/CardItem";
import Utils from "../Utils";
import shareImage from "./../../assets/img/Share.png";
import downloadImage from "./../../assets/img/Upload.png";

import ContextComponent from "../AppContext";

const CardExternalDetailsPage = () => {
  let { setAlert, setLoadingState } = useContext(ContextComponent);

  const { cardid } = useParams();
  const cardPublicId = cardid;

  let sendButton = useRef(null);

  let [sendModalCanOpen, setSendModalCanOpen] = useState(false);

  const handleClose = (e) => {
    setSendModalCanOpen(false);
  };

  let [canRender, setCanRender] = useState(false);
  let [cardInfo, setCardInfo] = useState({});
  let [cardId, setCardId] = useState(cardPublicId);
  let [imageData, setImageData] = useState("");

  let [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    cardId,
    publicId: cardId,
    cardExternalLink: document.location.href,
    image: "",
  });

  const success = (res) => {
    let tempCardInfo = res?.data || {};
    setCardInfo(tempCardInfo);
    setCardId(tempCardInfo?.id || "");

    let addrId = "";
    let addrIdx = -1;

    res.data.userLinkedBadges.map((badge, index) => {
      badge.badgeType === "address" &&
        (addrId = badge.value) &&
        (addrIdx = index);
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
    //console.log("opening modal dialog...");
    generateImage();
    setSendModalCanOpen(true);
  };

  const sendHandler = (e) => {
    e.preventDefault();
    setLoadingState({
      applyMassk: true,
      text: "Sending card mail",
    });
    const success = (res) => {
      setLoadingState({
        applyMassk: false,
      });
      handleClose();
      setAlert({
        show: true,
        message: "Mailed successfully!",
      });
    };
    const fail = (err) => {
      debugger;
      setLoadingState({
        applyMassk: false,
      });
      setAlert({
        show: true,
        message: "Mailing failed!",
      });
      console.log(err);
    };

    formData.image = imageData;

    try {
      Utils.guestMail(formData).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const downloadHandler = (e) => {
    //console.log(cardInfo);

    let userFirstName = cardInfo.userFieldInfo.firstName;
    let userLastName = cardInfo.userFieldInfo.lastName;
    let userID = cardInfo.userFieldInfo.email;
    let userEmail = cardInfo.userFieldInfo.email;
    let title = cardInfo.userFieldInfo.title;

    let url = "https://www.internationalsos.com/";
    let urlLink = "https://www.internationalsos.com/";
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
    vcfData.push("FN:" + userFirstName +" "+ userLastName + POSTFIX);
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

  const inputHandler = (e) => {
    let temp = { ...formData };
    delete temp.image;
    temp[e.currentTarget.id] = e.currentTarget.value;
    setFormData(temp);
    let canEnable = true;
    Object.keys(temp).map((current) => {
      temp[current].length === 0 && (canEnable = false);
    });

    if (canEnable) {
      sendButton.current.classList.remove("indi-send-email-form-disable");
    } else {
      sendButton.current.classList.add("indi-send-email-form-disable");
    }
  };

  const generateImage = async () => {
    await prepareClipboardContent().then(() => {
      //console.log(" card data added successfully...");
    });
  };

  const prepareClipboardContent = async () => {
    let element = document.querySelector(".indi-card-item-parent");

    let canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
      }),
      data = canvas.toDataURL("image/png");
    // console.log(data);
    setImageData(data);
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

      <Modal centered show={sendModalCanOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="indi-add-form-wrapper d-flex flex-column">
              <div className="indi-add-form-item d-flex flex-column">
                <div className="indi-add-form-item-input row">
                  <FloatingLabel label="Name">
                    <Form.Control
                      type="text"
                      className="indi-input-field"
                      id="name"
                      placeholder="Enter name"
                      autoComplete="off"
                      onChange={inputHandler}
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="indi-add-form-item d-flex flex-column">
                <div className="indi-add-form-item-input row">
                  <FloatingLabel label="Email">
                    <Form.Control
                      type="email"
                      className="indi-input-field"
                      id="email"
                      placeholder="Enter email"
                      autoComplete="off"
                      onChange={inputHandler}
                    />
                  </FloatingLabel>
                </div>
              </div>

              <div className="indi-add-form-item d-flex flex-column">
                <div className="indi-add-form-item-input row">
                  <FloatingLabel label="Message">
                    <Form.Control
                      as="textarea"
                      rows="3"
                      type="textarea"
                      className="indi-input-field"
                      id="message"
                      placeholder="Enter message"
                      autoComplete="off"
                      onChange={inputHandler}
                    />
                  </FloatingLabel>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            ref={sendButton}
            variant="primary"
            className="indi-send-email-form-disable"
            onClick={sendHandler}
          >
            SEND
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CardExternalDetailsPage;
