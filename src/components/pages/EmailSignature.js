import React, { useState, useEffect, useContext } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ContextComponent from "../app.context";
import CardMiniItem from "./../body/content.area/CardMiniItem";
import Utils from "../utils";
import Signature from "./signatures/Signature";

const EmailSignature = () => {
  const optionsArray = ["qrcode", "text" /*, "square"*/];
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
    square: {
      displayLabel: "Square",
      defaultSelection: false,
      value: 3,
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
    <div className="d-flex dbc-card-mini-items-wrapper">
      {renderPage && (
        <div>
          <div className="w-100 dbc-signature-title">Business class Email</div>
          <div className="d-flex">
            <ToggleButtonGroup
              className="dbc-mini-card-list" 
              type="radio"
              name="cards"
              defaultValue={userCards[0]}
              onChange={handleCardSelection}
            >
              {userCards.map((id, index) => (
                <ToggleButton
                  className="dbc-card-item-wrapper dbc-card-mini-item-wrapper"
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
          <div className="d-flex dbc-card-mini-options-wrapper">
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
                  className="dbc-mini-card-selection-btn"
                  id={`tbg-radio-options-${index + 1}`}
                  value={option}
                >
                  {optionsObjects[option].displayLabel}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          {renderPreview && (
            <div className="dbs-signature-item-wrapper d-flex">
              <Signature
                selectedCardOption={pageInfo.selectedCardOption}
                cardId={pageInfo.selectedCardId}
                cardsInfo={cardsInfo}
                userData={userData}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailSignature;
