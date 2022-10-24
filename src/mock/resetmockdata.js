import React from "react";
import axios from "axios";

const resetmockdata = () => {
  let reset = true;

  if (!reset) {
    let userObj = [];
    for (let i = 1; i <= 3; i++) {
      let userPrefix = "user_" + i;

      userObj.push({
        email: userPrefix + "@company.com",
        password: userPrefix
      });
    }
    let registerUrl = "http://localhost:3004/register";
    let deleteurl = "http://localhost:3004/delete/users/";
    let profileUrl = "http://localhost:3004/user";
    let index = 1;
    userObj.forEach(function (user) {
      let k = index++,
        delUrl = deleteurl + k;

      let registerUser = (userObj) => {
        let formData = { email: userObj.email, password: userObj.password },
          customConfig = {
            headers: {
              "Content-Type": "application/json",
            },
          };

        axios
          .post(registerUrl, JSON.stringify(formData), customConfig)
          .then((res) => {
            console.log(res);
          });
      };

      let addUserProfile = (userObj, kk) => {
        let formData = {
            email: userObj.email,
            firstName: "FN_USER_" + kk,
            lastName: "LN_USER_" + kk,
            image: "",
          },
          customConfig = {
            headers: {
              "Content-Type": "application/json",
            },
          };

        axios
          .post(profileUrl, JSON.stringify(formData), customConfig)
          .then((res) => {
            console.log(res);
          });
      };
      axios
        .delete(delUrl)
        .then((res) => {
          addUserProfile(user);
          registerUser(user, k);
        })
        .catch(() => {
          addUserProfile(user);
          registerUser(user);
        });
    });
  }
  return <></>;
};

export default resetmockdata;
