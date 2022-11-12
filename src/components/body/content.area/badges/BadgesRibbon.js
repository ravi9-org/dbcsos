import React, { useContext, useState, useEffect } from "react";

import ContextComponent from "../../../AppContext";
import Badge from "./Badge";

const BadgesRibbon = (props) => {
  let tempBadges = [];

  let templateBadges = props.templateBadges;

  let { badgesCtxData } = useContext(ContextComponent);

  templateBadges.map((badge) => {
    let ctxBadge = badgesCtxData.filter((ctxBadge) => {
      return ctxBadge.badgeUID === Object.keys(badge)[0];
    });
    tempBadges.push(ctxBadge[0]);
  });

  let tempBadgesCtx = [];

  templateBadges.map((badge, index) => {
    tempBadgesCtx = [
      ...tempBadgesCtx,
      { ...tempBadges[index], ...badge[tempBadges[index].badgeUID] },
    ];
  });

  return (
    <div className="d-flex d-flex-row indi-badges-ribbon-wrapper">
      {tempBadgesCtx?.map((badge, index) => (
        <Badge badge={badge} key={index} />
      ))}
    </div>
  );
};

export default BadgesRibbon;
