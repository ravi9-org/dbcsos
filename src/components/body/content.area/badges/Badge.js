import React, { useState, useContext, useRef } from "react";
import { useEffect } from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import CardContext from "../cards/CardContext";

const Badge = (props) => {
  const FREEZED_STYLE = "indi-badge-freeze";
  let { cardCtxInfo, setCardCtxInfo } = useContext(CardContext);
  let badgeEle = useRef(null);

  let badge = props.badge || {};

  let [isMultiple, setIsMultiple] = useState(badge.multiple);

  let canFreeze = false;
  let [freezeBadge, setFreezeBadge] = useState(canFreeze);
  let [classNameList, setClassNameList] = useState(
    canFreeze ? FREEZED_STYLE : ""
  );

  useEffect(() => {
    if (!isMultiple) {
      cardCtxInfo?.userLinkedBadges.map((element) => {
        badge.badgeUID === element.badgeUID && (canFreeze = true);
      });
    }

    setFreezeBadge(canFreeze);
    setClassNameList(canFreeze ? FREEZED_STYLE : "");
  }, [cardCtxInfo]);

  const badgeSelected = (e) => {
    e.preventDefault();
    if (freezeBadge) {
      // do nothing
      // console.log("do nothing");
    } else {
      if (!isMultiple) {
        setFreezeBadge(true);
        setClassNameList(FREEZED_STYLE);
      } else {
      }
      let tempCardCtxInfo = { ...cardCtxInfo };
      let tempFields = tempCardCtxInfo.userLinkedBadges;
      let tempBadge = { ...badge };
      tempBadge.value = tempBadge.value || tempBadge.defaultValue;
      tempFields.push(tempBadge);
      setCardCtxInfo(tempCardCtxInfo);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id={badge.badgeUID} {...props}>
      {badge.badgeName}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        variant="info"
        // delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
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
      </OverlayTrigger>
    </>
  );
};

export default Badge;
