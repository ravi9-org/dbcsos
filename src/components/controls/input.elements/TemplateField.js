import React, { useContext } from "react";
import InputElement from "./InputElement";
import ContextComponent from "../../AppContext";
import CardContext from "../../body/content.area/cards/CardContext";

const Field = (props = {}) => {

  let fieldProps = props.fieldProps;
  let linkedBadge = fieldProps.linkedBadge;
  let fieldIndex = fieldProps.badgeIndex;
  let fieldType = linkedBadge.badgeType;
  let showEmptyField = fieldProps?.showEmptyField || false;
  let fieldSchema = {
    default: linkedBadge?.default,
  };
  let isDefault = fieldSchema?.default;

  let fieldData = linkedBadge?.defaultValue;

  let isEmpty = false;
  if ((fieldData === undefined || fieldData?.length === 0) && showEmptyField) {
    isEmpty = true;
  }

  let mode = props?.pageMode || '';

  let canRemoveField = !isDefault && (mode === "add" || mode === "edit");

  let inputElementClassNames = fieldProps?.inputElementClassNames || '';

  

  const removeField = (e) => {
    e.preventDefault();
    // let tempCardCtxInfo = { ...cardCtxInfo };
    // tempCardCtxInfo.fields = tempCardCtxInfo?.fields?.filter((field, index) => {
    //   return index !== fieldIndex;
    // });
    // tempCardCtxInfo.data = tempCardCtxInfo?.data?.filter((field, index) => {
    //   return index !== fieldIndex;
    // });
    // setCardCtxInfo(tempCardCtxInfo);
    // //inform form about new field to be add
    debugger;
  };

  let bgImg = linkedBadge.darkIconImage;

  return (
    <div className="indi-card-field-item d-flex">
      <div
        className={`indi-template-field-item-img`}
        style={{
          background: `url(${bgImg})`,
        }}
      ></div>

      {(mode === "readonly" || (mode !== "add" && mode !== "edit")) && (
        <div className="indi-card-field-item-value"> {fieldData}</div>
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
