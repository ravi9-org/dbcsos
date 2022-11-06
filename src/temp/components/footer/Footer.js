import React from "react";

import Logo from "../controls/Logo";

import vimImage from "../../assets/img/icons_vim-box-fill.png";
import tweeterImage from "../../assets/img/icons_tweeter-box-fill.png";
import instaImage from "../../assets/img/icons_insta-box-fill.png";
import linkedinImage from "../../assets/img/icons_linkedin-box-fill.png";
import fbImage from "../../assets/img/icons_fb-box-fill.png";
import youtubeImage from "../../assets/img/icons_youtube-box-fill.png";

const Footer = () => {
  return (
    <div className="indi-footer-wrapper">
      <nav className="navbar navbar-expand navbar-white p-0 d-flex flex-row justify-content-between">
        <ul className="navbar-nav navbar-nav-left">
          <li key="footerhomeli" className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link pl-0 footer-list">
              Home
            </a>
          </li>
          <li
            key="aboutinternationalsos"
            className="nav-item d-none d-sm-inline-block"
          >
            <a href="/" className="nav-link pl-0 footer-list">
              About internationality SOS
            </a>
          </li>
          <li key="privacynotice" className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link pl-0 footer-list">
              Privacy Notice
            </a>
          </li>
        </ul>

        <ul className="navbar-nav navbar-nav-right d-flex flex-row align-items-center justify-content-end">
          <li key="vimImage" className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="/"
              role="button"
            >
              <img className="indi-w-20" src={vimImage} alt="vim"></img>
            </a>
          </li>

          <li key="instaImage" className="nav-item">
            <a className="nav-link" href="/">
              <img className="indi-w-20" src={instaImage} alt="instagram"></img>
            </a>
          </li>

          <li key="tweeterImage" className="nav-item">
            <a className="nav-link" href="/" role="button">
              <img className="indi-w-20" src={tweeterImage} alt="twitter"></img>
            </a>
          </li>
          <li key="linkedinImage" className="nav-item">
            <a className="nav-link" href="/" role="button">
              <img
                className="indi-w-20"
                src={linkedinImage}
                alt="linkedin"
              ></img>
            </a>
          </li>
          <li key="fbImage" className="nav-item">
            <a className="nav-link" href="/">
              <img className="indi-w-20" src={fbImage} alt="fb"></img>
            </a>
          </li>
          <li key="youtubeImage" className="nav-item">
            <a className="nav-link" href="/">
              <img className="indi-w-20" src={youtubeImage} alt="youtube"></img>
            </a>
          </li>
          <li
            key="indi-footer-logo-li"
            className="nav-item indi-footer-logo-wrapper"
          >
            <Logo
              externalLinkProps={{
                classes: "nav-link indi-footer-logo",
                toWhere: "http://www.github.com",
              }}
            />
            <div className="indi-footer-logo-text float-right d-none d-sm-block">
              <b>WORLDWISE REACH HUMAN TOUCH</b>
            </div>
          </li>
        </ul>
      </nav>
      <p className="copy-text indi-copy-text"> © 2022 International SOS</p>
    </div>
  );
};

export default Footer;
