import React from "react";

import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import LookupInput from "./LookupInput";
import Utils from "../../Utils";

const InputElement = ({ props = {} }) => {
  let schema = props?.fieldProps?.fieldSchema || {};
  let fieldType = schema.badgeType;
  let fieldName = schema?.badgeName;
  let inputElementClassNames = props?.inputElementClassNames;
  let isLookupField = schema.badgeUID === "address";

  if (Utils.BADGE_TYPES[fieldType]) {
    fieldType = Utils.BADGE_TYPES[fieldType].formInputType;
  }

  if (isLookupField) {
    return (
      <LookupInput
        props={{ schema, fieldName, inputElementClassNames }}
      />
    );
  } else if (fieldType === "text"/* || fieldType === "phone" || fieldType === "url" || fieldType === "email"*/) {
    return (//
      <TextInput
        props={{ schema, fieldName, inputElementClassNames }}
      />
    );
  } else if (fieldType === "textarea") {
    return (
      <TextAreaInput
        props={{ schema, fieldName, inputElementClassNames }}
      />
    );
  } else {
    return null;
  }
};

export default InputElement;
