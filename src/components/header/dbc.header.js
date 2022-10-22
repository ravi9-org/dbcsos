import React, { useState, useRef } from "react";
import DBCNotification from "../controls/dbc.notification";
import DBCUserProfileMenu from "../controls/dbc.user.profile.menu";

const DBCHeader = () => {
  // const [data, setData] = useState("Hello, how are you?");
  // const [toggle, setToggle] = useState(false);
  // const returnComment = useCallback((name) => {
  //     //console.log(' i m in returnComment ');
  //     return data + ":" + name;
  // }, [data]);
  return (
    <div>
      <div>This is header left logo area</div>      
      <div>This is header right bg area</div>    
      <DBCNotification />
      <DBCUserProfileMenu />
    </div>
  );
};

export default DBCHeader;
