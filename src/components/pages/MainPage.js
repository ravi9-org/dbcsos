import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ContextComponent from "../AppContext";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import CardExternalDetailsPage from "./CardExternalDetailsPage";
import Mask from "../controls/Mask";
import Alert from "../controls/alerts/Alert";
import LandingPage from "./LandingPage";
import Utils from "../Utils";

function MainPage() {
  let [loadingState, setLoadingState] = useState(false);
  let [alert, setAlert] = useState({});
  let [canRender, setCanRender] = useState(false);
  let [canRedirectToLogin, setCanRedirectToLogin] = useState(false);
  let [canRedirectToResetPassword, setCanRedirectToResetPassword] = useState(false);
  let [canRedirectToLanding, setCanRedirectToLanding] = useState(false);
  let [userData, setUserData] = useState({});
  let [addrCtxData, setAddrCtxData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("indi-app");

    if (canRedirectToLogin) {
      setCanRedirectToLogin(false);
      navigate(Utils.APP_URLS.LOGIN_PAGE);
    }
  }, [navigate, canRedirectToLogin]);

  useEffect(() => {
    document.body.classList.add("indi-app");

    if (canRedirectToResetPassword) {
      setCanRedirectToResetPassword(false);
      navigate(Utils.APP_URLS.RESET_PASSWORD_PAGE);
    }
  }, [navigate, canRedirectToResetPassword]);

  useEffect(() => {
    document.body.classList.add("indi-app");

    if (canRedirectToLanding) {
      setCanRedirectToLanding(false);
      navigate(Utils.APP_URLS.LANDING_PAGE);
    }
  }, [navigate, canRedirectToLanding]);

  return (
    <ContextComponent.Provider
      value={{
        loadingState,
        setLoadingState,
        alert,
        setAlert,
        canRedirectToLogin,
        setCanRedirectToLogin,
        canRedirectToLanding,
        setCanRedirectToLanding,
        setCanRedirectToResetPassword,
        userData,
        setUserData,
        addrCtxData,
        setAddrCtxData,
      }}
    >
      <Mask />
      <Alert />
      <Routes>
        <Route
          path={Utils.APP_URLS.LOGIN_PAGE}
          exact
          element={<Login />}
        ></Route>
        <Route
          path={Utils.APP_URLS.RESET_PASSWORD_PAGE}
          exact
          element={<ResetPassword />}
        ></Route>

        <Route
          path={Utils.APP_URLS.CARD_EXTERNAL_PAGE}
          exact
          element={<CardExternalDetailsPage />}
        ></Route>

        <Route path={`/*`} element={<LandingPage />}></Route>
      </Routes>
    </ContextComponent.Provider>
  );
}

export default MainPage;
