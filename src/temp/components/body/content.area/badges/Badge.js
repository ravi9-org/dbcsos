import React, { useState, useContext, useRef } from "react";
import { useEffect } from "react";

import CardContext from "../cards/CardContext";

const Badge = (props) => {
  const FREEZED_STYLE = "indi-badge-freeze";
  let { cardCtxInfo, setCardCtxInfo } = useContext(CardContext);
  let badgeEle = useRef(null);

  let badge = props.badge || {};
  //badgeId,darkIconImage,iconImage,id,isDefault,multiple,name,readonly,required,type

  let [isMultiple, setIsMultiple] = useState(badge.multiple);
  let canFreeze = false;
  if (!isMultiple) {
    if (cardCtxInfo.fields.indexOf(badge.badgeId) > -1) {
      canFreeze = true;
    }
  }

  let [freezeBadge, setFreezeBadge] = useState(canFreeze);
  let [classNameList, setClassNameList] = useState(
    canFreeze ? FREEZED_STYLE : ""
  );

  useEffect(() => {}, []);

  const badgeSelected = (e) => {
    e.preventDefault();
    if (freezeBadge) {
      // do nothing
      console.log(" do NO-thing ");
    } else {
      console.log(" do something ");
      if (!isMultiple) {
        setFreezeBadge(true);
        setClassNameList("indi-badge-freeze");
      } else {
      }
      // inform form about new field to be add
    }
  };

  console.log(" rendering... ");

  return (
    <div
      className={`indi-badge-item-wrapper ${classNameList}`}
      role="button"
      ref={badgeEle}
      onClick={badgeSelected}
    >
      <img
        className="indi-badge-item-icon-image"
        src={badge.iconImage}
        alt={badge.name}
      />
      <div>{badge.name}</div>
    </div>
  );
};

export default Badge;
