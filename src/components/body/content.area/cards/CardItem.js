import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Field from "../../../controls/input.elements/Field";
import Utils from "../../../Utils";
import ContextComponent from "../../../AppContext";
import CardContext from "./CardContext";

const CardItem = (props) => {
  let cardId = props.cardId;

  let showCardName = props?.showCardName ?? true;
  let enableSocialLinks = props?.enableSocialLinks ?? false;

  let cardObj = props.card || {};
  let [applyActions, setApplyActions] = useState(props.applyActions || false);

  let [canRender, setCanRender] = useState(false);

  let [cardCtxInfo, setCardCtxInfo] = useState({});

  const navigate = useNavigate();

  let { userData, setLoadingState } = useContext(ContextComponent);

  userData = props?.userData || userData || {};
  let [pronoun, setPronoun] = useState("");
  let [saluatation, setSaluatation] = useState("");

  const success = (res) => {
    setCardCtxInfo(res.data);
    setPronoun(Utils.PRONOUNS[res.data.userFieldInfo.pronoun]);
    setSaluatation(Utils.SALUATATION[res.data.userFieldInfo.saluatation || ""]);

    setCanRender(true);
    setLoadingState({
      applyMask: false,
    });
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
    setLoadingState({
      applyMask: false,
    });
  };

  useEffect(() => {
    setLoadingState({
      applyMask: true,
      text: "Loading card",
    });
    if (Utils.isObjectEmpty(cardObj)) {
      Utils.getCardDetails(cardId).then(success, fail);
    } else {
      success({
        data: cardObj,
      });
    }
  }, []);

  const navigateToCardDetailsPage = (e) => {
    if (applyActions) {
      e.preventDefault();
      navigate(Utils.APP_URLS.CARDS_PAGE + "/" + cardId, {
        state: { cardData: cardCtxInfo },
      });
    }
  };

  return (
    <>
      {canRender && (
        <CardContext.Provider
          value={{
            cardCtxInfo,
            setCardCtxInfo,
          }}
        >
          <div
            onClick={navigateToCardDetailsPage}
            className={`indi-card-item-parent card-with-bg ${
              applyActions ? "indi-card-with-actions" : ""
            }`}
            style={{
              background: `url(${cardCtxInfo.templateInfo.backgroundImage})`,
            }}
          >
            <div className="d-none1 indi-card-company-logo-wrapper">
              <img src={cardCtxInfo.templateInfo.logoImage} alt="logoiamge" />
            </div>
            <div className="indi-card-upload-picture">
              <img
                className="indi-card-upload-picture-img"
                src={cardCtxInfo.croppedImage}
                alt="upload img"
              />
            </div>
            <div className="indi-info-wrapper">
              <div className="indi-card-name fw-bold">
                {saluatation} {cardCtxInfo?.userFieldInfo?.firstName}{" "}
                {cardCtxInfo?.userFieldInfo?.lastName} ({pronoun})
              </div>
              <div className="indi-card-title">{userData?.title}</div>
            </div>
            <div className="indi-card-fields">
              <div className="indi-card-field-wrapper">
                {cardCtxInfo.userLinkedBadges?.map(
                  (field, index) =>
                    !!field.value && (
                      <Field
                        field={field}
                        fieldIndex={index}
                        key={index}
                        enableSocialLinks={enableSocialLinks}
                      />
                    )
                )}
              </div>
            </div>
            {showCardName && (
              <div className="indi-template-title indi-place-me-bottom-left">
                {cardCtxInfo.cardName}
              </div>
            )}
          </div>
        </CardContext.Provider>
      )}
    </>
  );
};

export default CardItem;
