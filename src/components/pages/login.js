import React, { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Utils from "../utils";
import ContextComponent from "../app.context";
import "../../assets/css/login.css";
import LoginLeftBGImg from "../../assets/img/login-bg.png";
import LoginRightBGImg from "../../assets/img/logo-on-white-bg.png";

import { Container, Card, Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const HIDDEN_CLASS = "d-none";
  let emailField = useRef(null);
  let userPasswordField = useRef(null);
  let rememberMe = useRef(null);
  let emailErrMsgDiv = useRef(null);
  let userPwdErrMsgDiv = useRef(null);
  let gloablError = useRef(null);
  let { setLoadingState, setCanRedirectToLanding } =
    useContext(ContextComponent);
  let [formErrorMsg, setFormErrorMsg] = useState("");
  let navigate = useNavigate();

  const toggleErrMsgClass = (ele, eleMsg, toggle = true) => {
    if (toggle) {
      eleMsg.current.classList.remove(HIDDEN_CLASS);
    } else {
      eleMsg.current.classList.add(HIDDEN_CLASS);
    }
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    let valid = true;
    let email = emailField.current.value || "";
    let userPwd = userPasswordField.current.value || "";
    if (email.length === 0) {
      toggleErrMsgClass(emailField, emailErrMsgDiv, true);
      valid = false;
    } else {
      toggleErrMsgClass(emailField, emailErrMsgDiv, false);
    }
    if (userPwd.length === 0) {
      toggleErrMsgClass(userPasswordField, userPwdErrMsgDiv, true);
      valid = false;
    } else {
      toggleErrMsgClass(userPasswordField, userPwdErrMsgDiv, false);
    }

    if (valid) {
      const loginSuccess = (res) => {
        setFormErrorMsg("");
        if (res?.redirect) {
          navigate("/");
        }
      };
      const loginFail = (err) => {
        setFormErrorMsg(err.data);
      };
      const loginCallback = (response) => {
        setLoadingState(false);
        if (response.status === 200) {
          loginSuccess(response);
        } else {
          loginFail(response);
        }
        setLoadingState(false);
      };
      let params = {
        email: email,
        userPwd: userPwd,
        rememberMe: rememberMe.current.checked,
      };
      setLoadingState(true);
      Utils.executeLoginRESTAPI(params).then(loginCallback);
    } else {
      console.log("login form is in-complete...");
    }
  };

  const emailFocusOutEventHandler = (e) => {
    e.preventDefault();
    let email = emailField.current.value || "";
    if (email.length === 0) {
      toggleErrMsgClass(emailField, emailErrMsgDiv, true);
    } else {
      toggleErrMsgClass(emailField, emailErrMsgDiv, false);
    }
  };

  const userPwdFocusOutEventHandler = (e) => {
    e.preventDefault();
    let userPwd = userPasswordField.current.value || "";
    if (userPwd.length === 0) {
      toggleErrMsgClass(userPasswordField, userPwdErrMsgDiv, true);
    } else {
      toggleErrMsgClass(userPasswordField, userPwdErrMsgDiv, false);
    }
  };

  Utils.userSessionExists() && setCanRedirectToLanding(true);

  useEffect(() => {}, []);

  useEffect(() => {
    gloablError.current.classList[formErrorMsg?.trim().length ? 'remove': 'add']('d-none');
  }, [formErrorMsg]);

  // let defaultEmailValue = "user_1@company.com";
  // let defaultPwdValue = "user_1";

  return (
    <Container className="vh-100 vw-100 p-0 m-0 mw-100 mh-100">
      <Card className="p-0 m-0 w-100 h-100 border-0">
        <Form className="form w-100 h-100 d-flex">
          <div className="dbs-login-page-left-side h-100 w-50 overflow-hidden">
            <img
              className="h-100 w-50"
              src={LoginLeftBGImg}
              alt="Welcome to our Digital Business Card Form"
            />
            <div className="vh-100 dbc-login-logo-text-wrapper">
              <div className="h-100 dbc-login-logo-text align-items-center">
                Welcome to our Digital Business Card Platform
              </div>
            </div>
          </div>

          <div className="dbs-login-page-right-side w-50 h-100">
            <div className="dbs-login-page-right-top-logo">
              <img
                src={LoginRightBGImg}
                className="d-flex justify-content-end"
                alt="digital business cards"
              />
            </div>

            <div className="dbc-login-form-wrapper">
              <div className="dbc-login-form-headings text-left">
                <div className="dbc-login-form-text-login">Log in</div>
                <div className="dbc-login-form-text-desc">
                  Please log in to your account.
                </div>
              </div>

              <div className="dbc-login-form">
                <div className="dbc-login-form-input-wrapper">
                  <input
                    // className={` ${warnemail ? "dbs-login-form-input-warning" : ""}`}
                    className={`dbc-login-form-input dbc-login-form-input-email`}
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    required
                    ref={emailField}
                    //value={defaultEmailValue}
                    onChange={emailFocusOutEventHandler}
                  />
                  {/* <p className={` ${danger ? "danger" : ""}`}> */}
                  <p ref={emailErrMsgDiv} className="d-none">
                    Please enter a valid email address.
                  </p>
                </div>
                <div className="dbc-login-form-input-wrapper">
                  <input
                    // className={` ${warnpass ? "dbs-login-form-input-warning" : ""}`}
                    className={`dbc-login-form-input dbc-login-form-input-password`}
                    type="password"
                    ref={userPasswordField}
                    placeholder="Enter Password"
                    name="password"
                    required
                    //value={defaultPwdValue}
                    onChange={userPwdFocusOutEventHandler}
                  />
                  {/* <p className={` ${danger ? "danger" : ""}`}> */}
                  <p ref={userPwdErrMsgDiv} className="d-none">
                    Please enter password.
                  </p>
                </div>
                <div className="dbs-login-remember-reset">
                  <div className="dbs-login-remember-wrapper">
                    <input
                      className="form-check-input dbs-login-remember-checkbox p-0 m-0"
                      type="checkbox"
                      ref={rememberMe}
                    />
                    <div className="dbs-login-remember-label">Remember me</div>
                  </div>
                  <div className="dbs-login-reset-wrapper">Reset password?</div>
                </div>

                <div className="btn w-100 h-100 p-0 m-0 dbs-login-form-btn-wrapper">
                  <Button
                    className="w-100 m-0 p-0 dbs-login-form-btn"
                    type="submit"
                    onClick={onClickHandler}
                  >
                    Login
                  </Button>
                </div>
              </div>

              <div className="dbc-login-global-error d-none" ref={gloablError}>
                {formErrorMsg}
              </div>
            </div>

            <div className="dbs-login-footer-wrapper">
              <div className="dbs-login-footer text-uppercase">
                <div className="dbs-login-footer-msg-1">worldwide reach,</div>
                <div className="dbs-login-footer-msg-2">human touch</div>
              </div>
            </div>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginForm;
