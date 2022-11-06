import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ContextComponent from "../../../AppContext";
import AddItemImg from "../../../../assets/img/add-card.png";
import Utils from "../../../Utils";
import CardItem from "./CardItem";

const CardsList = () => {
  let { userData } = useContext(ContextComponent);

  let [userCards, setUserCards] = useState(userData?.cards || []);
  let navigate = useNavigate();

  useEffect(() => {
    if (userData?.cards) {
      setUserCards(Utils.getUniqueSetOfArray(userData.cards));
    }
  }, [userData]);

  const navgiatToAddPage = (e) => {
    e.preventDefault();
    navigate(Utils.APP_URLS.ADD_CARD_PAGE);
  };
  return (
    <>
      <div className="indi-body-cards-wrapper d-flex w-100">
        <div className="indi-body-action-bar w-100">
          <div className="w-50 indi-body-action-bar-title">
            Digital Business Cards
          </div>
        </div>

        <div className="indi-cards-collection-wrapper d-flex">
          <div
            className="d-flex indi-placeholder-add-card indi-card-item-wrapper"
            onClick={navgiatToAddPage}
          >
            <div className="d-flex indi-placeholder-add-card-img">
              <img src={AddItemImg} alt="Add item" />
            </div>
            <div className="d-flex indi-placeholder-add-card-text">
              Add card
            </div>
          </div>
          {userCards.map((id, index) => (
            <div className="indi-card-item-wrapper" key={index}>
              <CardItem cardId={id} applyActions={true} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardsList;
