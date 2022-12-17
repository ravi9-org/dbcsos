import React from "react";

import TextInput from "./TextInput";
import TextAreaInput from "./TextAreaInput";
import LookupInput from "./LookupInput";
import Utils from "../../Utils";

const InputElement = ({ props = {} }) => {
  let schema = props?.fieldProps || {};
  let fieldType = schema.badgeType;
  let isLookupField = schema.badgeUID === "address";

  if (Utils.BADGE_TYPES[fieldType]) {
    fieldType = Utils.BADGE_TYPES[fieldType].formInputType;
  }

  if (isLookupField) {
    return <LookupInput schema={schema} />;
  } else if (fieldType === "text") {
    return <TextInput schema={schema} />;
  } else if (fieldType === "textarea") {
    return <TextAreaInput schema={schema} />;
  } else {
    return null;
  }
};

export default InputElement;
