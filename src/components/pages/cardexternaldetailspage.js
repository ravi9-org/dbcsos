import React, { useState, useRef } from "react";
import CardItem from "../body/content.area/card.item";
import { useParams } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DBCNotification from "../controls/dbc.notification";
import DBCUserProfileMenu from "../controls/dbc.user.profile.menu";
import DBCLogo from "../controls/dbc.logo";
import DBCBackgroundImage from "../controls/dbc.background.image";

const DBCHeader = () => {
  const { cardid } = useParams();
  // console.log(cardid);
  return (
    <Container className="dbc-app dbc-ext-card-details-page">
      <div className="dbc-ext-card-item-wrapper d-flex">
        <CardItem cardId={cardid} />
      </div>
    </Container>
  );
};

export default DBCHeader;
