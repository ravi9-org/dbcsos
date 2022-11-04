import React, { useState, useContext, useEffect } from "react";
import ContextComponent from "../AppContext";

const Mask = () => {
  let [additionalClasses, setAdditionalClasses] = useState("");
  let [loadingText, setLoadingText] = useState("Loading");
  const { loadingState } = useContext(ContextComponent);
  useEffect(() => {
    let text = loadingState?.text ?? "Loading";
    loadingState?.applyMask && setLoadingText(text);
    setAdditionalClasses(loadingState?.applyMask ? "" : "d-none");
  }, [loadingState]);
  return (
    <div className={`indi-global-mask ${additionalClasses}`}>
      <div className="indi-global-mask-loading-text">{loadingText}...</div>
    </div>
  );
};

export default Mask;
