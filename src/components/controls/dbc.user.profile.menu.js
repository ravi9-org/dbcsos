import React, { useState, useRef, useContext, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

import ContextComponent from "../app.context";
import Utils from "../utils";
import defaultUserImage from "../../assets/img/default-profile.png";

const DBCUserProfileMenu = () => {
  let navigate = useNavigate();
  let { canRedirectToLogin, setCanRedirectToLogin, userData, setUserData } =
    useContext(ContextComponent);
  let [userFirstName, setUserFirstName] = useState("");
  let [userDisplayName, setUserDisplayName] = useState("");
  let [userImage, setUserImage] = useState("");

  const success = (res) => {
    setUserData(res.data || {});
  };
  const fail = (err) => {
    err?.message?.length && console.log(err);
    if (err?.redirect) {
      setCanRedirectToLogin(true);
    }
  };

  useEffect(() => {
    Utils.getUserProfile().then(success, fail);
  }, []);

  useEffect(() => {
    // update user data here...

    //setUserDisplayName(userData.firstName + " " + userData.lastName);
    //setUserFirstName(userData.firstName);
    if (userData.image) {
      setUserImage(userData.image);
    } else {
      //setUserImage(defaultUserImage);
    }
    //console.log(userData.firstName + " " + userData.lastName);
  }, [userData]);

  //setTimeout(function () {
  //setUserData({ ...userData, "firstName": "XYz" });
  //}, 10000);

  const doLogout = (e) => {
    e.preventDefault();
    let commonFn = (data) => {
      Utils.deleteSession();
      navigate("/login");
    };
    Utils.executeLogoutRESTAPI().then(commonFn, commonFn);
  };

  const doEditProfile = (e) => {
    e.preventDefault();
    navigate(Utils.APP_URLS.SETTINGS_PAGE);
  };

  return (
    <div className="dbc-user-profile-wrapper">
      <Dropdown align="end">
        <Dropdown.Toggle
          id="dropdown-basic"
          type="link"
          className="dbc-header-userprofile-btn"
        >
          <img
            className="dbs-header-profile-image"
            src={defaultUserImage}
            alt={userDisplayName}
            title={userDisplayName}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            key="editProfile"
            href="/settings"
            onClick={doEditProfile}
          >
            Edit profile
          </Dropdown.Item>
          <Dropdown.Item key="logOut" href="/logout" onClick={doLogout}>
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="dbs-header-user-profile-firstname d-none">
        {userFirstName}
      </div>
    </div>
  );
};

export default DBCUserProfileMenu;
