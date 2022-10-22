import {useEffect} from 'react';
import DBCHeader from "./components/header/dbc.header";
import DBCBody from "./components/body/dbc.body";
import DBCFooter from "./components/footer/dbc.footer";
import "./assets/css/dbc.css";

function App() {
  useEffect(() => {
    document.body.classList.add('dbc-app');
  }, [])
  return (
    <div>
      <DBCHeader />
      <DBCBody />
      <DBCFooter />
    </div>
  );
}

export default App;
