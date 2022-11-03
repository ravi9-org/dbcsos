import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Modal, Alert } from "react-bootstrap";
import ContextComponent from "../../app.context";
import CardItem from "./card.item";
import CardItemWithActions from "./CardItemWithActions";
import Utils from "../../utils";
import EditIcon from "../../../assets/img/Edit.png";
import DeleteIcon from "../../../assets/img/Delete.png";

const CardDetailsPage = (props) => {
  const { cardid } = useParams();

  let [cardData, setCardData] = useState(props.cardData || {});
  let [fields, setFields] = useState(cardData?.fields || []);
  let [fieldsData, setFieldsData] = useState(cardData?.fieldsData || []);
  let [fieldsSchema, setFieldsSchema] = useState(cardData?.fieldsSchema || {});
  let [applyActions, setApplyActions] = useState(props.applyActions || false);

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [isReadyForRender, setIsReadyForRender] = useState(false);

  const navigate = useNavigate();

  let { userData, setUserData, userCards, setUserCards, setLoadingState } = useContext(ContextComponent);

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
    Utils.getCardDetails(cardid).then(success, fail);
  }, [isReadyForRender]);

  const navigateToCardListPage = (e) => {
    e.preventDefault();
    navigate("/cards");
  };

  const handleDelete = (e) => {
    console.log(userData);
    console.log(userCards);
    //return false;
    e.preventDefault();
    setShow(false);
    setLoadingState(true);

    

    //Utils.deleteCard(cardid, userData.cards).then(deleteSuccess, deleteFail);
    dummyDeleteSuccess();

  };

  const deleteSuccess = (res) => {
    console.log(res.updatedCardsArray);
    let tempUserData = { ...userData };
    let tempUserCards = [...res.updatedCardsArray];
    console.log(tempUserData);
    console.log(tempUserCards);
    tempUserCards = Utils.getUniqueSetOfArray(tempUserCards);
    console.log(tempUserCards);
    tempUserData.cards = [];
    tempUserData.cards = [...tempUserCards];
    setUserData({...tempUserData});
    //setUserCards({...userData, cards: res.updatedCardsArray});

    setShowAlert(true);
    setLoadingState(false);
    navigate("/cards");
    return false;
  };
  
  const dummyDeleteSuccess = () => {
    setShowAlert(true);
    setLoadingState(false);
    navigate("/cards");
    return false;
  };

  const deleteFail = (err) => {
    setLoadingState(false);
    setShowAlert(true);
    err?.message?.length && console.log(err);
  };

  const closeAlertHandler = (e) => {    
    setTimeout(() => {
      setShowAlert(false);
    }, 300);
  };

  return (
    <>
      {isReadyForRender && (
        <div className="dbs-add-card-wrapper d-flex flex-column">
          <div className="dbc-add-card-title">
            Add Card
            <div className="d-none1 w-50 dbc-body-actions">
              <div className="dbc-body-action">
                <img className="dbc-w-20" src={EditIcon} alt="Edit-icon"></img>
                Edit
              </div>
              <div
                className="dbc-body-action"
                role="button"
                onClick={handleShow}
              >
                <img
                  className="dbc-w-20"
                  src={DeleteIcon}
                  alt="Delete-icon"
                ></img>
                Delete
              </div>
            </div>
          </div>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete confirmation?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this card ("{cardData.templateName}")?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAlert} className="dbc-modal-dialog-alert" onHide={closeAlertHandler}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Delete confirmation?</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Alert
            key="success"
            className="dbc-modal-dialog-alert-body"
            onClose={closeAlertHandler}
            dismissible
            variant="success"
          >
            Successfully deleted!
          </Alert>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default CardDetailsPage;
