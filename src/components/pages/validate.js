import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LandingPage from "./landingpage";
import Utils from "./../utils";

const Validate = () => {
  const [loading, setLoading] = useState(true);
  const [userSessionExists, setUserSessionExists] = useState(false);

  useEffect(() => {
    let userSessionExists = Utils.userSessionExists();
    setUserSessionExists(!userSessionExists);
  });

  return (
    <div>
      {console.log(" ===================== ", userSessionExists)}
      {userSessionExists && <LandingPage />}
      {!userSessionExists && <Navigate to="/login" />}
    </div>
  );
};
export default Validate;
