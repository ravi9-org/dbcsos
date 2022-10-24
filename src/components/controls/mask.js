import React, { useState, useContext, useEffect } from "react";
import ContextComponent from "../app.context";

const Mask = () => {
  let [additionalClasses, setAdditionalClasses] = useState("");
  const { loadingState } = useContext(ContextComponent);
  useEffect(() => {
    setAdditionalClasses(loadingState ? "" : "dbc-hidden");
  }, [loadingState]);
  return (
    <div className={`dbc-global-mask ${additionalClasses}`}>
      <div className="dbc-global-mask-loading-text">Loading...</div>
    </div>
  );
};

export default Mask;
