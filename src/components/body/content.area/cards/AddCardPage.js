import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import AddCardItem from "./AddEditCardItem";
import BadgesRibbon from "../badges/BadgesRibbon";

import CardContext from "./CardContext";

const AddCard = (props) => {
  const navigate = useNavigate();
  let { setAlert } = useContext(ContextComponent);

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
    if (badge.default) {
      detailsForAddCardPage.card.userLinkedBadges.push(badge);
      detailsForAddCardPage.card.fieldsData.push(badge.defaultValue);
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

    let cardNameElement = document.getElementsByClassName(
      "indi-add-card-name-input"
    );
    let cardNameValue = cardNameElement[0]?.value || "";

    let cardCustomIDElement = document.getElementsByClassName(
      "indi-add-card-custom-id-input"
    );
    let cardCustomIDValue = cardCustomIDElement[0]?.value || "";

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
    submitForm(dataValues, imageValues, cardNameValue, cardCustomIDValue);
  };

  const submitForm = (
    dataValues = {},
    imageValues = [],
    cardNameValue = "",
    cardCustomIDValue = ""
  ) => {
    let info = { ...cardCtxInfo };
    let submitCardInfo = { ...info, userLinkedBadges: [] };
    delete submitCardInfo.fieldsData;
    info.userLinkedBadges.map((badge, index) => {
      let badgeData = {
        id: badge.id,
        badgeName: badge.badgeName,
        badgeOrder: index,
        value: dataValues[index],
      };
      submitCardInfo.userLinkedBadges.push(badgeData);
    });

    submitCardInfo.cardImage = imageValues[0];
    submitCardInfo.croppedImage = imageValues[1];
    submitCardInfo.cardName = cardNameValue;
    submitCardInfo.customId = cardCustomIDValue;

    const success = (res) => {
      goBack();
      setAlert({
        show: true,
        message: "Card added successfully",
      });
    };

    const fail = (err) => {
      console.log(err);
    };

    try {
      Utils.executeCardAddRESTAPI(submitCardInfo).then(success, fail);
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
