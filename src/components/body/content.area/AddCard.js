import React, { useEffect, useState, useContext } from "react";
import { Router, useNavigate } from "react-router-dom";

import AddCardContextComponent from "./AddCardContextComponent";
import ContextComponent from "../../app.context";
import Utils from "../../utils";
import AddCardItem from "./AddCardItem";

const AddCard = ({ templateId = 1 }) => {
  const navigate = useNavigate();
  let { userData, setUserData } = useContext(ContextComponent);

  let [templateData, setTemplateData] = useState({});
  let [newCardData, setNewCardData] = useState({});
  let [updatedFields, setUpdatedFields] = useState([]);
  let [updatedValues, setUpdatedValues] = useState([]);

  let [isDataAvailable, setIsDataAvailable] = useState(false);
  const success = (res) => {
    //console.log(res.data);
    setTemplateData(res.data);
    setIsDataAvailable(true);
    setUpdatedFields(res.data.fields);
    setUpdatedValues(res.data.fieldsData);
    //debugger;
  };
  const fail = (err) => {
    err?.message?.length && console.log(err);
    //debugger;
  };
  //console.log(templateId);
  useEffect(() => {
    Utils.getTemplateDetails(templateId).then(success, fail);
  }, [isDataAvailable]);

  const goBack = (e) => {
    navigate("/cards");
  };

  let inputElementClassNames = "dbc-any-input-element";

  let [valueChanged, setValueChanged] = useState(false);
  const saveCard = (e) => {
    e.preventDefault();
    // console.log("TODO: saving card...");
    let dataValues = [];
    let inputElements = document.getElementsByClassName(inputElementClassNames);

    for (let ele of inputElements) {
      dataValues.push(ele?.value || "");
    }
    setUpdatedValues(dataValues);
    setValueChanged(true);
  };

  const updateUserInfo = (newCardId = 2) => {
    const success = (res) => {
      goBack();
    };
    const fail = (err) => {
      console.log(err);
      //debugger;
    };
    const callback = (response) => {
      if (response.status === 200) {
        success(response);
      } else {
        fail(response);
      }
    };

    try {
      let userCardsArray = [...userData?.cards];
      //console.log(userCardsArray);
      //debugger;
      userCardsArray.push(newCardId);
      userCardsArray = [...new Set(userCardsArray)];

      let tempUserData = userData;

      tempUserData.cards = userCardsArray;

      Utils.addOrRemoveCardFromUser(userCardsArray).then(success, fail);
    } catch (e) {
      console.log(e);
      //debugger;
    }
  };

  const submitForm = (info) => {
    const success = (res) => {
      //console.log(res);
      let newId = res.data.id;
      // console.log(newId);
      // debugger;
      updateUserInfo(res.data.id);
      // execute user profile and update cards array...
      //debugger;
    };
    const fail = (err) => {
      console.log(err);
      //debugger;
    };
    const callback = (response) => {
      if (response.status === 200) {
        success(response);
      } else {
        fail(response);
      }
    };

    try {
      Utils.executeCardAddRESTAPI(info).then(success, fail);
    } catch (e) {
      console.log(e);
      //debugger;
    }
  };

  useEffect(() => {
    if (valueChanged) {
      // console.log(updatedValues);
      // validate and submit the form...
      let templateInfo = templateData;
      // console.log(templateInfo);
      // console.log(updatedFields);
      templateInfo.fieldsData = updatedValues;
      templateInfo.fields = updatedFields;
      templateInfo.userId = Utils.getUserId();
      // console.log(templateInfo);
      submitForm(templateInfo);
    }
  }, [updatedValues]);

  return (
    <AddCardContextComponent.Provider
      value={{
        templateData,
        updatedValues,
        updatedFields,
      }}
    >
      <form>
        <div className="dbs-add-card-wrapper d-flex">
          <div className="dbc-add-card-title">Add Card</div>
          {isDataAvailable && (
            <AddCardItem
              className="dbc-add-card-wrapper"
              props={{
                cardInitialData: templateData,
                setNewCardData,
                mode: "add",
                inputElementClassNames,
              }}
            />
          )}
          <div className="dbc-add-card-item-footer">
            <button onClick={goBack}>Back</button>
            <button onClick={saveCard}>Save</button>
          </div>
        </div>
      </form>
    </AddCardContextComponent.Provider>
  );
};

export default AddCard;
