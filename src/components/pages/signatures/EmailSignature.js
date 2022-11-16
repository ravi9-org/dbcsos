import React, { useState, useEffect, useContext, useRef } from "react";
import {Button} from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

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
                  <Tab.Content>
                    <Tab.Pane eventKey="gmail">
                      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                         ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat. </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="olweb">
                      <div>Duis aute irure dolor in reprehenderit in voluptate 
                          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                           sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    </Tab.Pane> 
                    <Tab.Pane eventKey="olwindows">
                      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                         ut labore et dolore magna aliqua.</div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="olmac">
                      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                         ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                           sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
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
