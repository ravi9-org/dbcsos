import React, { useState, useEffect, useContext, useRef } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";


import ContextComponent from "../../AppContext";
import CardMiniItem from "../../body/content.area/CardMiniItem";
import Utils from "../../Utils";
import Signature from "./Signature";
import SharingSignature from "./SharingSignature";

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
          
            
          <SharingSignature props={{ pageInfo }} />
        </div>
      )}
    </div>
  );
};

export default EmailSignature;
