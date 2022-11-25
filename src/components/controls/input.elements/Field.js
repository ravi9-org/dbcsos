import React, { useContext, useState } from "react";
import InputElement from "./InputElement";
import ContextComponent from "../../AppContext";
import CardContext from "../../body/content.area/cards/CardContext";
import Utils from "../../Utils";

const Field = (props = {}) => {  
  let { cardCtxInfo, setCardCtxInfo } = useContext(CardContext);

  let fieldIndex = props?.fieldIndex || 0;
  let fieldProps = props.fieldProps;
  let fieldType = fieldProps.badgeUID;
  let showEmptyField = fieldProps?.showEmptyField || false;
  let fieldSchema = fieldProps;
  let iconDarkImage = fieldProps?.darkIconImage || fieldProps?.fieldSchema?.darkIconImage || "";

  let isDefault = !!fieldProps?.fieldSchema?.default;

  let fieldData = fieldProps.value || fieldProps.defaultValue;
  
  let isEmpty = false;
  if ((fieldData === undefined || fieldData?.length === 0) && showEmptyField) {
    isEmpty = true;
  }
  let mode = props.pageMode;
  let canRemoveField = !isDefault && (mode === "add" || mode === "edit");

  let inputElementClassNames = fieldProps.inputElementClassNames;

  const removeField = (e) => {
    e.preventDefault();
    let tempCardCtxInfo = { ...cardCtxInfo };
    tempCardCtxInfo.userLinkedBadges =
      tempCardCtxInfo?.userLinkedBadges?.filter((field, index) => {
        return index !== fieldIndex;
      });
    tempCardCtxInfo.fieldsData = tempCardCtxInfo?.fieldsData?.filter(
      (field, index) => {
        return index !== fieldIndex;
      }
    );
    setCardCtxInfo(tempCardCtxInfo);
  };

  let isLookupField = fieldType === "address";

  let initFullAddress = "";

  if (!!fieldData && isLookupField) {
    let addrId = parseInt(fieldData, 10);
    // let addrIdx = addrCtxData.ids.indexOf(addrId);
    // initFullAddress = addrCtxData.fullAddresses[addrIdx];
    initFullAddress = "";
  }

  let [fullAddress, setFullAddress] = useState(initFullAddress);

  return (
    <div className="indi-card-field-item d-flex">
      <div
        style={{ backgroundImage: `url(${iconDarkImage})` }}
        className="indi-card-field-item-img"></div>

      {(mode === "readonly" || (mode !== "add" && mode !== "edit")) && (
        <div className="indi-card-field-item-value">
          {isLookupField && (
            <>
              <div className="indi-card-address-text">{fullAddress}</div>
            </>
          )}
          {!isLookupField && <>{fieldData}</>}
        </div>
      )}

      {isEmpty && (
        <div className="indi-tamplte-empty-field-value">No value set</div>
      )}

      {(mode === "add" || mode === "edit") && (
        <InputElement
          props={{
            fieldProps: fieldSchema,
            fieldData,
            fieldName: fieldType,
            inputElementClassNames,
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
