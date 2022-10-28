import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import DBCHeader from "./components/header/dbc.header";
import DBCBody from "./components/body/dbc.body";
import DBCFooter from "./components/footer/dbc.footer";
import "./App.scss";
import "./assets/css/dbc.css";
import MainPage from "./components/pages/mainpage";
import ResetMockData from "./mock/resetmockdata";

function App() {
  useEffect(() => {
    document.body.classList.add("dbc-app");
  });
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <MainPage />
      </BrowserRouter>
      <ResetMockData />
    </>
  );
}

export default App;
