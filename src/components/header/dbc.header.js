import React, { useState, useRef } from "react";
import DBCNotification from "../controls/dbc.notification";
import DBCUserProfileMenu from "../controls/dbc.user.profile.menu";
import DBCLogo from "../controls/dbc.logo";
import DBCBackgroundImage from "../controls/dbc.background.image";

const DBCHeader = () => {
  return (
    <div className="dbc-header-wrapper">
      <div className="dbc-header-left-logo-wrapper">
        <DBCLogo />
      </div>
      <div className="dbc-header-right-bg-wrapper">
        <DBCBackgroundImage />
      </div>
      <DBCNotification />
      <DBCUserProfileMenu />
    </div>
  );
};

export default DBCHeader;
