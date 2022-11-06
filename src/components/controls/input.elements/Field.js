import React, {useContext} from "react";
import InputElement from "./InputElement";
import ContextComponent from "../../AppContext";

const Field = (props = {}) => {
  let { userData, badgesCtxData } = useContext(ContextComponent);
  let fieldProps = props.fieldProps;
  let fieldType = fieldProps.fieldType;
  let fieldSchema = badgesCtxData.filter((b) => b.badgeId === fieldType)[0];
  
  let fieldData = fieldProps.fieldData;
  let mode = props.pageMode;
  
  let inputElementClassNames = fieldProps.inputElementClassNames;

  return (
    <div className="indi-card-field-item d-flex">
      <div
        className={`indi-card-field-item-img indi-card-field-item-${fieldType}`}
      ></div>

      {(mode === "readonly" || (mode !== "add" && mode !== "edit")) && (
        <div className="indi-card-field-item-value"> {fieldData}</div>
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
    </div>
  );
};

export default Field;
