import React, { useState, useEffect, useContext } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ContextComponent from "../app.context";
import CardMiniItem from "./../body/content.area/CardMiniItem";
import Utils from "../utils";
import CardList from "../body/content.area/cards.list";

const EmailSignature = () => {
  const { userData } = useContext(ContextComponent);
  const [userCards, setUserCards] = useState([]);
  const [value, setValue] = useState([1]);

  const optionsArray = ["qrcode", "text", "square"];
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

  const [pageInfo, setPageInfo] = useState(null);

  const [renderPreview, setRenderPreview] = useState(false);

  useEffect(() => {
    if (!Utils.isObjectEmpty(userData)) {
      let userCardsArray = Utils.getUniqueSetOfArray(userData.cards);
      setUserCards(Utils.getUniqueSetOfArray(userData.cards));
      setPageInfo({
        selectedCardId: userCardsArray[0],
        selectedCardOption: "qrcode",
      });
      setRenderPreview(true);
    }
  }, [userData]);

  const handleChange = (updatedValue) => {
    // console.log(updatedValue);
    setPageInfo({ ...pageInfo, selectedCardOption: updatedValue });
    //console.log(pageInfo);
  };

  const handleCardSelection = (updatedValue) => {
    //console.log(updatedValue);
    setPageInfo({ ...pageInfo, selectedCardId: updatedValue });
    //console.log(pageInfo);
  };
  return (
    <div className="d-flex dbc-card-mini-items-wrapper">
      {renderPreview && (
        <div>
          <div className="d-flex">
            <ToggleButtonGroup
              type="radio"
              name="cards"
              // defaultValue={userCards.length ? userCards[0] : 1}
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
                  <CardMiniItem cardId={id} role="button" />
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <div className="d-flex dbc-card-mini-options-wrapper">
            <ToggleButtonGroup
              type="radio"
              name="options"
              variant="outline-primary"
              defaultValue={optionsArray.length ? optionsArray[0] : 1}
              onChange={handleChange}
            >
              {optionsArray.map((option, index) => (
                <ToggleButton
                  key={index}
                  variant="outline-info"
                  id={`tbg-radio-options-${index + 1}`}
                  value={option}
                >
                  {optionsObjects[option].displayLabel}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          {renderPreview && (
            <div>
              {pageInfo.selectedCardId}:===:{pageInfo.selectedCardOption}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailSignature;
