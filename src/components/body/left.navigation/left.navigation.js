import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ContextComponent from "../../app.context";
import Utils from "../../utils";

import Templates from "../../../assets/img/templet.png";
import Users from "../../../assets/img/users.png";
import Addresses from "../../../assets/img/globe.png";
import Cards from "../../../assets/img/templet.png";
import esign from "../../../assets/img/mail.png";
import contacts from "../../../assets/img/contacts.png";
import settings from "../../../assets/img/settings.png";

import templatesImg from "../../../assets/img/navitems/dark/templates.png";
import templatesActiveImg from "../../../assets/img/navitems/light/templates.png";

import usersImg from "../../../assets/img/navitems/dark/users.png";
import usersActiveImg from "../../../assets/img/navitems/light/users.png";

import addressesImg from "../../../assets/img/navitems/dark/addresses.png";
import addressesActiveImg from "../../../assets/img/navitems/light/addresses.png";

import cardsImg from "../../../assets/img/navitems/dark/cards.png";
import cardsActiveImg from "../../../assets/img/navitems/light/cards.png";

import emailsignatureImg from "../../../assets/img/navitems/dark/emailsignature.png";
import emailsignatureActiveImg from "../../../assets/img/navitems/light/emailsignature.png";

import contactsImg from "../../../assets/img/navitems/dark/contacts.png";
import contactsActiveImg from "../../../assets/img/navitems/light/contacts.png";

import settingsImg from "../../../assets/img/navitems/dark/settings.png";
import settingsActiveImg from "../../../assets/img/navitems/light/settings.png";

const images = {
  templates: templatesImg,
  users: usersImg,
  addresses: addressesImg,
  cards: cardsImg,
  emailsignature: emailsignatureImg,
  contacts: contactsImg,
  settings: settingsImg,
};

const activeImages = {
  templates: templatesActiveImg,
  users: usersActiveImg,
  addresses: addressesActiveImg,
  cards: cardsActiveImg,
  emailsignature: emailsignatureActiveImg,
  contacts: contactsActiveImg,
  settings: settingsActiveImg,
};

const LeftNavigation = () => {
  let { userData } = useContext(ContextComponent);

  let navLinkKeys = Utils.NAV_ITEMS_KEYS;
  let navLinkValues = Utils.NAV_ITEMS_VALUES;

  let tempFilteredNavLinkKeys = [];
  let [filteredNavLinkKeys, setFilteredNavLinkKeys] = useState([]);

  const location = useLocation();
  const isAtRootUrl = location?.pathname === "/";

  useEffect(() => {
    if (Object.keys(userData).length) {
      let isAdmin = userData.isAdmin;
      navLinkKeys.forEach((navLinkKey) => {
        if (isAdmin || navLinkValues[navLinkKey].enabled) {
          tempFilteredNavLinkKeys.push(navLinkKey);
        }
      });
      setFilteredNavLinkKeys(tempFilteredNavLinkKeys);
    }
  }, [userData]);

  return (
    <div className="dbc-left-navigation-wrapper">
      {filteredNavLinkKeys.map((navKey, index, src) => (
        <div className="dbc-navmenu-item" key={index}>
          <NavLink
            className={({ isActive }) => {
              if (isAtRootUrl) {
                isActive = index === 0;
              }
              navLinkValues[navKey]["ding"] = "dingdongbell";
              return isActive ? "dbc-navmenu-active" : "dbc-navmenu-inactive";
            }}
            to={navLinkValues[navKey].url}
          >
            {({ isActive }) => (
              <>
                {isActive ||
                (isAtRootUrl && index === 0 && (isActive = true)) ? (
                  <img
                    className="dbc-w-32 w-20"
                    src={activeImages[navKey]}
                    alt={navLinkValues[navKey].title}
                  ></img>
                ) : (
                  <img
                    className="dbc-w-32 w-20"
                    src={images[navKey]}
                    alt={navLinkValues[navKey].title}
                  ></img>
                )}
                <span className="dbc-ml-1">{navLinkValues[navKey].title}</span>
              </>
            )}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default LeftNavigation;
