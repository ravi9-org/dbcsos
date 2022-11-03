import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContextComponent from "../../app.context";
import AddItemImg from "../../../assets/img/add-card.png";
import EditIcon from "../../../assets/img/Edit.png";
import DeleteIcon from "../../../assets/img/Delete.png";
import TempUpdate from "./tempUpdate";
//import CardItem from "card.item";
import CardItem from "./card.item";

const CardList = () => {
  let { userData } = useContext(ContextComponent);

  let [userCards, setUserCards] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (userData?.cards) {
      setUserCards([...new Set(userData.cards)]);//[...new Set(userData.cards)]
      //console.log(userCards);
    }
  }, [userData]);

  const navgiatToAddPage = (e) => {
    e.preventDefault();
    navigate("/cards/addcard");
  }
  return (
    <div className="dbc-body-cards-wrapper d-flex w-100">
      <div className="dbc-body-action-bar w-100">
        <div className="w-50 dbc-body-action-bar-title">
          Add Digital Business Card
        </div>
        <div className="w-50 dbc-body-actions">
          <div className="dbc-body-action"><img className="dbc-w-20"  src={EditIcon} alt="Edit-icon"></img>Edit</div>
          <div className="dbc-body-action"><img className="dbc-w-20"  src={DeleteIcon} alt="Delete-icon"></img>Delete</div>
        </div>
      </div>

      <div className="dbc-cards-collection-wrapper d-flex">
        <div className="d-flex dbc-placeholder-add-card dbc-card-item-wrapper" onClick={navgiatToAddPage}>
          <div className="d-flex dbc-placeholder-add-card-img">
            <img src={AddItemImg} alt="Add item" />
          </div>
          <div className="d-flex dbc-placeholder-add-card-text">Add card</div>
        </div>
        {userCards.map((id, index) => (
          <div className="dbc-card-item-wrapper" key={index}>
            <CardItem cardId={id} applyActions={true} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
