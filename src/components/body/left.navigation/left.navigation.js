import React, { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ContextComponent from "../../app.context";
import Utils from "../../utils";

const LeftNavigation = () => {
  let { userData } = useContext(ContextComponent);

  let [stateNavKeys, setStateNavKeys] = useState([]);
  let [stateNavValues, setStateNavValues] = useState({});

  let navLinkKeys = Utils.NAV_ITEMS_KEYS;
  let navLinkValues = Utils.NAV_ITEMS_VALUES;

  let updatedNavLinks = {}; 
  let updatedNavKeys = [];
  let newNavLinkValues = {};

  useEffect(() => {
    navLinkKeys.forEach((a) => {
      newNavLinkValues[a] = navLinkValues[a];
      let enabled = newNavLinkValues[a].enabled || false;
      !enabled && userData.isAdmin && (newNavLinkValues[a].enabled = true);
      enabled && (updatedNavLinks[a] = newNavLinkValues[a]);
      enabled && updatedNavKeys.push(a);
    });

    setStateNavKeys(updatedNavKeys);
    setStateNavValues(updatedNavLinks);
  }, []);

  return (
    <div className="dbc-left-navigation-wrapper">
      {stateNavKeys.map((navKey, index) => (
        <div className="dbc-navmenu-item" key={index}>
          <Link to={stateNavValues[navKey].url}>
            {stateNavValues[navKey].title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LeftNavigation;
