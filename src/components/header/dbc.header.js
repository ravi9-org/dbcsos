import React, { useState, useRef } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';   
    

import DBCNotification from "../controls/dbc.notification";
import DBCUserProfileMenu from "../controls/dbc.user.profile.menu";
import DBCLogo from "../controls/dbc.logo";
import DBCBackgroundImage from "../controls/dbc.background.image";

const DBCHeader = () => {
  return (

    <Container className="dbc-header-wrapper">
      <div className="dbc-header-left-logo-wrapper">
        <DBCLogo />
      </div>
      <div className="dbc-header-right-bg-wrapper">
        <DBCBackgroundImage />
      </div>
      <DBCNotification />
      <DBCUserProfileMenu />
    </Container>
  );
};

export default DBCHeader;
