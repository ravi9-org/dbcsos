import React, { useEffect, useState } from "react";
import { Router, useNavigate } from "react-router-dom";

import AddCardContextComponent from "./AddCardContextComponent";
import Utils from "../../utils";
import AddCardItem from "./AddCardItem";

const AddCard = ({ templateId = 1 }) => {
  const navigate = useNavigate();

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
    navigate(-1);
  };

  let inputElementClassNames = "dbc-any-input-element";

  let [valueChanged, setValueChanged] = useState(false);
  const saveCard = (e) => {
    console.log("TODO: saving card...");
    let dataValues = [];
    let inputElements = document.getElementsByClassName(inputElementClassNames);

    for (let ele of inputElements) {
      dataValues.push(ele?.value || "");
    }
    setUpdatedValues(dataValues);
    setValueChanged(true);
  };

  const submitForm = (info) => {
    const loginsuccess = (res) => {
      console.log(res);
      // execute user profile and update cards array...
      debugger;
    };
    const fail = (err) => {
      console.log(err);
      debugger;
    };
    const callback = (response) => {
      if (response.status === 200) {
        success(response);
      } else {
        fail(response);
      }
    };

    Utils.executeCardAddEditRESTAPI(info).then(callback);
  };

  useEffect(() => {
    if (valueChanged) {
      console.log(updatedValues);
      // validate and submit the form...
      let templateInfo = templateData;
      console.log(templateInfo);
      console.log(updatedFields);
      templateInfo.fieldsData = updatedValues;
      templateInfo.fields = updatedFields;
      templateInfo.userId = Utils.getUserId();
      console.log(templateInfo);
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
    </AddCardContextComponent.Provider>
  );
};

export default AddCard;
