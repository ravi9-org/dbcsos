import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContextComponent from "../app.context";
import Utils from "../utils";

const DBCUserProfileMenu = () => {
  let navigate = useNavigate();
  let [canRedirectToLogin, setCanRedirectToLogin] = useState(false);
  let [userDisplayName, setUserDisplayName] = useState("");
  useEffect(() => {
    const success = (res) => {
      setUserDisplayName(res.data.firstName + " " + res.data.lastName);
    };
    const fail = (err) => {
      err?.message?.length && console.log(err);
      if (err?.redirect) {
        setCanRedirectToLogin(true);
      }
    };
    Utils.getUserProfile().then(success, fail);
  });

  const doLogout = (e) => {
    e.preventDefault();
    let commonFn = (data) => {
      Utils.deleteSession();
      navigate("/login");
    };
    Utils.executeLogoutRESTAPI().then(commonFn, commonFn);
  };

  return (
    <div className="dbc-user-profile-wrapper">
      <div>
        Hi {userDisplayName},{" "}
      </div>
      <div>
        <a href="/logout" onClick={doLogout}>
          logout
        </a>
      </div>
    </div>
  );
};

export default DBCUserProfileMenu;
