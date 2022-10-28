import React, { useState, useRef } from "react";

import DBCLogo from "../controls/dbc.logo";

import vimImage from "../../assets/img/icons_vim-box-fill.png";
import tweeterImage from "../../assets/img/icons_tweeter-box-fill.png";
import instaImage from "../../assets/img/icons_insta-box-fill.png";
import linkedinImage from "../../assets/img/icons_linkedin-box-fill.png";
import fbImage from "../../assets/img/icons_fb-box-fill.png";
import youtubeImage from "../../assets/img/icons_youtube-box-fill.png";

const DBCFooter = () => {
  return (
    <div className="dbc-footer-wrapper">
      <nav className="navbar navbar-expand navbar-white p-0 d-flex flex-row justify-content-between">
        <ul className="navbar-nav navbar-nav-left">
          <li key="footerhomeli" className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link pl-0 footer-list">
              Home
            </a>
          </li>
          <li key="aboutinternationalsos" className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link pl-0 footer-list">
              About internationality SOS
            </a>
          </li>
          <li key="privacynotice" className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link pl-0 footer-list">
              Privacy Notice
            </a>
          </li>
        </ul>

        <ul className="navbar-nav navbar-nav-right d-flex flex-row align-items-center justify-content-end">
          <li key="vimImage" className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <img className="dbc-w-20" src={vimImage}></img>
            </a>
          </li>

          <li key="instaImage" className="nav-item">
            <a className="nav-link" href="#">
              <img className="dbc-w-20" src={instaImage}></img>
            </a>
          </li>

          <li key="tweeterImage" className="nav-item">
            <a className="nav-link" href="#" role="button">
              <img className="dbc-w-20" src={tweeterImage}></img>
            </a>
          </li>
          <li key="linkedinImage" className="nav-item">
            <a className="nav-link" href="#" role="button">
              <img className="dbc-w-20" src={linkedinImage}></img>
            </a>
          </li>
          <li key="fbImage" className="nav-item">
            <a className="nav-link" href="#">
              <img className="dbc-w-20" src={fbImage}></img>
            </a>
          </li>
          <li key="youtubeImage" className="nav-item">
            <a className="nav-link" href="#">
              <img className="dbc-w-20" src={youtubeImage}></img>
            </a>
          </li>
          <li key="dbc-footer-logo-li" className="nav-item dbc-footer-logo-wrapper">
            <DBCLogo
              externalLinkProps={{
                classes: "nav-link dbc-footer-logo",
                toWhere: "http://www.github.com",
              }}
            />
            <div className="dbc-footer-logo-text float-right d-none d-sm-block">
              <b>WORLDWISE REACH HUMAN TOUCH</b>
            </div>
          </li>
        </ul>
      </nav>
      <p className="copy-text dbc-copy-text"> © 2022 International SOS</p>
    </div>
  );
};

export default DBCFooter;
