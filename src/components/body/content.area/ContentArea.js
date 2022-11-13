import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import ContextComponent from "../../AppContext";
import CardList from "./cards/CardsList";
import TemplateList from "./templates/TemplatesList";
import AddTemplate from "./templates/AddTemplate";
import Utils from "../../Utils";
import Addresses from "../../pages/Addresses";
import BadgesTable from "./badges/BadgesTable";
import AddBadgePage from "./badges/AddBadgePage";
import AddressesTable from "./addresses/AddressesTable";
import UsersTable from "./users/UsersTable";
import EmailSignature from "../../pages/signatures/EmailSignature";
import Contacts from "../../pages/Contacts";
import Settings from "./users/Settings";
import AddCard from "./cards/AddCard";
import EditCard from "./cards/EditCardPage";
import CardDetailsPage from "./cards/CardDetailsPage";

const ContentArea = () => {
  let [isAdmin, setIsAdmin] = useState(false);

  let { userData } = useContext(ContextComponent);

  useEffect(() => {
    setIsAdmin(!!userData?.isAdmin);
  }, [isAdmin, userData]);

  return (
    <div className="indi-content-area-wrapper d-flex h-100">
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

        <Route
          path={Utils.APP_URLS.ADD_TEMPLATE_PAGE}
          exact
          element={<AddTemplate />}
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
          path={Utils.APP_URLS.CARD_DETAILS_PAGE}
          exact
          element={<CardDetailsPage />}
        ></Route>

        <Route
          path={Utils.APP_URLS.ADD_CARD_PAGE}
          exact
          element={<AddCard />}
        ></Route>

        <Route
          path={Utils.APP_URLS.EDIT_CARD_PAGE}
          exact
          element={<EditCard />}
        ></Route>

        <Route
          path={Utils.APP_URLS.ADDRESS_PAGE}
          exact
          element={<AddressesTable />}
        ></Route>
        
        <Route
          path={Utils.APP_URLS.BADGES_PAGE}
          exact
          element={<BadgesTable />}
        ></Route>
        
        <Route
          path={Utils.APP_URLS.ADD_BADGE_PAGE}
          exact
          element={<AddBadgePage />}
        ></Route>


        <Route
          path={Utils.APP_URLS.USERS_PAGE}
          exact
          element={<UsersTable />}
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
      </Routes>
    </div>
  );
};

export default ContentArea;
