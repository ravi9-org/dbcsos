import React, { useState, useEffect } from "react";

import Utils from "../../utils";
import CardItemImg from "../../../assets/img/Card.png";

const CardItem = (props) => {
  let [cardId, setCardId] = useState(props.cardId);
  //console.log(cardId);

  let [cardData, setCardData] = useState({});

  const success = (res) => {
    //console.log(res.data);
    //debugger;
    res.data.fields.map((field, index) => {
      //debugger;
      let key, value;
      Object.keys(field).map((k, i) => {
        if (k !== "data") {
          key = k;
          value = field["data"];
        }
      });
      //console.log(key + ":" + value);
      // field.map((key, innerIndex) => {
      // console.log(key);
      // });
    });
    setCardData(res.data);
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
    //debugger;
  };

  useEffect(() => {
    //Utils.getUserProfile().then(success, fail);
    Utils.getCardDetails(cardId).then(success, fail);
  }, []);

  return (
    <div className="dbc-card-item-parent card-with-bg">
      <div>
        {/* <img src={cardData.backgroundImage} alt="backgroundimage" /> */}
      </div>
      <div className="d-none">
        <img src={cardData.logoImage} alt="logoiamge" />
      </div>
      
      <div className="dbc-card-upload-picture"></div>
      <div className="dbc-info-wrapper">        
        <div className="dbc-card-name fw-bold">John Dingdong</div>
        <div className="dbc-card-title">Title</div>
      </div>
      <div className="dbc-card-fields">
        <div className="dbc-card-field-wrapper">            
          <div>telephoe: 987654321</div>
          <div>mobile: 9988776655</div>
          <div>website: www.google.com</div>
          <div>youtube: www.youtube.com</div>
          <div>telephoe: 987654321</div>
          <div>mobile: 9988776655</div>
          <div>website: www.google.com</div>
          <div>youtube: www.youtube.com</div>
          <div>telephoe: 987654321</div>
          <div>mobile: 9988776655</div>
          <div>website: www.google.com</div>
          <div>youtube: www.youtube.com</div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
