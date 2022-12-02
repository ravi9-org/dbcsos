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

  const { userData, setLoadingState, setCanRedirectToLogin } = useContext(ContextComponent);
  const [userCards, setUserCards] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [renderPage, setRenderPage] = useState(false);

  const [renderPreview, setRenderPreview] = useState(false);

  // let [cardsInfo, setCardsInfo] = useState([]);

  // let localVar = [];

  // setCardsInfo = (newCardsObj) => {
  //   let tempObj = {},
  //     tempArray = [];
  //   tempObj[newCardsObj.id] = newCardsObj;
  //   tempArray.push(tempObj);
  //   localVar = [...localVar, ...tempArray];
  //   debugger;
  //   if (localVar?.length === userCards?.length) {
  //     setRenderPreview(true);
  //   }
  //   debugger;
  //   return [...cardsInfo, ...localVar];
  //   // setRenderPreview(true);
  //   // return newCardsObj;
  // };

  // const addCardsInfo = (cardsObj) => {
  //   setCardsInfo(cardsObj);
  // };

  // useEffect(() => {
    // if (!Utils.isObjectEmpty(userData)) {
    //   let userCardsArray = Utils.getUniqueSetOfArray(userData.cards);
    //   setUserCards(Utils.getUniqueSetOfArray(userData.cards));
    //   setPageInfo({
    //     selectedCardId: userCardsArray[0],
    //     selectedCardOption: "qrcode",
    //   });
    //   setRenderPage(true);
    // }
  // }, [userData, cardsInfo]);

  const success = (res) => {
    if (!Utils.isObjectEmpty(res.data)) {
      let userCardsArray = res.data;
      setUserCards(userCardsArray);
      setPageInfo({
        selectedCardId: userCardsArray[0].id,
        selectedCard: userCardsArray[0],
        selectedCardOption: "qrcode",
      });
      setRenderPage(true);
      setLoadingState({
        applyMask: false
      });
    }
  };
  const fail = (err) => {
    err?.message?.length && console.log(err);
    setLoadingState({
      applyMask: false
    });
    if (err?.redirect) {
      setCanRedirectToLogin(true);
    }
  };

  useEffect(() => {
    setLoadingState({
      applyMask: true,
      text: "Loading email signatures",
    });
    Utils.getUserCardsList().then(success, fail);
  }, []);

  const handleChange = (updatedValue) => {
    // debugger;
    // let selectedCard = {};
    // userCards.map(userCard => {
    //   if (selectedCardId === userCard.id) {
    //     selectedCard = userCard;
    //   }
    // });
    // setPageInfo({ ...pageInfo, selectedCardId, selectedCard });
    setPageInfo({ ...pageInfo, selectedCardOption: updatedValue });
  };

  const handleCardSelection = (selectedCardId) => {
    let selectedCard = {};
    userCards.map(userCard => {
      if (selectedCardId === userCard.id) {
        selectedCard = userCard;
      }
    });
    setPageInfo({ ...pageInfo, selectedCardId, selectedCard });
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
              defaultValue={userCards[0].id}
              onChange={handleCardSelection}
            >
              {userCards.map((card, index) => (
                <ToggleButton
                  className="indi-card-item-wrapper indi-card-mini-item-wrapper"
                  key={index}
                  value={card?.id}
                  // variant="outline-primary"
                  variant="outline-primary"
                  id={`tbg-radio-${card.id}`}
                >
                  <>
                    <div className="indi-mini-card-name">{card.cardName}</div>
                    <CardMiniItem cardId={card.id} card={card} role="button" />
                  </>
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
          
            <div className="indi-signature-item-wrapper d-flex">
              <Signature
                selectedCardOption={pageInfo.selectedCardOption}
                cardId={pageInfo.selectedCardId}
                cardInfo={pageInfo.selectedCard}
                userData={userData}
              />
            </div>
          
          
            
          <SharingSignature props={{ pageInfo }} />
        </div>
      )}
    </div>
  );
};

export default EmailSignature;
