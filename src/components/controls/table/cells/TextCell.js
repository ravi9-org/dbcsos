import React from "react";

const TextCell = ({ props }) => {
  let data = props.data;
  let colIndex = props.colIndex;
  let textValue = data[colIndex];
  return <>{textValue}</>;
};

export default TextCell;
