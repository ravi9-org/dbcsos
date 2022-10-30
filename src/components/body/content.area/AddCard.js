import React, { useEffect, useState } from "react";
import { Router, useNavigate } from "react-router-dom";

import Utils from "../../utils";
import AddCardItem from "./AddCardItem";

const AddCard = ({ templateId = 1 }) => {
  const navigate = useNavigate();

  let [templateData, setTemplateData] = useState({});
  let [newCardData, setNewCardData] = useState({});

  let [isDataAvailable, setIsDataAvailable] = useState(false);
  const success = (res) => {
    //console.log(res.data);
      setTemplateData(res.data);
      setIsDataAvailable(true);
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
  const saveCard = (e) => {
    console.log(newCardData);
    console.log("TODO: saving card...");
  };
  return (
    <div className="dbs-add-card-wrapper d-flex">
      <div className="dbc-add-card-title">Add Card</div>
      {isDataAvailable && (
        <AddCardItem
          className="dbc-add-card-wrapper"
          props={{ cardInitialData: templateData, setNewCardData, mode: "xyz" }}
        />
      )}
      <div className="dbc-add-card-item-footer">
        <button onClick={goBack}>Back</button>
        <button onClick={saveCard}>Save</button>
      </div>
    </div>
  );
};

export default AddCard;
