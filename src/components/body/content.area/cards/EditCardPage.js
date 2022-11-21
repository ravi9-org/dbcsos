import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import EditCardItem from "./AddEditCardItem";
import BadgesRibbon from "../badges/BadgesRibbon";

import CardContext from "./CardContext";

const EditCardPage = (props) => {
  const { cardid } = useParams();
  //console.log("cardid : " + cardid);
  const navigate = useNavigate();
  let { userData } = useContext(ContextComponent);

  let [cardCtxInfo, setCardCtxInfo] = useState({});
  let [templateData, setTemplateData] = useState({});

  let [cardImageValue, setCardImageValue] = useState("");
  let [croppedImageValue, setCroppedImageValue] = useState("");

  let [templateBadges, setTemplateBadges] = useState([]);

  let [canRender, setCanRender] = useState(false);

  let [hasCardDetails, setHasCardDetails] = useState(false);
  let [hasTemplateDetails, setHasTemplateDetails] = useState(false);

  let [detailsForEditCardPage, setDetailsForEditCardPage] = useState({
    template: {},
    card: {},
  });

  useEffect(() => {
    if (hasCardDetails) {
        const templateSuccess = (res) => {
        setTemplateData(res.data);
        setHasTemplateDetails(true);
      };
      const templateFail = (err) => {
        err?.message?.length && console.log(err);
      };

      let templateId = cardCtxInfo.templateId;

      Utils.getTemplateDetails(templateId).then(templateSuccess, templateFail);
    }
  }, [hasCardDetails]);

  useEffect(() => {
    if (hasTemplateDetails) {
      setTemplateBadges(templateData.linkedBadges);
    }
  }, [hasTemplateDetails]);

  useEffect(() => {
    if (hasCardDetails && hasTemplateDetails) {
      setDetailsForEditCardPage({
        template: templateData,
        card: cardCtxInfo,
      });
      setCanRender(true);
    }
  }, [hasCardDetails, hasTemplateDetails]);

  const success = (res) => {
    setCardCtxInfo(res.data);
    setCardImageValue(res.data.cardImage);
    setCroppedImageValue(res.data.croppedImage);
    setHasCardDetails(true);
  };

  const fail = (err) => {
    err?.message?.length && console.log(err);
  };

  useEffect(() => {
    Utils.getCardDetails(cardid).then(success, fail);
  }, []);

  const goBack = (e) => {
    navigate(Utils.APP_URLS.CARDS_PAGE);
  };

  let inputElementClassNames = "indi-any-input-element";
  let imageInputElementClassNames = "indi-image-input-element";
  let croppedImageInputElementClassNames = "indi-cropped-image-input-element";

  const saveCard = (e) => {
    e.preventDefault();
    let dataValues = [];
    let cardImageEle = document.getElementsByClassName(
      imageInputElementClassNames
    );
    let croppedCardImageEle = document.getElementsByClassName(
      croppedImageInputElementClassNames
    );

    let inputElements = document.getElementsByClassName(inputElementClassNames);
    let imageValues = [];

    for (let ele of inputElements) {
      let val = ele?.value || "";
      dataValues.push(val);
    }    

    let cardNameElement = document.getElementsByClassName('indi-add-card-name-input');
    let cardNameValue = cardNameElement[0]?.value || "";   

    for (let imgEle of cardImageEle) {
      let imgVal = imgEle?.value || "";
      setCardImageValue(imgVal);
      imageValues.push(imgVal);
    }

    for (let imgEle of croppedCardImageEle) {
      let imgVal = imgEle?.value || "";
      setCroppedImageValue(imgVal);
      imageValues.push(imgVal);
    }

    submitForm(dataValues, imageValues, cardNameValue);
  };

  const submitForm = (dataValues = {}, imageValues = [], cardNameValue = "") => {
    let info = { ...cardCtxInfo };

    info.fieldsData = dataValues;
    info.cardImage = imageValues[0];
    info.croppedImage = imageValues[1];
    info.cardName = cardNameValue;

    const success = (res) => {
      goBack();
    };

    const fail = (err) => {
      console.log(err);
    };

    try {
      Utils.executeCardEditRESTAPI(info, cardid).then(success, fail);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CardContext.Provider
      value={{
        cardCtxInfo,
        setCardCtxInfo,
      }}
    >
      {canRender && (
        <form>
          <div className="indi-add-card-wrapper d-flex flex-column">
            <div className="indi-add-card-title">Add Card</div>
            {
              <EditCardItem
                className="indi-add-card-wrapper"
                props={{
                  pageInfo: detailsForEditCardPage,
                  pageMode: "edit",
                  inputElementClassNames,
                }}
              />
            }
            <div className="indi-add-card-item-footer d-flex d-flex-row">
              <div className="indi-add-card-page-badge-ribbon-wrapper">
                <BadgesRibbon templateBadges={templateBadges} />
              </div>

              <div className="indi-add-card-page-footer-btn-wrapper d-flex d-flex-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={goBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveCard}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </CardContext.Provider>
  );
};

export default EditCardPage;
