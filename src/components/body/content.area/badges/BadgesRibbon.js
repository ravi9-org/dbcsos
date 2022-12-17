import React, { useContext, useEffect, useState } from "react";

import CardContext from "../cards/CardContext";
import Badge from "./Badge";
import Utils from "../../../Utils";

const BadgesRibbon = (props) => {
  let [canRender, setCanRender] = useState(false);

  let { cardCtxInfo } = useContext(CardContext);
  let [templateBadges, setTemplateBadges] = useState({});

  useEffect(() => {
    if (!Utils.isObjectEmpty(cardCtxInfo)) {
      setTemplateBadges(cardCtxInfo?.templateInfo?.linkedBadges);
      setCanRender(true);
    }
  }, [cardCtxInfo]);

  return (
    <>
      {canRender && (
        <div className="d-flex d-flex-row indi-badges-ribbon-wrapper">
          {templateBadges?.map((badge, index) => (
            <Badge badge={badge} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default BadgesRibbon;
