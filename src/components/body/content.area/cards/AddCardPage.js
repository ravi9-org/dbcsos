import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import AddCardItem from "./AddEditCardItem";
import BadgesRibbon from "../badges/BadgesRibbon";

import CardContext from "./CardContext";

const AddCard = (props) => {
  const navigate = useNavigate();
  let { userData } = useContext(ContextComponent);

  let [templateData, setTemplateData] = useState(
    props?.template?.selectedTemplate || {}
  );

  let detailsForAddCardPage = {
    template: templateData,
    card: {
      templateId: templateData.id,
      userLinkedBadges: [],
      userId: Utils.getUserId(),
      fieldsData: [],
      cardImage: templateData.profilePicture,
      croppedImage: templateData.profilePicture,
    },
  };

  templateData?.linkedBadges?.map((badge, index) => {
    if (Object.values(badge)[0].isDefault) {
      detailsForAddCardPage.card.userLinkedBadges.push(Object.keys(badge)[0]);
      detailsForAddCardPage.card.fieldsData.push(
        Object.values(badge)[0].defaultValue
      );
    }
  });

  let [cardImageValue, setCardImageValue] = useState(
    detailsForAddCardPage.template.profilePicture
  );
  let [croppedImageValue, setCroppedImageValue] = useState(
    detailsForAddCardPage.template.profilePicture
  );

  let [cardCtxInfo, setCardCtxInfo] = useState(detailsForAddCardPage.card);

  let [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(true);
  }, []);

  const goBack = (e) => {
    navigate(Utils.APP_URLS.CARDS_PAGE);
  };

  let inputElementClassNames = "indi-any-input-element";
  let imageInputElementClassNames = "indi-image-input-element";
  let croppedImageInputElementClassNames = "indi-cropped-image-input-element";

  const saveCard = (e) => {
    e.preventDefault();
    let dataValues = [];
    let cardImageEle = document.getElementsByClassName(
      imageInputElementClassNames
    );
    let croppedCardImageEle = document.getElementsByClassName(
      croppedImageInputElementClassNames
    );

    let inputElements = document.getElementsByClassName(inputElementClassNames);
    let imageValues = [];

    for (let ele of inputElements) {
      let val = ele?.value || "";
      dataValues.push(val);
    }

    let cardNameElement = document.getElementsByClassName('indi-add-card-name-input');
    let cardNameValue = cardNameElement[0]?.value || "";     

    for (let imgEle of cardImageEle) {
      let imgVal = imgEle?.value || "";
      setCardImageValue(imgVal);
      imageValues.push(imgVal);
    }

    for (let imgEle of croppedCardImageEle) {
      let imgVal = imgEle?.value || "";
      setCroppedImageValue(imgVal);
      imageValues.push(imgVal);
    }

    submitForm(dataValues, imageValues, cardNameValue);
  };

  const updateUserInfo = (newCardId) => {
    const success = (res) => {
      goBack();
    };
    const fail = (err) => {
      console.log(err);
    };

    try {
      let userCardsArray = [...userData?.cards];
      userCardsArray.push(newCardId);
      userCardsArray = [...new Set(userCardsArray)];

      let tempUserData = userData;

      tempUserData.cards = userCardsArray;

      Utils.addOrRemoveCardFromUser(userCardsArray).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  const submitForm = (dataValues = {}, imageValues = [], cardNameValue = "") => {
    let info = { ...cardCtxInfo };

    info.fieldsData = dataValues;
    info.cardImage = imageValues[0];
    info.croppedImage = imageValues[1];
    info.cardName = cardNameValue;

    const success = (res) => {
      updateUserInfo(res.data.id);
    };

    const fail = (err) => {
      console.log(err);
    };

    try {
      Utils.executeCardAddRESTAPI(info).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  let templateBadges = props.template.selectedTemplate.linkedBadges;

  return (
    <CardContext.Provider
      value={{
        cardCtxInfo,
        setCardCtxInfo,
      }}
    >
      {canRender && (
        <form>
          <div className="indi-add-card-wrapper d-flex flex-column">
            <div className="indi-add-card-title">Add Card</div>
            {
              <AddCardItem
                className="indi-add-card-wrapper"
                props={{
                  pageInfo: detailsForAddCardPage,
                  pageMode: "add",
                  inputElementClassNames,
                }}
              />
            }
            <div className="indi-add-card-item-footer d-flex d-flex-row">
              <div className="indi-add-card-page-badge-ribbon-wrapper">
                <BadgesRibbon templateBadges={templateBadges} />
              </div>

              <div className="indi-add-card-page-footer-btn-wrapper d-flex d-flex-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={goBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveCard}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </CardContext.Provider>
  );
};

export default AddCard;
