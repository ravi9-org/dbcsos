import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const LeftNavigation = () => {
  return (
    <div className="dbc-left-navigation-wrapper">
      This is left navigation.
      <Link to="/cards">
        Cards
      </Link>
      <Link to="/templates">
        Template list
      </Link>
    </div>
  );
};

export default LeftNavigation;
