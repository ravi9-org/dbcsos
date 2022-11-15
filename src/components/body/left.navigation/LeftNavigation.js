import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ContextComponent from "../../AppContext";
import Utils from "../../Utils";

import templatesImg from "../../../assets/img/navitems/dark/templates.png";
import templatesActiveImg from "../../../assets/img/navitems/light/templates.png";

import usersImg from "../../../assets/img/navitems/dark/users.png";
import usersActiveImg from "../../../assets/img/navitems/light/users.png";

import addressesImg from "../../../assets/img/navitems/dark/addresses.png";
import addressesActiveImg from "../../../assets/img/navitems/light/addresses.png";

import badgesImg from "../../../assets/img/navitems/dark/settings.png";
import badgesActiveImg from "../../../assets/img/navitems/light/settings.png";

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
  badges: badgesImg,
  cards: cardsImg,
  emailsignature: emailsignatureImg,
  contacts: contactsImg,
  settings: settingsImg,
};

const activeImages = {
  templates: templatesActiveImg,
  users: usersActiveImg,
  addresses: addressesActiveImg,
  badges: badgesActiveImg,
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
  const isAtRootUrl = location?.pathname === Utils.APP_URLS.LANDING_PAGE;

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
    <div className="indi-left-navigation-wrapper">
      {filteredNavLinkKeys.map((navKey, index, src) => (
        <div className="indi-navmenu-item" key={index}>
          <NavLink
            className={({ isActive }) => {
              if (isAtRootUrl) {
                isActive = index === 0;
              }
              return isActive ? "indi-navmenu-active" : "indi-navmenu-inactive";
            }}
            to={navLinkValues[navKey].url}
          >
            {({ isActive }) => (
              <>
                {isActive ||
                (isAtRootUrl && index === 0 && (isActive = true)) ? (
                  <img
                    className="indi-w-32 w-20"
                    src={activeImages[navKey]}
                    alt={navLinkValues[navKey].title}
                  ></img>
                ) : (
                  <img
                    className="indi-w-32 w-20"
                    src={images[navKey]}
                    alt={navLinkValues[navKey].title}
                  ></img>
                )}
                <span className="indi-ml-1">{navLinkValues[navKey].title}</span>
              </>
            )}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default LeftNavigation;
