import React from "react";

const ImageCell = ({ props }) => {
  let data = props.data;
  let colIndex = props.colIndex;
  let textValue = data[colIndex];
  return <img className="indi-table-img-cell" src={textValue} alt="" />;
};

export default ImageCell;
