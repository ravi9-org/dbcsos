import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import EditCardItem from "./AddEditCardItem";

const EditCard = () => {
  const { cardid } = useParams();

  const navigate = useNavigate();

  let [templateData, setTemplateData] = useState({});
  let [newCardData, setNewCardData] = useState({});
  let [updatedFields, setUpdatedFields] = useState([]);
  let [updatedValues, setUpdatedValues] = useState([]);
  let [cardImageValue, setCardImageValue] = useState([]);

  let [isDataAvailable, setIsDataAvailable] = useState(false);
  const success = (res) => {
    setTemplateData(res.data);
    setUpdatedFields(res.data.fields);
    setUpdatedValues(res.data.fieldsData);
    setIsDataAvailable(true);
  };
  const fail = (err) => {
    err?.message?.length && console.log(err);
  };
  useEffect(() => {
    Utils.getCardDetails(cardid).then(success, fail);
  }, [isDataAvailable]);

  const goBack = (e) => {
    navigate(Utils.APP_URLS.CARDS_PAGE);
  };

  let inputElementClassNames = "indi-any-input-element";
  let imageInputElementClassNames = "indi-image-input-element";

  let [valueChanged, setValueChanged] = useState(false);
  const updateCard = (e) => {
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

  const navigateBackToCardsListPage = () => {
    navigate(Utils.APP_URLS.CARDS_PAGE);
  };

  const submitForm = (info) => {
    info.cardImage = cardImageValue;
    const success = (res) => {
      navigateBackToCardsListPage();
    };
    const fail = (err) => {
      console.log(err);
    };

    try {
      Utils.executeCardEditRESTAPI(info, cardid).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (valueChanged) {
      let templateInfo = templateData;
      templateInfo.fieldsData = updatedValues;
      templateInfo.fields = updatedFields;
      templateInfo.userId = cardid;
      templateInfo.cardImage = Utils.getUserId();
      submitForm(templateInfo);
    }
  }, [updatedValues]);

  return (
    <>
      <form>
        <div className="indi-add-card-wrapper d-flex flex-column">
          <div className="indi-add-card-title">Edit Card</div>
          {isDataAvailable && (
            <EditCardItem
              className="indi-add-card-wrapper"
              props={{
                cardInitialData: templateData,
                setNewCardData,
                pageMode: "edit",
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
              onClick={updateCard}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditCard;
