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

    <Container className="dbc-header-wrapper container-fluid d-flex flex-row justify-content-between">
      <div className="dbc-header-left-logo-wrapper">
        <DBCLogo internalLinkProps={{ toWhere:"/"}} />
      </div>
      <div className="dbc-header-right-bg-wrapper d-flex flex-row justify-content-end">
        <DBCBackgroundImage />
        <DBCNotification />
        <DBCUserProfileMenu />
      </div>
    </Container>
  );
};

export default DBCHeader;
