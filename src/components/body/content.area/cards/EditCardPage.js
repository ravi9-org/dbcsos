import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";

import ContextComponent from "../../../AppContext";
import Utils from "../../../Utils";
import EditCardItem from "./AddEditCardItem";
import BadgesRibbon from "../badges/BadgesRibbon";

import CardContext from "./CardContext";

const EditCardPage = (props) => {
  const { cardid } = useParams();
  const navigate = useNavigate();

  let { setAlert } = useContext(ContextComponent);

  let [cardCtxInfo, setCardCtxInfo] = useState({});
  let [templateData, setTemplateData] = useState({});

  let [cardImageValue, setCardImageValue] = useState("");
  let [croppedImageValue, setCroppedImageValue] = useState("");

  let [canRender, setCanRender] = useState(false);
  // let [hasTemplateDetails, setHasTemplateDetails] = useState(false);

  let [detailsForEditCardPage, setDetailsForEditCardPage] = useState({
    template: {},
    card: {},
  });

  let [templateLinkedBadges, setTemplateLinkedBadges] = useState({});

  const success = (res) => {
    setCardCtxInfo(res.data);
    setCardImageValue(res.data.cardImage);
    setCroppedImageValue(res.data.croppedImage);

    let templateInfo = {
      ...res.data.templateInfo,
      userLinkedBadges: res.data.templateInfo.linkedBadges,
    };
    
    let templateLinkedBadgesObj = {};
    res.data.templateInfo.linkedBadges.forEach((badge) => {
      templateLinkedBadgesObj[badge.badgeUID] = badge.id;
    });
    setTemplateLinkedBadges(templateLinkedBadgesObj);
    
    setTemplateData(templateInfo);

    setDetailsForEditCardPage({
      template: templateInfo,
      fieldsData: [],
      card: res.data,
    });

    setCanRender(true);
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

    let cardNameElement = document.getElementsByClassName(
      "indi-add-card-name-input"
    );
    let cardNameValue = cardNameElement[0]?.value || "";

    let cardCustomIDElement = document.getElementsByClassName(
      "indi-add-card-custom-id-input"
    );
    let cardCustomIDValue = cardCustomIDElement[0]?.value || "";

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

    submitForm(dataValues, imageValues, cardNameValue, cardCustomIDValue);
  };

  const submitForm = (
    dataValues = {},
    imageValues = [],
    cardNameValue = "",
    cardCustomIDValue = ""
  ) => {
    let info = { ...cardCtxInfo };
    let submitCardInfo = { ...info, userLinkedBadges: [] };
    delete submitCardInfo.fieldsData;
    info.userLinkedBadges.map((badge, index) => {
      let badgeData = {
        id: templateLinkedBadges[badge.badgeUID],
        badgeName: badge.badgeName,
        badgeOrder: index,
        value: dataValues[index],
      };
      submitCardInfo.userLinkedBadges.push(badgeData);
    });

    submitCardInfo.cardImage = imageValues[0];
    submitCardInfo.croppedImage = imageValues[1];
    submitCardInfo.cardName = cardNameValue;
    submitCardInfo.customId = cardCustomIDValue;

    delete submitCardInfo.fieldsData;
    delete submitCardInfo.customUrl;
    delete submitCardInfo.id;
    delete submitCardInfo.publicId;
    delete submitCardInfo.publicUrl;
    delete submitCardInfo.qrCode;
    delete submitCardInfo.templateId;
    delete submitCardInfo.templateInfo;
    delete submitCardInfo.userFieldInfo;
    delete submitCardInfo.userId;

    // console.log(submitCardInfo);

    const success = (res) => {
      setAlert({
        show: true,
        message: "Card updated successfully",
      });
      goBack();
    };

    const fail = (err) => {
      console.log(err);
    };

    try {
      Utils.executeCardEditRESTAPI(submitCardInfo, cardid).then(success, fail);
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
                <BadgesRibbon templateBadges={templateData.userLinkedBadges} />
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
