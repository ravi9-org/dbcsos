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
    USER_PROFILE: REST_API_PREFIX + "/users/",
    CARDS: REST_API_PREFIX + "/cards",
    TEMPLATES: REST_API_PREFIX + "/templates",
    USER_CARD: REST_API_PREFIX + "/usercards/",
  },
};

const APP_URL_PREFIX = "";

const APP_URLS = {
  LANDING_PAGE: APP_URL_PREFIX + "/",
  TEMPLATES_PAGE: APP_URL_PREFIX + "/templates",
  CARDS_PAGE: APP_URL_PREFIX + "/cards",
  ADD_CARD_PAGE: APP_URL_PREFIX + "/cards/addcard",
  ADDRESS_PAGE: APP_URL_PREFIX + "/addresses",
  USERS_PAGE: APP_URL_PREFIX + "/users",
  EMAIL_SIGNAURE_PAGE: APP_URL_PREFIX + "/emailsignature",
  CONTACTS_PAGE: APP_URL_PREFIX + "/contacts",
  SETTINGS_PAGE: APP_URL_PREFIX + "/settings"
};

const NAV_ITEMS_KEYS = [
  "templates",
  "users",
  "addresses",
  "cards",
  "emailsignature",
  "contacts",
  "settings",
];

const NAV_ITEMS_VALUES = {
  templates: {
    title: "Templates",
    url: APP_URLS.TEMPLATES_PAGE,
    enabled: false,
  },
  users: {
    title: "Users",
    url: APP_URLS.USERS_PAGE,
    enabled: false,
  },
  addresses: {
    title: "Addresses",
    url: APP_URLS.ADDRESS_PAGE,
    enabled: false,
  },
  cards: {
    title: "Cards",
    url: APP_URLS.CARDS_PAGE,
    enabled: true,
  },
  emailsignature: {
    title: "Email signature",
    url: APP_URLS.EMAIL_SIGNAURE_PAGE,
    enabled: true,
  },
  contacts: {
    title: "Contacts",
    url: APP_URLS.CONTACTS_PAGE,
    enabled: true,
  },
  settings: {
    title: "Settings",
    url: APP_URLS.SETTINGS_PAGE,
    enabled: true,
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
      axios
        .get(getUrl, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
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

const getTemplateDetails = (templateId) => {
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
      let getUrl = PARAMS.API.TEMPLATES + "/"  + templateId;
      axios
        .get(getUrl, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
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

const getCardDetails = (cardId) => {
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
      let getUrl = PARAMS.API.USER_CARD + cardId;
      axios
        .get(getUrl, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
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
    try {
      axios.post(logoutUrl, formData /*, headersInfo*/).then(success, failure);
    } catch (e) {
      console.log(e);
    }
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
        createSession({ ...res.data, rememberMe: params.rememberMe });
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

const executeCardAddEditRESTAPI = (cardData) => {
  const alwaysClassback = (response, callbackFn) => {
    if (response.status === STATUS_OK) {
    }
    callbackFn({
      redirect: true,
      ...{ response },
    });
  };
  const myPromise = new Promise((resolve, reject) => {
    let formData = cardData;
    let url = PARAMS.API.USER_CARD;
    let success = (response) => {
      alwaysClassback(response, resolve);
    };
    let failure = (err) => {
      alwaysClassback(err.response, reject);
    };
    try {
      axios.post(url, formData /*, headersInfo*/).then(success, failure);
    } catch (e) {
      console.log(e);
    }
  });

  return myPromise;
};

const Utils = {
  PARAMS,
  userSessionExists,
  getUserProfile,
  getUserId,
  getCardDetails,
  getTemplateDetails,
  executeLoginRESTAPI,
  executeLogoutRESTAPI,
  executeCardAddEditRESTAPI,
  createSession,
  deleteSession,
  APP_URLS,
  NAV_ITEMS_KEYS,
  NAV_ITEMS_VALUES,
};

export default Utils;
