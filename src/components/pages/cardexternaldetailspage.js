import React from "react";
import { useParams } from "react-router";
import Container from "react-bootstrap/Container";


import CardItem from "../body/content.area/cards/CardItem";

const CardExternalDetailsPage = () => {
  const { cardid } = useParams();
  return (
    <Container className="indi-app indi-ext-card-details-page">
      <div className="indi-ext-card-item-wrapper d-flex">
        <CardItem cardId={cardid} />
      </div>
    </Container>
  );
};

export default CardExternalDetailsPage;
