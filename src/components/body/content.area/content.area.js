import React from "react";
import { Routes, Route } from "react-router-dom";
import CardList from "./cards.list";
import TemplateList from "./templates.list";

const ContentArea = () => {
  return (
    <div className="dbc-content-area-wrapper">
      <Routes>
        <Route path="/cards" exact element={<CardList />}></Route>
        <Route path="/templates" exact element={<TemplateList />}></Route>
      </Routes>
    </div>
  );
};

export default ContentArea;
