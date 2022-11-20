import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

const SharingSignature = () => {
  let [showDefaultBtn, setShowDefaultBtn] = useState(true);
  let [showLoadingBtn, setShowLoadingBtn] = useState(true);
  let [showCopyBtn, setShowCopyBtn] = useState(true);

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

  // sharingVariants.map((variant, index) => {
  //   let key = Object.keys(variant)[0];
  //   console.log(key);
  //   console.log(variant[key].heading);
  //   console.log(variant[key].subHeading);

  //   variant[key].bullets.map((bullet, index) => {
  //     if (index !== 0) {
  //       console.log(bullet);
  //     }
  //   });
  //   debugger;
  // });

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
                                      <Button>Generate signature</Button>
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
                                    {showCopyBtn && <Button>Copy</Button>}
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
    </div>
  );
};

export default SharingSignature;
