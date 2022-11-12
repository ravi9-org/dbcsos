import React, { useState, useContext, useRef } from "react";
import { useEffect } from "react";

import CardContext from "../cards/CardContext";

const Badge = (props) => {
  const FREEZED_STYLE = "indi-badge-freeze";
  let { cardCtxInfo, setCardCtxInfo } = useContext(CardContext);
  let badgeEle = useRef(null);

  let badge = props.badge || {};
  //badgeUID,darkIconImage,iconImage,id,isDefault,multiple,name,readonly,required,type

  let [isMultiple, setIsMultiple] = useState(badge.multiple);
  
  let canFreeze = false;
  let [freezeBadge, setFreezeBadge] = useState(canFreeze);
    let [classNameList, setClassNameList] = useState(
      canFreeze ? FREEZED_STYLE : ""
    );

  useEffect(() => {
    if (!isMultiple) {
      if (cardCtxInfo?.userLinkedBadges?.indexOf(badge.badgeUID) > -1) {
        canFreeze = true;
      }
    }
  
    setFreezeBadge(canFreeze);
    setClassNameList(canFreeze ? FREEZED_STYLE : "");

  }, [cardCtxInfo]);

  const badgeSelected = (e) => {
    e.preventDefault();
    if (freezeBadge) {
      // do nothing
    } else {
      if (!isMultiple) {
        setFreezeBadge(true);
        setClassNameList("indi-badge-freeze");
      } else {
      }
      let tempCardCtxInfo = { ...cardCtxInfo };
      let tempFields = tempCardCtxInfo.userLinkedBadges;
      let tempData = tempCardCtxInfo.fieldsData;
      tempFields.push(badge.badgeUID);
      tempData.push(badge.defaultValue);
      setCardCtxInfo(tempCardCtxInfo);
      // inform form about new field to be add
    }
  };

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
