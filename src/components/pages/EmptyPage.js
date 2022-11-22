import React, { useState } from "react";

const EmptyPage = ({ props }) => {
  let [message, setMessage] = useState(props.emptyMessage);
  return <div>{message}</div>;
};

export default EmptyPage;
