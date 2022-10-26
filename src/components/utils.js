import axios from "axios";

/*
const CTX = {
  PROTOCOL: "http://",
  HOST: "dbc.hostname.com",
  PORT: ":80",
};
*/
const CTX = {
  PROTOCOL: "http://",
  HOST: "localhost",
  PORT: ":3004",
};

const REST_API_PREFIX = CTX.PROTOCOL + CTX.HOST + CTX.PORT;

const PARAMS = {
  API: {
    LOGIN: REST_API_PREFIX + "/login",
    LOGOUT: REST_API_PREFIX + "/logout",
    USER_PROFILE: REST_API_PREFIX + "/user/",
    GET_CARDS: REST_API_PREFIX + "/cards",
    GET_TEMPLATES: REST_API_PREFIX + "/templates",
  },
};

const LOCAL_STORAGE = window.localStorage;
const STORAGE = LOCAL_STORAGE;

const TTL = 1800000;
const LONG_TTL = 180000000;

const SESSION = "dbc_session";
const TOKEN = "accessToken";
const EMAIL = "email";
const USERID = "id";

const STATUS_OK = 200;

const userSessionExists = () => {
  let sessionExists = !isObjectEmpty(getSession());
  return !!sessionExists;
};

const createSession = (userObj) => {
  let storageObj = {};
  storageObj[TOKEN] = userObj.accessToken;
  storageObj[EMAIL] = userObj.user.email;
  storageObj[USERID] = userObj.user.id;

  const now = new Date();

  const storageValue = {
    value: storageObj,
    expiry: now.getTime() + (userObj.rememberMe ? LONG_TTL : TTL),
  };

  STORAGE.setItem(SESSION, JSON.stringify(storageValue));
};

const deleteSession = (info) => {
  STORAGE.removeItem(SESSION);
};

const getSession = () => {
  const itemStr = STORAGE.getItem(SESSION);
  if (!itemStr) {
    return {};
  }
  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    STORAGE.removeItem(SESSION);
    return {};
  }
  return item.value;

  // let session = JSON.parse(STORAGE.getItem(SESSION)) || {};
  // return session;
};

const getToken = (session = getSession()) => {
  let token = session[TOKEN] || "";
  return token;
};

const getUserEmail = (session = getSession()) => {
  let token = session[EMAIL] || "";
  return token;
};

const getUserId = (session = getSession()) => {
  let token = session[USERID] || "";
  return token;
};

const getSpecSessionValue = (session = getSession(), sessionkey) => {
  let value = session[sessionkey] || "";
  return value;
};

const isObjectEmpty = (obj = {}) => {
  return Object.keys(obj).length === 0;
};

const getUserProfile = () => {
  const myPromise = new Promise((resolve, reject) => {
    let session = getSession();
    if (isObjectEmpty(session).length === 0) {
      reject({
        redirect: true,
        message: "No session establised till now...",
      });
    }

    let token = getToken();
    if (token) {
      let userId = getUserId(session);
      let getUrl = PARAMS.API.USER_PROFILE + userId;
      axios.get(getUrl).then((res) => {
        resolve(res);
      });
    } else {
      reject({
        redirect: true,
        message: "No token available till now...",
      });
    }
  });

  return myPromise;
};

const executeLogoutRESTAPI = () => {
  const alwaysClassback = (response, callbackFn) => {
    deleteSession();
    if (response.status === STATUS_OK) {
    }
    callbackFn({
      redirect: true,
      ...{ response },
    });
  };
  const myPromise = new Promise((resolve, reject) => {
    let formData = {
      email: getUserEmail(),
      password: getUserId(),
    };
    let logoutUrl = PARAMS.API.LOGOUT;
    let success = (response) => {
      alwaysClassback(response, resolve);
    };
    let failure = (err) => {
      alwaysClassback(err.response, reject);
    };
    axios.post(logoutUrl, formData /*, headersInfo*/).then(success, failure);
  });

  return myPromise;
};

const executeLoginRESTAPI = (params) => {
  const myPromise = new Promise((resolve, reject) => {
    let formData = {
      email: params.email,
      password: params.userPwd,
    };
    // let headersInfo = {
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // };
    let loginUrl = PARAMS.API.LOGIN;

    let success = (res) => {
      if (res.status === STATUS_OK) {
        deleteSession();
        createSession({...res.data, 'rememberMe': params.rememberMe});
      }
      resolve({
        redirect: true,
        ...res,
      });
    };

    let failure = (err) => {
      resolve({
        redirect: false,
        ...err.response,
      });
    };
    axios.post(loginUrl, formData /*, headersInfo*/).then(success, failure);
  });

  return myPromise;
};

const Utils = {
  PARAMS,
  userSessionExists,
  getUserProfile,
  executeLoginRESTAPI,
  executeLogoutRESTAPI,
  createSession,
  deleteSession,
};

export default Utils;
