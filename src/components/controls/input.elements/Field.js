import React, { useContext, useState, useEffect } from "react";
import InputElement from "./InputElement";
import ContextComponent from "../../AppContext";
import CardContext from "../../body/content.area/cards/CardContext";

const Field = (props = {}) => {
  let { cardCtxInfo, setCardCtxInfo } = useContext(CardContext);
  let { addrCtxData } = useContext(ContextComponent);

  let fieldIndex = props?.fieldIndex ?? -1;
  let fieldProps = props.field;
  let enableSocialLinks = props?.enableSocialLinks ?? false;
  let fieldType = fieldProps.badgeUID;
  let showEmptyField = fieldProps?.showEmptyField || false;
  let fieldSchema = fieldProps;
  let iconDarkImage = fieldProps?.darkIconImage || "";

  let isDefault = !!fieldProps?.default;

  let fieldData = fieldProps.value || fieldProps.defaultValue;

  if (fieldProps.constant) {
    fieldData = fieldProps.defaultValue || fieldProps.value;
  }

  let showAsLink = false;
  let toWhere = fieldProps.value;

  
  if (fieldProps.badgeType === "url") {
    fieldData = fieldData
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "");
  }

  if (enableSocialLinks) {
    if (fieldProps.badgeType === "url") {
      showAsLink = true;
    } else if (fieldProps.badgeType === "email") {
      showAsLink = true;
      fieldData = cardCtxInfo?.userFieldInfo?.email || fieldData;
      toWhere = "mailto:" + (fieldData || toWhere);
    }
  }

  let isEmpty = false;
  if ((fieldData === undefined || fieldData?.length === 0) && showEmptyField) {
    isEmpty = true;
  }
  let mode = props.pageMode;
  let canRemoveField = !isDefault && (mode === "add" || mode === "edit");

  if (
    !canRemoveField &&
    (mode === "add" || mode === "edit") &&
    fieldIndex > 0
  ) {
    for (let i = 0; i < fieldIndex; i++) {
      let badgeUID = cardCtxInfo.userLinkedBadges[i].badgeUID;
      if (badgeUID === fieldProps.badgeUID) {
        canRemoveField = true;
      }
    }
  }

  const removeField = (e) => {
    e.preventDefault();
    let tempCardCtxInfo = { ...cardCtxInfo };
    tempCardCtxInfo.userLinkedBadges =
      tempCardCtxInfo?.userLinkedBadges?.filter((field, index) => {
        return index !== fieldIndex;
      });
    setCardCtxInfo(tempCardCtxInfo);
  };

  let isLookupField = fieldType === "address";

  let initFullAddress = "";

  if (!!fieldData && isLookupField) {
    if (fieldProps.addressData) {
      initFullAddress =
        fieldProps.addressData.address +
        " " +
        fieldProps.addressData.city +
        " " +
        fieldProps.addressData.country +
        " " +
        fieldProps.addressData.zip;
    } else {
      let addrId = parseInt(fieldData, 10);
      let addrIdx = addrCtxData.ids.indexOf(addrId);
      initFullAddress = addrCtxData.fullAddresses[addrIdx];
    }
  }

  let [fullAddress, setFullAddress] = useState(initFullAddress);

  useEffect(() => {}, [cardCtxInfo.userLinkedBadges]);

  return (
    <div className="indi-card-field-item d-flex">
      <div
        style={{ backgroundImage: `url(${iconDarkImage})` }}
        className="indi-card-field-item-img"
      ></div>

      {(mode === "readonly" || (mode !== "add" && mode !== "edit")) && (
        <div className="indi-card-field-item-value">
          {isLookupField && (
            <>
              <div className="indi-card-address-text">{fullAddress}</div>
            </>
          )}
          {!isLookupField && showAsLink && (
            <a
              className="indi-ext-card-social-link"
              href={toWhere}
              target={"_blank"}
              rel={"noreferrer"}
            >
              {fieldData}
            </a>
          )}
          {!isLookupField && !showAsLink && <>{fieldData}</>}
        </div>
      )}

      {isEmpty && (
        <div className="indi-tamplte-empty-field-value">No value set</div>
      )}

      {(mode === "add" || mode === "edit") && (
        <InputElement
          props={{
            fieldProps: fieldSchema,
          }}
        />
      )}

      {canRemoveField && (
        <div
          className="indi-badge-field-remove"
          role="button"
          onClick={removeField}
        >
          x
        </div>
      )}
    </div>
  );
};

export default Field;
