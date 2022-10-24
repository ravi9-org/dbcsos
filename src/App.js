import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/dbc.css";
import MainPage from "./components/pages/mainpage";
import ResetMockData from "./mock/resetmockdata";

function App() {
  useEffect(() => {
    document.body.classList.add("dbc-app");
  });
  return (
    <>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
      <ResetMockData />
    </>
  );
}

export default App;
