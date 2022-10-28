import React, { useState, useRef, useContext, useEffect } from "react";
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
    console.log(userData.firstName + " " + userData.lastName);
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

  const options = ["one", "two", "three"];
  const defaultOption = options[0];

  return (
    <div className="dbc-user-profile-wrapper">
      <div>
        <div>
          <div>
            <div className="aaa">
              <div className="bbb">
                <img
                  className="dbs-header-profile-image"
                  src={defaultUserImage}
                  alt={userDisplayName}
                  title={userDisplayName}
                />
              </div>
              <div className="ccc">
                <a href="/editprofile" onClick={doLogout}>
                  Edit profile
                </a>
                <a href="/logout" onClick={doLogout}>
                  Logout
                </a>
              </div>
            </div>
          </div>
          <div className="dbs-header-user-profile-firstname">
            {userFirstName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBCUserProfileMenu;
