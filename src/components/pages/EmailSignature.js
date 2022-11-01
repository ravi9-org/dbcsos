import React, { useState, useEffect, useContext } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ContextComponent from "../app.context";
import CardMiniItem from "./../body/content.area/CardMiniItem";
import Utils from "../utils";
import CardList from "../body/content.area/cards.list";
import QRCode from "./signatures/QRCode";
import Square from "./signatures/Square";
import Text from "./signatures/Text";

const EmailSignature = () => {
  const { userData } = useContext(ContextComponent);
  const [userCards, setUserCards] = useState([]);
  const [value, setValue] = useState([1]);

  const optionsArray = ["qrcode", "text"/*, "square"*/];
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

  const [renderPage, setRenderPage] = useState(false);

  const [renderPreview, setRenderPreview] = useState(false);
  const [cardsInfo, setCardsInfo] = useState([]);
  const [aaa, setAaa] = useState([]);

  const addCardsInfo = (cardsObj) => {
    //console.log(cardsInfo?.length);
    //console.log(cardsObj.id);
    let obj = {};
    setAaa([...aaa, cardsObj.id]);
    obj[cardsObj.id] = cardsObj;
    let temp = [...cardsInfo];
    temp.push(obj);
    setCardsInfo(temp);
    //console.log(cardsInfo);
  }

  useEffect(() => { 
    //console.log(aaa);
    //debugger;
  }, [aaa]);

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
  }, [userData]);

  useEffect(() => { 
    if (cardsInfo.length && userCards.length) {
      //console.log(cardsInfo);
      //console.log(userCards);
      if (cardsInfo?.length !== 0 /*&& cardsInfo.length === userCards.length*/) {
        setRenderPreview(true);
        //debugger;
      }
    }
  }, [cardsInfo]);

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
      {renderPage && (
        <div>
          <div className="d-flex">
            <ToggleButtonGroup
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
                  <CardMiniItem cardId={id} role="button" addCardsInfo={addCardsInfo} />
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
            <div className="dbs-email-signature-wrapper">
              {pageInfo.selectedCardOption === "qrcode" && (
                <QRCode cardId={pageInfo.selectedCardId} cardsInfo={cardsInfo} />
              )}
              {pageInfo.selectedCardOption === "text" && (
                <Text cardId={pageInfo.selectedCardId} cardsInfo={cardsInfo} />
              )}
              {/* {pageInfo.selectedCardOption === "square" && (
                <Square cardId={pageInfo.selectedCardId} cardsInfo={cardsInfo} />
              )} */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailSignature;
