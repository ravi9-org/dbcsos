import React, { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Utils from "../utils";
import ContextComponent from "../app.context";
import "../../assets/css/login.css";

import {
  Container,
  Row,
  Col,
  Input,
  Checkbox,
  Icon,
  Btn,
} from "react-bootstrap";

const LoginForm = () => {
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
    <div className="container">
      <div className="card">
        <div className="form">
          <div className="left-side">
            <img src="https://imgur.com/XaTWxJX.jpg" />
          </div>

          <div className="right-side">
            <div className="register">
              <p>
                Not a member? <a href="#">Register Now</a>
              </p>
            </div>

            <div className="hello">
              <h2>Hello Again!</h2>
              <h4>Welcome back you have been missed! </h4>
            </div>

            <form>
              <div className="input_text">
                <input
                  // className={` ${warnemail ? "warning" : ""}`}
                  className={``}
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  // value={inputs.email}
                  // onChange={inputEvent}
                />
                {/* <p className={` ${danger ? "danger" : ""}`}> */}
                <p className={``}>
                  <i className="fa fa-warning"></i>Please enter a valid email
                  address.
                </p>
              </div>
              <div className="input_text">
                <input
                  // className={` ${warnpass ? "warning" : ""}`}
                  className={``}
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  // value={inputs.password}
                  // onChange={inputEvent}
                />
                <i
                  // onClick={Eye}
                  // className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
                  className={`fa fa-eye-slash`}
                ></i>
              </div>
              <div className="recovery">
                <p>Recovery Password</p>
              </div>
              <div className="btn">
                <button type="submit">Sign in</button>
              </div>
            </form>

            <hr />
            <div className="or">
              <p>or signin with</p>
            </div>
            <div className="boxes">
              <span>
                <img src="https://imgur.com/XnY9cKl.png" />
              </span>
              <span>
                <img src="https://imgur.com/ODlSChL.png" />
              </span>
              <span>
                <img src="https://imgur.com/mPBRdQt.png" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
