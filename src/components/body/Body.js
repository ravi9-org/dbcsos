import React, { useContext, useState, useEffect } from "react";
import LeftNavigation from "./left.navigation/LeftNavigation";
import ContentArea from "./content.area/ContentArea";
import ContextComponent from "../AppContext";
import Utils from "../Utils";

const Body = () => { 

  return (
    <>
      
        <div className="indi-body-wrapper container ">
          <div className="indi-body-row h-100">
            <div className="row h-100">
              <div className="col col-sm-3 indi-full-height">
                <LeftNavigation />
              </div>
              <div className="col col-sm-9 indi-full-height">
                <ContentArea />
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
};

export default Body;
