import React from "react";
import { NavLink } from "react-router-dom";

const Logo = (props = {}) => {
  let internalLinkProps = props.internalLinkProps || {};
  let externalLinkProps = props.externalLinkProps || {};

  let isInternalLink = internalLinkProps?.toWhere?.length;
  let isExternalLink = externalLinkProps?.toWhere?.length;

  if (isInternalLink) {
    let toWhere = internalLinkProps.toWhere || "/";
    let classes = externalLinkProps.classes || "";
    return (
      <NavLink className={classes} to={toWhere}>
        <div className="indi-logo"></div>
      </NavLink>
    );
  } else if (isExternalLink) {
    let toWhere = externalLinkProps.toWhere || "http://www.google.com";
    let classes = externalLinkProps.classes || "";
    return [
      <a
        href={toWhere}
        target="_blank"
        rel={"noreferrer"}
        className={classes}
        key="dbslogofooterrightside"
      >
        <div className="indi-logo"></div>
      </a>,
    ];
  } else {
    return <div className="indi-logo"></div>;
  }
};

export default Logo;
