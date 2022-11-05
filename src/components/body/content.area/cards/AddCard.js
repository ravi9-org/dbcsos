import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import AddCardItem from "./AddEditCardItem";

const AddCard = ({ templateId = 2 }) => {
  const navigate = useNavigate();
  let { userData } = useContext(ContextComponent);

  let [templateData, setTemplateData] = useState({});
  let [newCardData, setNewCardData] = useState({});
  let [updatedFields, setUpdatedFields] = useState([]);
  let [updatedValues, setUpdatedValues] = useState([]);
  let [cardImageValue, setCardImageValue] = useState([]);

  let [isDataAvailable, setIsDataAvailable] = useState(false);
  const success = (res) => {
    setTemplateData(res.data);
    setIsDataAvailable(true);
    setUpdatedFields(res.data.fields);
    setUpdatedValues(res.data.fieldsData);
  };
  const fail = (err) => {
    err?.message?.length && console.log(err);
  };
  useEffect(() => {
    Utils.getTemplateDetails(templateId).then(success, fail);
  }, [isDataAvailable]);

  const goBack = (e) => {
    navigate(Utils.APP_URLS.CARDS_PAGE);
  };

  let inputElementClassNames = "indi-any-input-element";
  let imageInputElementClassNames = "indi-image-input-element";

  let [valueChanged, setValueChanged] = useState(false);
  const saveCard = (e) => {
    e.preventDefault();
    let dataValues = [];
    let cardImageEle = document.getElementsByClassName(
      imageInputElementClassNames
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
    setUpdatedValues(dataValues, cardImageValue);
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
      templateInfo.fields = updatedFields;
      templateInfo.userId = Utils.getUserId();
      templateInfo.cardImage = Utils.getUserId();
      submitForm(templateInfo);
    }
  }, [updatedValues]);

  return (
    <>
      <form>
        <div className="indi-add-card-wrapper d-flex flex-column">
          <div className="indi-add-card-title">Add Card</div>
          {isDataAvailable && (
            <AddCardItem
              className="indi-add-card-wrapper"
              props={{
                cardInitialData: templateData,
                setNewCardData,
                pageMode: "add",
                inputElementClassNames,
              }}
            />
          )}
          <div className="indi-add-card-item-footer">
            <button type="button" className="btn btn-primary" onClick={goBack}>
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
      </form>
    </>
  );
};

export default AddCard;
