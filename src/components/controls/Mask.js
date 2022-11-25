import React, { useState, useContext, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
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
      <div className="visually-hidden1 indi-global-mask-loading-text">
        <Spinner animation="border" variant="light" role="status"></Spinner>
        <span className="indi-global-mask-loading-text-message">{loadingText}...</span>
        {/* <Spinner animation="grow" variant="light" size="sm"/>
        <Spinner animation="grow" variant="light" size="sm"/>
        <Spinner animation="grow" variant="light" size="sm"/> */}
      </div>
    </div>
  );
};

export default Mask;
