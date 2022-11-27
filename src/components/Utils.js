import axios from "axios";

const CTX = {
  PROTOCOL: "http://",
  HOST: "dbc.cmsedge.com",
  PORT: "",
  // POSTFIX: "/api/"
  POSTFIX: "",
};

// const CTX = {
//   PROTOCOL: "http://",
//   HOST: "localhost",
//   PORT: ":3004",
// };

const REST_API_PREFIX = CTX.PROTOCOL + CTX.HOST + CTX.PORT + CTX.POSTFIX;

const REST_API = {
  LOGIN: REST_API_PREFIX + "/login",
  LOGOUT: REST_API_PREFIX + "/logout",
  USER_PROFILE: REST_API_PREFIX + "/users/",
  USER_BULK_UPLOAD: REST_API_PREFIX + "/users/import",
  EDIT_USER_PROFILE: REST_API_PREFIX + "/users/profile/",
  BADGES: REST_API_PREFIX + "/badges/",
  CARDS: REST_API_PREFIX + "/cards",
  TEMPLATES: REST_API_PREFIX + "/templates",
  ANONYMOUS_CARD: REST_API_PREFIX + "/card",
  USER_CARD: REST_API_PREFIX + "/usercards",
  ADDRESSES: REST_API_PREFIX + "/addresses/",
  ADDRESS_BULK_UPLOAD: REST_API_PREFIX + "/addresses/import",
  BRANDS: REST_API_PREFIX + "/brands/",
};

const APP_URL_PREFIX = "";

const APP_URLS = {
  LOGIN_PAGE: APP_URL_PREFIX + "login",
  LANDING_PAGE: APP_URL_PREFIX + "/",
  BRANDS_PAGE: APP_URL_PREFIX + "/brands",
  TEMPLATES_PAGE: APP_URL_PREFIX + "/templates",
  ADD_TEMPLATE_PAGE: APP_URL_PREFIX + "/templates/addtemplate",
  CARDS_PAGE: APP_URL_PREFIX + "/cards",
  ADD_CARD_PAGE: APP_URL_PREFIX + "/cards/addcard",
  EDIT_CARD_PAGE: APP_URL_PREFIX + "/cards/editcard/:cardid",
  CARD_DETAILS_PAGE: APP_URL_PREFIX + "/cards/:cardid",
  CARD_EXTERNAL_PAGE: APP_URL_PREFIX + "/card/:cardid",
  ADDRESS_PAGE: APP_URL_PREFIX + "/addresses",
  BADGES_PAGE: APP_URL_PREFIX + "/badges",
  ADD_BADGE_PAGE: APP_URL_PREFIX + "/addbadgepage",
  USERS_PAGE: APP_URL_PREFIX + "/users",
  EMAIL_SIGNAURE_PAGE: APP_URL_PREFIX + "/emailsignature",
  CONTACTS_PAGE: APP_URL_PREFIX + "/contacts",
  SETTINGS_PAGE: APP_URL_PREFIX + "/settings",
};

const NAV_ITEMS_KEYS = [
  "templates",
  "brands",
  "users",
  "addresses",
  "badges",
  "cards",
  "emailsignature",
  //"contacts",
  "settings",
];

