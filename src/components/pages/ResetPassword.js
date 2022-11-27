import React, { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Utils from "../Utils";
import ContextComponent from "../AppContext";
import "../../assets/css/login.css";
import LoginLeftBGImg from "../../assets/img/login-bg.png";
import LoginRightBGImg from "../../assets/img/logo-on-white-bg.png";

import { Container, Card, Form, Button } from "react-bootstrap";

const ResetPasswordForm = () => {
  const HIDDEN_CLASS = "d-none";
  let passwordField = useRef(null);
  let confirmPasswordField = useRef(null);
  let passwordErrMsgDiv = useRef(null);
  let confirmPasswordErrMsgDiv = useRef(null);
  let gloablError = useRef(null);
  let { setLoadingState, setCanRedirectToLogin } = useContext(ContextComponent);
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
    let password = passwordField.current.value || "";
    let confirmPassword = confirmPasswordField.current.value || "";
    if (password.length === 0 || password.length < 6 || password.length > 40) {
      toggleErrMsgClass(passwordField, passwordErrMsgDiv, true);
      valid = false;
    } else {
      toggleErrMsgClass(passwordField, passwordErrMsgDiv, false);
    }
    if (
      confirmPassword.length === 0 ||
      confirmPassword.length < 6 ||
      confirmPassword.length > 40
    ) {
      toggleErrMsgClass(confirmPasswordField, confirmPasswordErrMsgDiv, true);
      valid = false;
    } else {
      toggleErrMsgClass(confirmPasswordField, confirmPasswordErrMsgDiv, false);
    }

    if (valid && password !== confirmPassword) {
      valid = false;
      setFormErrorMsg("Password and confirm password fields are not equal");
    } else {
      setFormErrorMsg("");
    }

    if (valid) {
      const resetSuccess = (res) => {
        setFormErrorMsg("");
        if (res?.redirect) {
          Utils.deleteSession();
          navigate(Utils.APP_URLS.LOGIN_PAGE);
        }
      };
      const failCallback = (err) => {
        setFormErrorMsg(err.data);
      };
      const successCallback = (response) => {
        setLoadingState({
          applyMask: false,
        });
        if (response.status === 200) {
          resetSuccess(response);
        } else {
          //loginFail(response);
        }
      };
      let params = {
        newpassword: password,
        confirmpassword: confirmPassword,
      };
      setLoadingState({
        applyMask: true,
        text: "Log-in is in progress",
      });
      Utils.executeResetPassword(params).then(successCallback, failCallback);
    } else {
      console.log("login form is in-complete...");
    }
  };

  const passwordFocusOutEventHandler = (e) => {
    e.preventDefault();
    let password = passwordField.current.value || "";
    if (password.length === 0) {
      toggleErrMsgClass(passwordField, passwordErrMsgDiv, true);
    } else {
      toggleErrMsgClass(passwordField, passwordErrMsgDiv, false);
    }
  };

  const confirmPasswordFocusOutEventHandler = (e) => {
    e.preventDefault();
    let confirmPassword = confirmPasswordField.current.value || "";
    if (confirmPassword.length === 0) {
      toggleErrMsgClass(confirmPasswordField, confirmPasswordErrMsgDiv, true);
    } else {
      toggleErrMsgClass(confirmPasswordField, confirmPasswordErrMsgDiv, false);
    }
  };

  useEffect(() => {
    gloablError.current.classList[
      formErrorMsg?.trim().length ? "remove" : "add"
    ]("d-none");
  }, [formErrorMsg]);

  return (
    <Container className="vh-100 vw-100 p-0 m-0 mw-100 mh-100">
      <Card className="p-0 m-0 w-100 h-100 border-0">
        <Form className="form w-100 h-100 d-flex">
          <div className="indi-login-page-left-side h-100 w-50 overflow-hidden">
            <img
              className="h-100 w-50"
              src={LoginLeftBGImg}
              alt="Welcome to our Digital Business Card Form"
            />
            <div className="vh-100 indi-login-logo-text-wrapper">
              <div className="h-100 indi-login-logo-text align-items-center">
                Welcome to our Digital Business Card Platform
              </div>
            </div>
          </div>

          <div className="indi-login-page-right-side w-50 h-100">
            <div className="indi-login-page-right-top-logo">
              <img
                src={LoginRightBGImg}
                className="d-flex justify-content-end"
                alt="digital business cards"
              />
            </div>

            <div className="indi-login-form-wrapper">
              <div className="indi-login-form-headings text-left">
                <div className="indi-login-form-text-login">Reset password</div>
                <div className="indi-login-form-text-desc">
                  Please reset your password.
                </div>
              </div>

              <div className="indi-login-form">
                <div className="indi-login-form-input-wrapper">
                  <input
                    // className={` ${warnemail ? "indi-login-form-input-warning" : ""}`}
                    className={`indi-login-form-input indi-login-form-input-email`}
                    type="password"
                    placeholder="Enter new password"
                    name="password"
                    required
                    ref={passwordField}
                    //value={defaultEmailValue}
                    onChange={passwordFocusOutEventHandler}
                  />
                  {/* <p className={` ${danger ? "danger" : ""}`}> */}
                  <p ref={passwordErrMsgDiv} className="d-none">
                    Please enter new password (6 to 40 characters).
                  </p>
                </div>
                <div className="indi-login-form-input-wrapper">
                  <input
                    // className={` ${warnpass ? "indi-login-form-input-warning" : ""}`}
                    className={`indi-login-form-input indi-login-form-input-password`}
                    type="password"
                    ref={confirmPasswordField}
                    placeholder="Enter confirm password"
                    name="confirmPassword"
                    required
                    //value={defaultPwdValue}
                    onChange={confirmPasswordFocusOutEventHandler}
                  />
                  {/* <p className={` ${danger ? "danger" : ""}`}> */}
                  <p ref={confirmPasswordErrMsgDiv} className="d-none">
                    Please enter confirm password (6 to 40 characters).
                  </p>
                </div>

                <div className="btn w-100 h-100 p-0 m-0 indi-login-form-btn-wrapper">
                  <Button
                    className="w-100 m-0 p-0 indi-login-form-btn"
                    type="submit"
                    onClick={onClickHandler}
                  >
                    Reset
                  </Button>
                </div>
              </div>

              <div className="indi-login-global-error d-none" ref={gloablError}>
                {formErrorMsg}
              </div>
            </div>

            <div className="indi-login-footer-wrapper">
              <div className="indi-login-footer text-uppercase">
                <div className="indi-login-footer-msg-1">worldwide reach,</div>
                <div className="indi-login-footer-msg-2">human touch</div>
              </div>
            </div>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ResetPasswordForm;
