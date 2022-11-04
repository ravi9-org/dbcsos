import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Modal, Alert } from "react-bootstrap";

import ContextComponent from "../../../AppContext";
import CardItem from "./CardItem";
import CardItemWithActions from "./CardItemWithActions";
import Utils from "../../../Utils";
import EditIcon from "../../../../assets/img/Edit.png";
import DeleteIcon from "../../../../assets/img/Delete.png";

const CardDetailsPage = (props) => {
  const { cardid } = useParams();

  let [cardData, setCardData] = useState(props.cardData || {});
  let [fields, setFields] = useState(cardData?.fields || []);
  let [fieldsData, setFieldsData] = useState(cardData?.fieldsData || []);
  let [fieldsSchema, setFieldsSchema] = useState(cardData?.fieldsSchema || {});

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [isReadyForRender, setIsReadyForRender] = useState(false);

  const navigate = useNavigate();

  let { userData, setUserData, userCards, setLoadingState } =
    useContext(ContextComponent);

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
    navigate(Utils.APP_URLS.CARDS_PAGE);
  };

  const handleDelete = (e) => {
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
    setUserData({ ...tempUserData });
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
        <div className="indi-add-card-wrapper d-flex flex-column">
          <div className="indi-add-card-title">
            Card View
            <div className="d-none1 w-50 indi-body-actions">
              <div className="indi-body-action">
                <img className="indi-w-20" src={EditIcon} alt="Edit-icon"></img>
                Edit
              </div>
              <div
                className="indi-body-action"
                role="button"
                onClick={handleShow}
              >
                <img
                  className="indi-w-20"
                  src={DeleteIcon}
                  alt="Delete-icon"
                ></img>
                Delete
              </div>
            </div>
          </div>
          <div className="indi-card-details-wrapper indi-cards-collection-wrapper d-flex d-flex-column">
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
          <div className="indi-add-card-item-footer">
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

      <Modal
        show={showAlert}
        className="indi-modal-dialog-alert"
        onHide={closeAlertHandler}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Delete confirmation?</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Alert
            key="success"
            className="indi-modal-dialog-alert-body"
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
