import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ContextComponent from "../../app.context";
import CardItem from "./card.item";
import CardItemWithActions from "./CardItemWithActions";
import Utils from "../../utils";

const CardDetailsPage = (props) => {
  const { cardid } = useParams();

  let [cardData, setCardData] = useState(props.cardData || {});
  let [fields, setFields] = useState(cardData?.fields || []);
  let [fieldsData, setFieldsData] = useState(cardData?.fieldsData || []);
  let [fieldsSchema, setFieldsSchema] = useState(cardData?.fieldsSchema || {});
  let [applyActions, setApplyActions] = useState(props.applyActions || false);

  let [isReadyForRender, setIsReadyForRender] = useState(false);

  const navigate = useNavigate();

  let { userData } = useContext(ContextComponent);

  const success = (res) => {
    setCardData(res.data);
    setFields(res.data.fields);
    setFieldsData(res.data.fieldsData);
    setFieldsSchema(res.data.fieldsSchema);
    let existingUserData = { ...userData };
    existingUserData?.cards?.push(res.data.id);
    setIsReadyForRender(true);
    return false;
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    console.log("cardId" + cardid);
    Utils.getCardDetails(cardid).then(success, fail);
  }, [isReadyForRender]);

  const navigateToCardListPage = (e) => {
    e.preventDefault();
    navigate("/cards");
  };

  return (
    <>
      {isReadyForRender && (
        <div className="dbs-add-card-wrapper d-flex flex-column">
          <div className="dbc-add-card-title">Add Card</div>
          <div className="dbc-card-details-wrapper d-flex d-flex-column">
            <CardItem
              cardId={cardid}
              cardData={cardData}
              applyActions={false}
            />
            <CardItemWithActions
              cardId={cardid}
              cardData={cardData}
              applyActions={false}
            />
          </div>
          <div className="dbc-add-card-item-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={navigateToCardListPage}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CardDetailsPage;
