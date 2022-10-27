import React, { useState, useRef } from "react";
import LeftNavigation from "./left.navigation/left.navigation";
import ContentArea from "./content.area/content.area";
import Badges from "./badges/badges";

const DBCBody = () => {
  return (
    <div className="dbc-body-wrapper container ">
      <div className="dbc-body-row h-100">      
        <div className="row h-100">
          <div className="col col-sm-3 dbc-full-height">
            <LeftNavigation />
          </div>
          <div className="col col-sm-9 dbc-full-height">
            <ContentArea />
          </div>
        </div>
      </div>    
      <div className="dbc-body-row">
      <Badges />
    </div>
    </div>
  );
};

export default DBCBody;
