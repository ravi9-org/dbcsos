import React, { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Utils from "../utils";
import ContextComponent from "../app.context";

const Login = () => {
  const HIDDEN_CLASS = "dbc-hidden";
  let emailField = useRef(null);
  let userPasswordField = useRef(null);
  let emailErrMsgDiv = useRef(null);
  let userPwdErrMsgDiv = useRef(null);
  let { setLoadingState } = useContext(ContextComponent);
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
    console.log(email.length);
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

  useEffect(() => {}, []);

  let defaultEmailValue = "user_1@company.com";
  let defaultPwdValue = "user_1";

  return (
    <div>
      <div className="dbs-login-user-email-wrapper">
        <div className="dbs-login-user-email-row-wrapper">
          <label>Enter email:</label>
          <input
            type="text"
            name="email"
            defaultValue={defaultEmailValue}
            ref={emailField}
            placeholder="Enter login email here..."
            onBlur={emailFocusOutEventHandler}
          />
        </div>
        <div
          className={`dbs-login-user-email-err-msg dbc-hidden`}
          ref={emailErrMsgDiv}
        >
          Email field cannot be left blank...
        </div>
      </div>
      <div className="dbs-login-user-pwd-wrapper">
        <div className="dbs-login-user-pwd-row-wrapper">
          <label>Enter password:</label>
          <input
            type="password"
            name="email"
            defaultValue={defaultPwdValue}
            ref={userPasswordField}
            placeholder="Enter password here..."
            onBlur={userPwdFocusOutEventHandler}
          />
        </div>
        <div
          className={`dbs-login-user-pwd-err-msg  dbc-hidden`}
          ref={userPwdErrMsgDiv}
        >
          User password field cannot be left blank...
        </div>
      </div>
      <div className="dbs-login-user-submit-wrapper">
        <button onClick={onClickHandler}>Submit</button>
      </div>

      <div        className={"dbs-login-user-pwd-err-msg"}      >
        {formErrorMsg}
      </div>
    </div>
  );
};

export default Login;
