import React from "react";
import Container from 'react-bootstrap/Container';    

import Notification from "../controls/Notification";
import UserProfileMenu from "../controls/UserProfileMenu";
import Logo from "../controls/Logo";
import BackgroundImage from "../controls/BackgroundImage";

const AppHeader = () => {
  return (

    <Container className="indi-header-wrapper container-fluid d-flex flex-row justify-content-between">
      <div className="indi-header-left-logo-wrapper">
        <Logo internalLinkProps={{ toWhere:"/"}} />
      </div>
      <div className="indi-header-right-bg-wrapper d-flex flex-row justify-content-end">
        <BackgroundImage />
        {/* <Notification /> */}
        <UserProfileMenu />
      </div>
    </Container>
  );
};

export default AppHeader;
