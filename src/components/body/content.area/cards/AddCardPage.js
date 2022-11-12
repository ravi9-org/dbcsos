import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import AddCardItem from "./AddEditCardItem";
import BadgesRibbon from "../badges/BadgesRibbon";

import CardContext from "./CardContext";

const AddCard = (props) => {
  //console.log(props);
  let [template, setTemplate] = useState(
    props?.template?.selectedTemplate || {}
  );
  const navigate = useNavigate();
  let { userData, badgesCtxData } = useContext(ContextComponent);

  let [templateData, setTemplateData] = useState(
    props?.template?.selectedTemplate || {}
  );
  let [newCardData, setNewCardData] = useState({});
  let [updatedFields, setUpdatedFields] = useState([]);
  let [updatedValues, setUpdatedValues] = useState([]);
  let [cardImageValue, setCardImageValue] = useState([]);
  let [croppedImageValue, setCroppedImageValue] = useState([]);
  let [cardCtxInfo, setCardCtxInfo] = useState({ fields: [], data: [] });

  let [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setTemplateData(props?.template?.selectedTemplate || {});
    let values = [];
    let fields = [];
    props.template.selectedTemplate.linkedBadges.map((badge) => {
      let badgeId = Object.keys(badge)[0];
      fields.push(badgeId);
      let value = badge[badgeId].defaultValue;
      values.push(value);
    });
    //console.log(values);
    setUpdatedFields(props.template.selectedTemplate.linkedBadges);
    setUpdatedValues(values);
    let tempCardCtxInfo = { ...cardCtxInfo };
    tempCardCtxInfo.fields = fields;
    tempCardCtxInfo.data = values;
    setCardCtxInfo(tempCardCtxInfo);
    setCanRender(true);
  }, []);

  const goBack = (e) => {
    navigate(Utils.APP_URLS.CARDS_PAGE);
  };

  let inputElementClassNames = "indi-any-input-element";
  let imageInputElementClassNames = "indi-image-input-element";
  let croppedImageInputElementClassNames = "indi-cropped-image-input-element";

  let [valueChanged, setValueChanged] = useState(false);
  const saveCard = (e) => {
    e.preventDefault();
    let dataValues = [];
    let cardImageEle = document.getElementsByClassName(
      imageInputElementClassNames
    );
    let croppedCardImageEle = document.getElementsByClassName(
      croppedImageInputElementClassNames
    );

    let cardImageValue = "";
    let inputElements = document.getElementsByClassName(inputElementClassNames);

    for (let ele of inputElements) {
      let val = ele?.value || "";
      dataValues.push(val);
    }

    for (let imgEle of cardImageEle) {
      let imgVal = imgEle?.value || "";
      setCardImageValue(imgVal);
    }

    for (let imgEle of croppedCardImageEle) {
      let imgVal = imgEle?.value || "";
      setCroppedImageValue(imgVal);
    }

    setUpdatedValues(dataValues, cardImageValue, croppedImageValue);
    setValueChanged(true);
  };

  const updateUserInfo = (newCardId = 2) => {
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

  const submitForm = (info) => {
    info.cardImage = cardImageValue;
    info.croppedImage = croppedImageValue;
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

  useEffect(() => {
    if (valueChanged) {
      let templateInfo = templateData;
      templateInfo.fieldsData = updatedValues;
      templateInfo.fields = cardCtxInfo.fields;
      templateInfo.userId = Utils.getUserId();
      templateInfo.cardImage = Utils.getUserId();
      submitForm(templateInfo);
    }
  }, [updatedValues]);

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
                  cardInitialData: templateData,
                  setNewCardData,
                  pageMode: "add",
                  inputElementClassNames,
                }}
              />
            }
            <div className="indi-add-card-item-footer d-flex d-flex-row">
              <div className="indi-add-card-page-badge-ribbon-wrapper">
                <BadgesRibbon />
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
