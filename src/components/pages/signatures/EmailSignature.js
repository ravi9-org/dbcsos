import React, { useState, useEffect, useContext, useRef } from "react";
import { Button } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import ContextComponent from "../../AppContext";
import CardMiniItem from "../../body/content.area/CardMiniItem";
import Utils from "../../Utils";
import Signature from "./Signature";

const EmailSignature = () => {
  const optionsArray = ["qrcode", "text"];
  const optionsObjects = {
    qrcode: {
      displayLabel: "QR Code",
      defaultSelection: true,
      value: 1,
    },
    text: {
      displayLabel: "Text",
      defaultSelection: false,
      value: 2,
    },
  };

  const { userData } = useContext(ContextComponent);

  const [userCards, setUserCards] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [renderPage, setRenderPage] = useState(false);
  const [renderPreview, setRenderPreview] = useState(false);
  let [cardsInfo, setCardsInfo] = useState([]);

  let localVar = [];

  setCardsInfo = (newCardsObj) => {
    let tempObj = {},
      tempArray = [];
    tempObj[newCardsObj.id] = newCardsObj;
    tempArray.push(tempObj);
    localVar = [...localVar, ...tempArray];
    if (localVar?.length === userCards?.length) {
      setRenderPreview(true);
    }
    return [...cardsInfo, ...localVar];
  };

  const addCardsInfo = (cardsObj) => {
    setCardsInfo(cardsObj);
  };

  useEffect(() => {
    if (!Utils.isObjectEmpty(userData)) {
      let userCardsArray = Utils.getUniqueSetOfArray(userData.cards);
      setUserCards(Utils.getUniqueSetOfArray(userData.cards));
      setPageInfo({
        selectedCardId: userCardsArray[0],
        selectedCardOption: "qrcode",
      });
      setRenderPage(true);
    }
  }, [userData, cardsInfo]);

  const handleChange = (updatedValue) => {
    setPageInfo({ ...pageInfo, selectedCardOption: updatedValue });
  };

  const handleCardSelection = (updatedValue) => {
    setPageInfo({ ...pageInfo, selectedCardId: updatedValue });
  };

  return (
    <div className="d-flex indi-card-mini-items-wrapper">
      {renderPage && (
        <div>
          <div className="w-100 indi-signature-title">Business class Email</div>
          <div className="d-flex">
            <ToggleButtonGroup
              className="indi-mini-card-list"
              type="radio"
              name="cards"
              defaultValue={userCards[0]}
              onChange={handleCardSelection}
            >
              {userCards.map((id, index) => (
                <ToggleButton
                  className="indi-card-item-wrapper indi-card-mini-item-wrapper"
                  key={index}
                  value={id}
                  // variant="outline-primary"
                  variant="outline-primary"
                  id={`tbg-radio-${id}`}
                >
                  <CardMiniItem
                    cardId={id}
                    role="button"
                    addCardsInfo={addCardsInfo}
                  />
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <div className="d-flex indi-card-mini-options-wrapper">
            <ToggleButtonGroup
              type="radio"
              name="options"
              variant="outline-warning"
              defaultValue={optionsArray.length ? optionsArray[0] : 1}
              onChange={handleChange}
            >
              {optionsArray.map((option, index) => (
                <ToggleButton
                  key={index}
                  variant="outline-primary"
                  className="indi-mini-card-selection-btn"
                  id={`tbg-radio-options-${index + 1}`}
                  value={option}
                >
                  {optionsObjects[option].displayLabel}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          {renderPreview && (
            <div className="indi-signature-item-wrapper d-flex">
              <Signature
                selectedCardOption={pageInfo.selectedCardOption}
                cardId={pageInfo.selectedCardId}
                cardsInfo={cardsInfo}
                userData={userData}
              />
            </div>
          )}
          <div className="indi-copy-signature-wrapper d-flex">
            <Tab.Container id="left-tabs-example" defaultActiveKey="gmail">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="gmail">Gmail</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="olweb">Outlook Web</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="olwindows">Outlook Windows</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="olmac">Outlook Mac</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content className="indi-email-sign-tab-content-right-side-area">
                    <Tab.Pane eventKey="gmail">
                      <div className="indi-email-sign-generator-right-side">
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            01
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Generate and copy your signature's HTML</div>
                            <div>
                              <Button>Generate signature</Button>
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            02
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>
                              Click the settings gear and click "See all
                              settings"
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            03
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>
                              In the "General" tab, scroll down until you see
                              "Signature"
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            04
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Click the + button</div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            05
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Give your signature a name</div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            06
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Paste your signature</div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            07
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Click "Save Changes"</div>
                          </div>
                        </div>
                      </div>

                      <div className="indi-email-sign-help-heading">
                        For more detailed instructions:
                      </div>
                      <div className="indi-email-sign-help-link">
                        <a href="https://support.google.com/mail/answer/8395" rel="noreferrer" target="_blank">
                        https://support.google.com/mail/answer/8395
                        </a>
                      </div>


                    </Tab.Pane>
                    <Tab.Pane eventKey="olweb">
                      <div className="indi-email-sign-generator-right-side">
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            01
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Generate and copy your signature's HTML</div>
                            <div>
                              <Button>Generate signature</Button>
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            02
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>
                            Sign in to Outlook.com
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            03
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>
                            Go to Settings, then "View all Outlook Settings"
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            04
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Select "Mail" then "Compose and reply"</div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            05
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Paste your email signature</div>
                          </div>
                        </div>
                      </div>

                      

                      <div className="indi-email-sign-help-heading">
                      For more detailed instructions, see:
                      </div>
                      <div className="indi-email-sign-help-link">
                        <a href="https://support.microsoft.com/en-us/office/create-and-add-an-email-signature-in-outlook-com-776d9006-abdf-444e-b5b7-a61821dff034" rel="noreferrer" target="_blank">
                        https://support.microsoft.com/en-us/office/create-and-add-an-email-signature-in-outlook-com-776d9006-abdf-444e-b5b7-a61821dff034
                        </a>
                      </div>


                    </Tab.Pane>
                    <Tab.Pane eventKey="olwindows">
                      <div className="indi-email-sign-generator-right-side">
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            01
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Generate and copy your signature's HTML</div>
                            <div>
                              <Button>Generate signature</Button>
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            02
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>
                            In Outlook for Windows, click "New Email" to open a new email message.
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            03
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>
                            On the Message menu, select Signature {">"} Signatures.
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            04
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Under Select signature to edit, choose New. In the New Signature dialog box, type in a name for the signature.</div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            05
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Under Edit signature, paste your signature.</div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            06
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Under Choose default signature, select the email account you want to associate with your signature and if you want it to be added to all new messages by default.</div>
                          </div>
                        </div>
                      </div>

                      <div className="indi-email-sign-help-heading">
                      For more detailed instructions, see:
                      </div>
                      <div className="indi-email-sign-help-link">
                        <a href="https://support.microsoft.com/en-us/office/create-an-email-signature-31fb24f9-e698-4789-b92a-f0e777f774ca" rel="noreferrer" target="_blank">
                        https://support.microsoft.com/en-us/office/create-an-email-signature-31fb24f9-e698-4789-b92a-f0e777f774ca
                        </a>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="olmac">
                      <div className="indi-email-sign-generator-right-side">
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            01
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Generate and copy your signature's HTML</div>
                            <div>
                              <Button>Generate signature</Button>
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            02
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>
                            In Outlook for Mac, click New Email.
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            03
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>
                            Click Signature {">"} Signatures.
                            </div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            04
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Click + and name your signature.</div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            05
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Under Signature, paste your signature.</div>
                          </div>
                        </div>
                        <div className="indi-email-sign-generate-item d-flex d-flex-row">
                          <div className="indi-email-sign-vertical-line"></div>
                          <div className="indi-email-sign-generate-number">
                            06
                          </div>
                          <div className="indi-email-sign-generate-body">
                            <div>Under New Messages, select your signature.</div>
                          </div>
                        </div>
                      </div>

                      <div className="indi-email-sign-help-heading">
                      For more detailed instructions, see:
                      </div>
                      <div className="indi-email-sign-help-link">
                        <a href="https://support.microsoft.com/en-us/office/create-an-email-signature-in-outlook-for-mac-637c3b77-3d2a-4610-9cea-e3ad622aa54e" rel="noreferrer" target="_blank">
                        https://support.microsoft.com/en-us/office/create-an-email-signature-in-outlook-for-mac-637c3b77-3d2a-4610-9cea-e3ad622aa54e
                        </a>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailSignature;
