import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import "./assets/css/indi.css";
import MainPage from "./components/pages/MainPage";

function App() {
  useEffect(() => {
    document.body.classList.add("indi-app");
  });
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <MainPage />
      </BrowserRouter>
    </>
  );
}

export default App;
