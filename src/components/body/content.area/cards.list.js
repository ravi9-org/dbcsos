import React, { useState, useRef, useContext, useEffect } from "react";
import ContextComponent from "../../app.context";
import AddItemImg from "../../../assets/img/add.png";
//import CardItem from "card.item";
import CardItem from "./card.item";

const CardList = () => {
  let { userData } = useContext(ContextComponent);

  let [userCards, setUserCards] = useState([]);

  useEffect(() => {
    if (userData?.cards) {
      setUserCards(userData.cards);
      console.log(userCards);
      //debugger;
    }
  }, [userData]);
  return (
    <div className="dbc-body-cards-wrapper d-flex w-100">
      <div className="dbc-body-action-bar w-100">
        <div className="w-50 dbc-body-action-bar-title">
          Add Digital Business Card
        </div>
        <div className="w-50 dbc-body-actions">
          <div className="dbc-body-action">Edit</div>
          <div className="dbc-body-action">Delete</div>
        </div>
      </div>

      <div className="dbc-cards-collection-wrapper d-flex">
        <div className="d-flex dbc-placeholder-add-card dbc-card-item-wrapper">
          <div className="d-flex dbc-placeholder-add-card-img">
            <img src={AddItemImg} alt="Add item" />
          </div>
          <div className="d-flex dbc-placeholder-add-card-text">Add card</div>
        </div>
        {userCards.map((id, index) => (
          <div className="dbc-card-item-wrapper" key={index}>
            <CardItem cardId={id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
