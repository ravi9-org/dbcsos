import React, { useContext, useState, useEffect } from "react";

import ContextComponent from "../../../AppContext";
import Badge from "./Badge";

const BadgesRibbon = () => {
  let { userData, badgesCtxData } = useContext(ContextComponent);

  useEffect(() => {
    //console.log(" =================== badgesCtxData : " + badgesCtxData);
  }, [badgesCtxData]);

  return (
    <div className="d-flex d-flex-row indi-badges-ribbon-wrapper">
      {badgesCtxData?.map((badge, index) => (
        <Badge badge={badge} key={index} />
      ))}
    </div>
  );
};

export default BadgesRibbon;
