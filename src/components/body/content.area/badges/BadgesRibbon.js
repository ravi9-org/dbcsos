import React from "react";
import Badge from "./Badge";

const BadgesRibbon = (props) => {
  let templateBadges = props.templateBadges;

  return (
    <div className="d-flex d-flex-row indi-badges-ribbon-wrapper">
      {templateBadges?.map((badge, index) => (
        <Badge badge={badge} key={index} />
      ))}
    </div>
  );
};

export default BadgesRibbon;
