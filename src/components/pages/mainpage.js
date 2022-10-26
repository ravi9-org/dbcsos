import { useEffect, useState  } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ContextComponent from "../app.context";
import Login from "./login";
import CardExternalDetailsPage from "../header/dbc.header";
import Mask from "../controls/mask";
import LandingPage from "./landingpage";

function MainPage() {

  let [loadingState, setLoadingState] = useState(false);
  let [canRedirectToLogin, setCanRedirectToLogin] = useState(false);
  let [canRedirectToLanding, setCanRedirectToLanding] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("dbc-app");

    if (canRedirectToLogin) {
      setCanRedirectToLogin(false);
      navigate("/login");
    }
    
    if (canRedirectToLanding) {
      setCanRedirectToLanding(false);
      navigate("/");
    }
  });

  return (
    <ContextComponent.Provider value={{
      loadingState,
      setLoadingState,
      canRedirectToLogin,
      setCanRedirectToLogin,
      canRedirectToLanding,
      setCanRedirectToLanding
    }}>
      <Mask />
      <Routes>
        <Route path="/login" exact element={<Login />}></Route>
        <Route
          path="/cardextdetails"
          exact
          element={<CardExternalDetailsPage />}
        ></Route>
        <Route path="/*" element={<LandingPage />}></Route>
      </Routes>
    </ContextComponent.Provider>
  );
}

export default MainPage;
