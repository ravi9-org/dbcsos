import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const LeftNavigation = () => {
  // const [data, setData] = useState("Hello, how are you?");
  // const [toggle, setToggle] = useState(false);
  // const returnComment = useCallback((name) => {
  //     //console.log(' i m in returnComment ');
  //     return data + ":" + name;
  // }, [data]);
  return (
    <div>
      This is left navigation.
      <Link to="/cards">
        Cards
      </Link>
      <Link to="/templates">
        Template list
      </Link>
    </div>
  );
};

export default LeftNavigation;
