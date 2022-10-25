import React, { useState, useRef } from "react";
import LeftNavigation from "./left.navigation/left.navigation";
import ContentArea from "./content.area/content.area";

const DBCBody = () => {
  return (
    <div className="dbc-body-wrapper">
      <LeftNavigation />
      <ContentArea />
    </div>
  );
};

export default DBCBody;
