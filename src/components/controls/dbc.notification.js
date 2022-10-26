import React, { useState, useRef } from "react";

const DBCNotification = () => {
  return (
    <div className="dbc-user-notification-wrapper">
      <div>
        <div className="nav-item1 dropdown show">
            <a className="nav-link" data-toggle="dropdown" href="#" aria-expanded="true">
                <span className="dbc-notification-icon"> <span className="badge badge-warning navbar-badge">15</span></span>
            </a>
        </div>
      </div>
    </div>
  );
};

export default DBCNotification;
