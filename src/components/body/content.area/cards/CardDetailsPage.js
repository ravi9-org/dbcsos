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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [isReadyForRender, setIsReadyForRender] = useState(false);

  const navigate = useNavigate();

  let { userData, setUserData, setLoadingState, setAlert } =
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
    setLoadingState({
      applyMask: true,
      text: "Loading cards",
    });
    Utils.deleteCard(cardid, userData.cards).then(deleteSuccess, deleteFail);
  };

  const deleteSuccess = (res) => {
    setAlert({
      show: true,
      message: "Card deleted successfully",
    });
    setLoadingState({
      applyMask: false,
    });
    navigate(Utils.APP_URLS.CARDS_PAGE);
  };

  const navigateToEditPage = (e) => {
    e.preventDefault();
    navigate(Utils.APP_URLS.EDIT_CARD_PAGE.replace(":cardid", cardid));
  };

  const deleteFail = (err) => {
    setLoadingState({
      applyMask: false,
    });
    err?.message?.length && console.log(err);
  };

  return (
    <>
      {isReadyForRender && (
        <div className="indi-add-card-wrapper d-flex flex-column">
          <div className="indi-add-card-title">
            Card View
            <div className="d-none1 w-50 indi-body-actions">
              <div
                className="indi-body-action"
                role="button"
                onClick={navigateToEditPage}
              >
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

      <Modal centered show={show} onHide={handleClose}>
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
    </>
  );
};

export default CardDetailsPage;
