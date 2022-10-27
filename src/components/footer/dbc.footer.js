import React, { useState, useRef } from "react";


import DBCLogo from "../controls/dbc.logo";

const DBCFooter = () => {
  return (
    <div className="dbc-footer-wrapper">
      <nav className="navbar navbar-expand navbar-white p-0 d-flex flex-row justify-content-between">
        <ul className="navbar-nav">

          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link pl-0 footer-list">Home</a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link pl-0 footer-list">Home2</a>
          </li>
        </ul>

        <ul className="navbar-nav d-flex flex-row align-items-center justify-content-end">
          <li className="nav-item">
            <a className="nav-link" data-widget="navbar-search" href="#" role="button">
              AAA
            </a>

          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              BBB
            </a>

          </li>

          <li className="nav-item">
            <a className="nav-link" href="#" role="button">
              CCC
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" role="button">
              DDD
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              EEE
            </a>

          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              FFF
            </a>

          </li>
          <li className="nav-item">
            <a className="nav-link dbc-footer-logo" data-widget="navbar-search" href="#" role="button">
              <DBCLogo />
              <div className="dbc-footer-logo-text float-right d-none d-sm-block">
                <b>WORLDWISE REACH HUMAN TOUCH</b>
              </div>
            </a>

          </li>
        </ul>
      </nav>
      <p className="copy-text dbc-copy-text"> © 2022 International SOS</p>

    </div>
  );
};

export default DBCFooter;
