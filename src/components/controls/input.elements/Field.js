import React, { useContext, useState } from "react";
import InputElement from "./InputElement";
import ContextComponent from "../../AppContext";
import CardContext from "../../body/content.area/cards/CardContext";
import Utils from "../../Utils";

const Field = (props = {}) => {
  let [canRender, setCanRender] = useState(false);
  let templateBadges = props?.fieldProps?.templateBadges || [];
  let { badgesCtxData, addrCtxData } = useContext(ContextComponent);
  let { cardCtxInfo, setCardCtxInfo } = useContext(CardContext);

  let fieldIndex = props.fieldIndex;
  let fieldProps = props.fieldProps;
  let fieldType = fieldProps.fieldType;
  let showEmptyField = fieldProps?.showEmptyField || false;
  let fieldSchema = badgesCtxData.filter((b) => b.badgeUID === fieldType)[0];
  templateBadges?.map((field) => {
    let schemaObj = field[fieldSchema.badgeUID];
    if (!Utils.isObjectEmpty(schemaObj)) {
      fieldSchema = { ...fieldSchema, ...schemaObj };
    }
  });

  let isDefault = fieldSchema?.isDefault;

  let fieldData = fieldProps.fieldData;
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
  let initNumber = "";

  if (!!fieldData && isLookupField) {
    let addrId = parseInt(fieldData, 10);
    let addrIdx = addrCtxData.ids.indexOf(addrId);
    initFullAddress = addrCtxData.fullAddresses[addrIdx];
    initNumber = addrCtxData.numbers[addrIdx];
  }

  let [fullAddress, setFullAddress] = useState(initFullAddress);
  let [contact, setContact] = useState(initNumber);

  return (
    <div className="indi-card-field-item d-flex">
      <div
        className={`indi-card-field-item-img indi-card-field-item-${fieldType}`}
      ></div>

      {(mode === "readonly" || (mode !== "add" && mode !== "edit")) && (
        <div className="indi-card-field-item-value">
          {isLookupField && (
            <>
              <div className="indi-card-address-text">{fullAddress}</div>
              <div className="indi-card-number-text" title="Assistance phone number">
                <span className="indi-add-card-address-telephone"></span>
                <span>{contact}</span>
              </div>
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
            fieldSchema,
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
