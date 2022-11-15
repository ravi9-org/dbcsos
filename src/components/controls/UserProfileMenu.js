import React, { useState, useRef, useContext, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

import ContextComponent from "../AppContext";
import Utils from "../Utils";
import defaultUserImage from "../../assets/img/default-profile.png";

const UserProfileMenu = () => {
  let navigate = useNavigate();
  let { setCanRedirectToLogin, userData, setUserData } =
    useContext(ContextComponent);
  let [userFirstName, setUserFirstName] = useState("");
  let [userDisplayName, setUserDisplayName] = useState("");
  let [userImage, setUserImage] = useState(defaultUserImage);
  let [canRender, setCanRender] = useState(false);

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
    if (!Utils.isObjectEmpty(userData)) {
      setUserFirstName(userData.firstName);
      if (userData?.picture) {
        setUserImage(userData?.picture);
      }
      setCanRender(true);
    }
  }, [userData]);

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
    <>
      {canRender && (
        <div className="indi-user-profile-wrapper">
          <Dropdown align="end">
            <Dropdown.Toggle
              id="dropdown-basic"
              type="link"
              className="indi-header-userprofile-btn"
            >
              <img
                className="indi-header-profile-image"
                src={userImage}
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

          <div className="indi-header-user-profile-firstname">
            {userFirstName}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileMenu;
