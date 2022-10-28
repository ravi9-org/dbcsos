import React from "react";
import { NavLink } from "react-router-dom";

const DBCLogo = (props = {}) => {
  let internalLinkProps = props.internalLinkProps || {};
  let externalLinkProps = props.externalLinkProps || {};
  let isInternalLink = internalLinkProps?.toWhere?.length;
  let isExternalLink = externalLinkProps?.toWhere?.length;
  // console.log(internalLinkProps);
  // console.log(externalLinkProps);

  if (isInternalLink) {
    let toWhere = internalLinkProps.toWhere || "/";
    let classes = externalLinkProps.classes || "";
    return (
      <NavLink className={classes} to={toWhere}>
        <div className="dbc-logo"></div>
      </NavLink>
    );
  } else if (isExternalLink) {
    let toWhere = externalLinkProps.toWhere || "http://www.google.com";
    let classes = externalLinkProps.classes || "";
    return (
      [<a
        href={toWhere}
        target="_blank"
        rel={"noreferrer"}
        className={classes}
        key="dbslogofooterrightside"
      >
        <div className="dbc-logo"></div>
      </a>]
    );
  } else {
    return <div className="dbc-logo"></div>;
  }
};

export default DBCLogo;
