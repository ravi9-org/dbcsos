import React, { useState } from "react";

const EmptyPage = ({ props }) => {
  let [message, setMessage] = useState(props.emptyMessage);
  return <div className="indi-empty-page">{message}</div>;
};

export default EmptyPage;
