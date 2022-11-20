import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import html2canvas from "html2canvas";
import { Alert } from "react-bootstrap";

import Utils from "../../Utils";

const SharingSignature = ({ props }) => {
  const location = useLocation();
  let cardLink = document.location.href;
  let currentPath = location.pathname;
  cardLink = cardLink
    .replace(currentPath, Utils.APP_URLS.CARD_EXTERNAL_PAGE)
    .replace(":cardid", props?.pageInfo?.selectedCardId);

  let [showDefaultBtn, setShowDefaultBtn] = useState(true);
  let [showLoadingBtn, setShowLoadingBtn] = useState(false);
  let [showCopyBtn, setShowCopyBtn] = useState(false);

  let [showAlert, setShowAlert] = useState(false);

  let defaultActivekey = "gmailWeb";
  let sharingVariants = [
    {
      [defaultActivekey]: {
        heading: "GMAIL",
        subHeading: "Web",
        bullets: [
          "Generate and copy your signature's HTML.",
          'Click the settings gear and click "See all settings".',
          'In the "General" tab, scroll down until you see "Signature".',
          "Click the + button.",
          "Give your signature a name.",
          "Paste your signature.",
          `Click the "Save Changes".`,
        ],
        instructionHeading: "For more detailed instructions, see:",
        instructionLink: "https://support.google.com/mail/answer/8395",
      },
    },
    {
      outlookWeb: {
        heading: "OUTLOOK",
        subHeading: "Web",
        bullets: [
          "Generate and copy your signature's HTML.",
          "Sign in to Outlook.com",
          'Go to Settings, then "View all Outlook Settings"',
          'Select "Mail" then "Compose and reply"',
          "Paste your email signature",
        ],
        instructionHeading: "For more detailed instructions, see:",
        instructionLink:
          "https://support.microsoft.com/en-us/office/create-and-add-an-email-signature-in-outlook-com-776d9006-abdf-444e-b5b7-a61821dff034",
      },
    },
    {
      outlookWindows: {
        heading: "OUTLOOK",
        subHeading: "Windows",
        bullets: [
          "Generate and copy your signature's HTML.",
          'In Outlook for Windows, click "New Email" to open a new email message.',
          "On the Message menu, select Signature > Signatures.",
          "Under Select signature to edit, choose New. In the New Signature dialog box, type in a name for the signature.",
          "Under Edit signature, paste your signature.",
          "Under Choose default signature, select the email account you want to associate with your signature and if you want it to be added to all new messages by default.",
        ],
        instructionHeading: "For more detailed instructions, see:",
        instructionLink:
          "https://support.microsoft.com/en-us/office/create-an-email-signature-31fb24f9-e698-4789-b92a-f0e777f774ca",
      },
    },
    {
      outlookMac: {
        heading: "OUTLOOK",
        subHeading: "Mac",
        bullets: [
          "Generate and copy your signature's HTML.",
          "In Outlook for Mac, click New Email.",
          "Click Signature > Signatures.",
          "Click + and name your signature.",
          "Under Signature, paste your signature.",
          "Under New Messages, select your signature.",
        ],
        instructionHeading: "For more detailed instructions, see:",
        instructionLink:
          "https://support.microsoft.com/en-us/office/create-an-email-signature-in-outlook-for-mac-637c3b77-3d2a-4610-9cea-e3ad622aa54e",
      },
    },
  ];

  let [screenShot, setScreenShot] = useState("");

  const generateSignature = async (e) => {
    e.preventDefault();
    setShowDefaultBtn(false);
    setShowLoadingBtn(true);

    await prepareClipboardContent().then(() => {
      setTimeout(() => {
        setShowLoadingBtn(false);
        setShowCopyBtn(true);
      }, 500);
    });
  };

  useEffect(() => {
    setShowDefaultBtn(true);
    setShowLoadingBtn(false);
    setShowCopyBtn(false);
  }, [props.pageInfo]);

  const prepareClipboardContent = async () => {
    let element = document.querySelector(".indi-signature-item");

    element.classList.add("indi-temp-border-for-email-signature");

    let canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
      }),
      data = canvas.toDataURL("image/png"),
      link = document.createElement("a");

    link.href = data;
    link.download = "downloaded-image.jpg";
    setScreenShot(link);

    element.classList.remove("indi-temp-border-for-email-signature");
  };

  const copy2Clipboard = (e) => {
    e.preventDefault();

    let selection = window.getSelection();
    let container = document.querySelector(".indi-temp-dummy");
    container.classList.remove("d-none");

    if (selection.rangeCount > 0) {
      selection.removeAllRanges();
    }

    const range = document.createRange();
    range.selectNode(container);
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
    container.classList.add("d-none");
    setShowAlert(true);
    setTimeout(function () {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <div className="indi-copy-signature-wrapper d-flex">
      <Tab.Container id="left-tabs-example" defaultActiveKey={defaultActivekey}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {sharingVariants.map((variant, index) => (
                <Nav.Item key={index}>
                  <Nav.Link eventKey={Object.keys(variant)[0]}>
                    <div className="indi-email-sign-tab-panel-heading">
                      {variant[Object.keys(variant)[0]].heading}
                    </div>
                    <div className="indi-email-sign-tab-panel-sub-heading">
                      {variant[Object.keys(variant)[0]].subHeading}
                    </div>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content className="indi-email-sign-tab-content-right-side-area">
              {sharingVariants.map((variant, index) => (
                <Tab.Pane key={index} eventKey={Object.keys(variant)[0]}>
                  <>
                    <div className="indi-email-sign-generator-right-side">
                      {variant[Object.keys(variant)[0]].bullets.map(
                        (bullet, index) => (
                          <div
                            key={index}
                            className="indi-email-sign-generate-item d-flex d-flex-row"
                          >
                            <div className="indi-email-sign-vertical-line"></div>
                            <div className="indi-email-sign-generate-number">
                              0{index + 1}
                            </div>
                            <div className="indi-email-sign-generate-body">
                              <div>{bullet}</div>
                              {index === 0 && (
                                <>
                                  <div className="d-none1">
                                    {showDefaultBtn && (
                                      <Button onClick={generateSignature}>
                                        Generate signature
                                      </Button>
                                    )}
                                    {showLoadingBtn && (
                                      <Button variant="primary" disabled>
                                        <Spinner
                                          as="span"
                                          animation="border"
                                          size="sm"
                                          role="status"
                                          aria-hidden="true"
                                        />{" "}
                                        Generating...
                                      </Button>
                                    )}
                                    {showCopyBtn && (
                                      <Button onClick={copy2Clipboard}>
                                        Copy
                                      </Button>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="indi-email-sign-help-heading">
                      {variant[Object.keys(variant)[0]].instructionHeading}
                    </div>
                    <div className="indi-email-sign-help-link">
                      <a
                        href={variant[Object.keys(variant)[0]].instructionLink}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {variant[Object.keys(variant)[0]].instructionLink}
                      </a>
                    </div>
                  </>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Alert
        show={showAlert}
        variant="success"
        className="indi-email-sign-copied-to-clipboard-alert"
      >
        <Alert.Heading>Success!</Alert.Heading>
        <p>Successfully copied signature to clipboard</p>
      </Alert>
      <div className="indi-temp-dummy d-none">
        <a href={cardLink}>
          <img
            src={screenShot}
            alt="clipboardcontent"
            style={{
              width: "275px",
              height: "155px",
            }}
          />
        </a>
      </div>
    </div>
  );
};

export default SharingSignature;
