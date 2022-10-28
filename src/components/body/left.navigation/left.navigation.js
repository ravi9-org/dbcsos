import React, { useContext, useEffect, useState } from "react";
import { Link , NavLink, useLocation} from "react-router-dom";
import ContextComponent from "../../app.context";
import Utils from "../../utils";

import Templates from "../../../assets/img/templet.png";
import Users from "../../../assets/img/users.png";
import Addresses from "../../../assets/img/globe.png";
import Cards from "../../../assets/img/templet.png";
import esign from "../../../assets/img/mail.png";
import contacts from "../../../assets/img/contacts.png";
import settings from "../../../assets/img/settings.png";

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
    {filteredNavLinkKeys.map((navKey, index) => (
      <div className="dbc-navmenu-item" key={index}>
        <NavLink
          className={({ isActive }) => {
            if (isAtRootUrl) {
              isActive = index === 0;
            }
            
            return (isActive ? 'dbc-navmenu-active' : 'dbc-navmenu-inactive')
          }}
          to={navLinkValues[navKey].url}
        >
          <img className="dbc-w-32" src={navLinkValues[navKey].title}></img>
          <span  className="dbc-ml-1" >{navLinkValues[navKey].title}</span>
        </NavLink>
      </div>
    ))}
  </div>
);
};

export default LeftNavigation;