const NAV_ITEMS_VALUES = {
  templates: {
    title: "Templates",
    url: APP_URLS.TEMPLATES_PAGE,
    enabled: false,
  },
  brands: {
    title: "Brands",
    url: APP_URLS.BRANDS_PAGE,
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
  badges: {
    title: "Badges",
    url: APP_URLS.BADGES_PAGE,
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
  // contacts: {
  //   title: "Contacts",
  //   url: APP_URLS.CONTACTS_PAGE,
  //   enabled: true,
  // },
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

const SESSION = "indi_session";
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

const getAllUsers = () => {
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
      let getUrl = REST_API.USER_PROFILE;
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

const bulkUsersUpload = (userData) => {
  let formData = { ...userData };
  delete formData.id;
  let url = REST_API.USER_BULK_UPLOAD;
  return axios({
    method: "post",
    url: url,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const addUser = (userData) => {
  let formData = { ...userData };
  delete formData.id;
  let url = REST_API.USER_PROFILE;

  return axios.post(url, formData);
};

const editUser = (userData, userId) => {
  let formData = { ...userData };
  delete formData.id;
  let url = REST_API.EDIT_USER_PROFILE + userId;

  return axios.patch(url, formData);
};

const deleteUser = (userId) => {
  let url = REST_API.USER_PROFILE + userId;
  return axios.delete(url);
};

const deleteUsers = (usersArray) => {
  let promises = [];
  usersArray.forEach((badge) => {
    promises.push(deleteUser(badge));
  });

  return Promise.all(usersArray);
};

const getFilteredUsers = (filterKey, filterQuery) => {
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
      let getUrl = REST_API.USER_PROFILE + filterKey + "/" + filterQuery;
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

const getUserCardsList = () => {
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
      let getUrl = REST_API.USER_CARD;
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

const addBrand = (addressData) => {
  let formData = { ...addressData };
  delete formData.id;
  let url = REST_API.BRANDS;

  return axios.post(url, formData);
};

const getBrands = () => {
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
      let getUrl = REST_API.BRANDS;
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

const deleteBrand = (brandId) => {
  let url = REST_API.BRANDS;
  return axios.delete(url + brandId);
};

const deleteBrands = (brandsArray) => {
  let promises = [];
  brandsArray.forEach((brand) => {
    promises.push(deleteBrand(brand));
  });
  return Promise.all(brandsArray);
};

const getAddresses = () => {
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
      let getUrl = REST_API.ADDRESSES;
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

const deleteAddress = (addressUID) => {
  let url = REST_API.ADDRESSES;
  return axios.delete(url + addressUID);
};

const deleteAddresses = (addressesArray) => {
  let promises = [];
  addressesArray.forEach((address) => {
    promises.push(deleteAddress(address));
  });

  return Promise.all(addressesArray);
};

const bulkAddressUpload = (addressData) => {
  let formData = { ...addressData };
  delete formData.id;
  let url = REST_API.ADDRESS_BULK_UPLOAD;
  return axios({
    method: "post",
    url: url,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const addAddress = (addressData) => {
  let formData = { ...addressData };
  delete formData.id;
  let url = REST_API.ADDRESSES;

  return axios.post(url, formData);
};

const addBadge = (badgeData) => {
  let formData = { ...badgeData };
  delete formData.id;
  let url = REST_API.BADGES;

  return axios.post(url, formData);
};

const deleteBadge = (badgeUID) => {
  let url = REST_API.BADGES;
  return axios.delete(url + badgeUID);
};

const deleteBadges = (badgesArray) => {
  let promises = [];
  badgesArray.forEach((badge) => {
    promises.push(deleteBadge(badge));
  });

  return Promise.all(badgesArray);
};

const getBadges = () => {
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
      let getUrl = REST_API.BADGES;
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

const addNewTemplate = (templateData) => {
  let formData = { ...templateData };
  delete formData.id;
  let url = REST_API.TEMPLATES;

  return axios.post(url, formData);
};

const getTemplates = () => {
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
      let getUrl = REST_API.TEMPLATES;
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

const getCardDetailsAsAnonymous = (cardPublicId) => {
  const myPromise = new Promise((resolve, reject) => {
    let getUrl = REST_API.ANONYMOUS_CARD + "/" + cardPublicId;
    axios.get(getUrl).then((res) => {
      resolve(res);
    });
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
      let getUrl = REST_API.USER_CARD + "/" + cardId;
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

const deleteCard = (cardId) => {
  let dataCardId = parseInt(cardId, 10);
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
      let deleteUrl = REST_API.USER_CARD + "/" + dataCardId;
      axios
        .delete(deleteUrl, {
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

const executeCardEditRESTAPI = (cardData, cardId) => {
  let formData = { ...cardData };
  delete formData.id;
  let url = REST_API.USER_CARD + "/" + cardId;

  return axios.patch(url, formData);
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

const fileToDataUri = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
};

const BADGE_TYPES = {
  phone: {
    label: "Phone",
    formInputType: "text",
  },
  address: {
    label: "Address",
    formInputType: "textarea",
  },
  url: {
    label: "URL",
    formInputType: "text",
  },
  email: {
    label: "EMail",
    formInputType: "text",
  },
};

const REGIONS = {
  aviation: "Aviation",
  maritime: "Maritime",
  greaterchina: "Greater China",
  anz: "ANZ",
  centraleurope: "Central Europe",
  northasia: "North Asia",
  northerneurope: "Northern Europe",
  singapore: "Singapore",
  southerneurope: "Southern Europe",
  northamericah3s: "North America H3S",
  africa: "Africa",
  eme: "EME",
  latam: "LATAM",
  canadamsbl: "Canada MSBL",
  pacific: "Pacific",
  sea: "SEA",
};

const PRONOUNS = {
  hehim: "He/Him",
  sheher: "She/Her",
  them: "Them",
};

const Utils = {
  REST_API,
  APP_URLS,
  NAV_ITEMS_KEYS,
  NAV_ITEMS_VALUES,
  BADGE_TYPES,
  REGIONS,
  PRONOUNS,
  userSessionExists,
  getUserProfile,
  getAllUsers,
  bulkUsersUpload,
  addUser,
  editUser,
  deleteUsers,
  getUserCardsList,
  deleteAddresses,
  getAddresses,
  addAddress,
  bulkAddressUpload,
  getBadges,
  addBadge,
  deleteBadges,
  getUserId,
  getFilteredUsers,
  getCardDetailsAsAnonymous,
  getCardDetails,
  deleteCard,
  addNewTemplate,
  getTemplates,
  getTemplateDetails,
  executeLoginRESTAPI,
  executeLogoutRESTAPI,
  executeCardAddRESTAPI,
  executeCardEditRESTAPI,
  addOrRemoveCardFromUser,
  getUniqueSetOfArray,
  addBrand,
  getBrands,
  deleteBrands,
  createSession,
  deleteSession,
  isObjectEmpty,
  fileToDataUri,
};

export default Utils;
