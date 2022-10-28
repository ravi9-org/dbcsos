import React, { useContext, useEffect, useState } from "react";
import { Link , NavLink, useLocation} from "react-router-dom";
import ContextComponent from "../../app.context";
import Utils from "../../utils";

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
          {navLinkValues[navKey].title}
        </NavLink>
      </div>
    ))}
  </div>
);
};

export default LeftNavigation;
