import React from "react";

const TextCell = ({ props }) => {
  let data = props.data;
  let colIndex = props.colIndex;
  let textValue = data[colIndex];
  return <td>{textValue}</td>;
};

export default TextCell;
