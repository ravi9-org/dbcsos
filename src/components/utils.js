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

const REST_API = {
  LOGIN: REST_API_PREFIX + "/login",
  LOGOUT: REST_API_PREFIX + "/logout",
  USER_PROFILE: REST_API_PREFIX + "/users/",
  CARDS: REST_API_PREFIX + "/cards",
  TEMPLATES: REST_API_PREFIX + "/templates",
  USER_CARD: REST_API_PREFIX + "/usercards/",
};

const APP_URL_PREFIX = "";

const APP_URLS = {
  LOGIN_PAGE: APP_URL_PREFIX + "login",
  LANDING_PAGE: APP_URL_PREFIX + "/",
  TEMPLATES_PAGE: APP_URL_PREFIX + "/templates",
  CARDS_PAGE: APP_URL_PREFIX + "/cards",
  ADD_CARD_PAGE: APP_URL_PREFIX + "/cards/addcard",
  CARD_DETAILS_PAGE: APP_URL_PREFIX + "/cards/:cardid",
  CARD_EXTERNAL_PAGE: APP_URL_PREFIX + "/cardextdetails/:cardid",
  ADDRESS_PAGE: APP_URL_PREFIX + "/addresses",
  USERS_PAGE: APP_URL_PREFIX + "/users",
  EMAIL_SIGNAURE_PAGE: APP_URL_PREFIX + "/emailsignature",
  CONTACTS_PAGE: APP_URL_PREFIX + "/contacts",
  SETTINGS_PAGE: APP_URL_PREFIX + "/settings",
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
      let getUrl = REST_API.USER_PROFILE + userId;
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
      let getUrl = REST_API.TEMPLATES + "/" + templateId;
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
      let getUrl = REST_API.USER_CARD + cardId;
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

const deleteCard = (cardId, cardsArray) => {
  let dataCardId = parseInt(cardId, 10);
  let updatedCardsArray = getUniqueSetOfArray(cardsArray);
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
      let getUrl = REST_API.USER_CARD + dataCardId;
      axios
        .delete(getUrl, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => {
          updatedCardsArray.splice(1, updatedCardsArray.indexOf(dataCardId));
          addOrRemoveCardFromUser(updatedCardsArray).then((res1) => {
            res["updatedCardsArray"] = updatedCardsArray;
            resolve(res);
          });
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
    let logoutUrl = REST_API.LOGOUT;
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
    let loginUrl = REST_API.LOGIN;

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

const executeCardAddRESTAPI = (cardData) => {
  let formData = { ...cardData };
  delete formData.id;
  let url = REST_API.USER_CARD;

  return axios.post(url, formData);
};

const addOrRemoveCardFromUser = (userCardsArray) => {
  let formData = { cards: userCardsArray };
  delete formData.id;
  let url = REST_API.USER_PROFILE + getUserId();
  return axios.patch(url, formData);
};

const getUniqueSetOfArray = (arr) => {
  return [...new Set(arr)];
};

const Utils = {
  REST_API,
  APP_URLS,
  NAV_ITEMS_KEYS,
  NAV_ITEMS_VALUES,
  userSessionExists,
  getUserProfile,
  getUserId,
  getCardDetails,
  deleteCard,
  getTemplateDetails,
  executeLoginRESTAPI,
  executeLogoutRESTAPI,
  executeCardAddRESTAPI,
  addOrRemoveCardFromUser,
  getUniqueSetOfArray,
  createSession,
  deleteSession,
  isObjectEmpty,
};

export default Utils;
