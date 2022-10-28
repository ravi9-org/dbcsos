import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ContextComponent from "../../app.context";
import CardList from "./cards.list";
import TemplateList from "./templates.list";
import Utils from "../../utils";
import Addresses from "../../pages/Addresses";
import Users from "../../pages/Users";
import EmailSignature from "../../pages/EmailSignature";
import Contacts from "../../pages/Contacts";
import Settings from "../../pages/Settings";

const ContentArea = () => {
  let [isAdmin, setIsAdmin] = useState(false);

  let { userData } = useContext(ContextComponent);

  useEffect(() => { 
    setIsAdmin(!!userData?.isAdmin);
  }, [isAdmin, userData]);

  return (
    <div className="dbc-content-area-wrapper d-flex h-100">
      <Routes>
        {isAdmin && (
          <Route
            path={Utils.APP_URLS.LANDING_PAGE}
            exact
            element={<TemplateList />}
          ></Route>
        )}
        <Route
          path={Utils.APP_URLS.TEMPLATES_PAGE}
          exact
          element={<TemplateList />}
        ></Route>

        {!isAdmin && (
          <Route
            path={Utils.APP_URLS.LANDING_PAGE}
            exact
            element={<CardList />}
          ></Route>
        )}
        <Route
          path={Utils.APP_URLS.CARDS_PAGE}
          exact
          element={<CardList />}
        ></Route>

        <Route
          path={Utils.APP_URLS.ADDRESS_PAGE}
          exact
          element={<Addresses />}
        ></Route>
        <Route
          path={Utils.APP_URLS.USERS_PAGE}
          exact
          element={<Users />}
        ></Route>
        <Route
          path={Utils.APP_URLS.EMAIL_SIGNAURE_PAGE}
          exact
          element={<EmailSignature />}
        ></Route>
        <Route
          path={Utils.APP_URLS.CONTACTS_PAGE}
          exact
          element={<Contacts />}
        ></Route>
        <Route
          path={Utils.APP_URLS.SETTINGS_PAGE}
          exact
          element={<Settings />}
        ></Route>

        {/* {cardsPageMappyingArray.map((path, index) => (
          <Route path={path} exact key={index} element={<CardList />} />
        ))} */}
      </Routes>
    </div>
  );
};

export default ContentArea;
