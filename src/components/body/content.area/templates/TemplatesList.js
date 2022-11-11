import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ContextComponent from "../../../AppContext";
import AddItemImg from "../../../../assets/img/add-card.png";
import Utils from "../../../Utils";
import TemplateItem from "./TemplateItem";

const TemplatesList = () => {
  let { userData, setCanRedirectToLogin } = useContext(ContextComponent);

  let [templates, setTemplates] = useState([]);
  let navigate = useNavigate();

  // useEffect(() => {
  //   if (userData?.cards) {
  //     setUserCards(Utils.getUniqueSetOfArray(userData.cards));
  //   }
  // }, [userData]);

  const navgiatToAddPage = (e) => {
    e.preventDefault();
    navigate(Utils.APP_URLS.ADD_TEMPLATE_PAGE);
  };

  const success = (res) => {
    setTemplates(res.data);
    //setUserData(res.data || {});
  };
  const fail = (err) => {
    err?.message?.length && console.log(err);
    if (err?.redirect) {
      setCanRedirectToLogin(true);
    }
  };

  useEffect(() => {
    Utils.getTemplates().then(success, fail);
  }, []);



  return (
    <>
      <div className="indi-body-cards-wrapper d-flex w-100">
        <div className="indi-body-action-bar w-100">
          <div className="w-50 indi-body-action-bar-title">
            Templates
          </div>
        </div>

        <div className="indi-cards-collection-wrapper d-flex">
          <div
            className="d-flex indi-placeholder-add-card indi-card-item-wrapper"
            onClick={navgiatToAddPage}
          >
            <div className="d-flex indi-placeholder-add-card-img">
              <img src={AddItemImg} alt="Add item" />
            </div>
            <div className="d-flex indi-placeholder-add-card-text">
              Add template
            </div>
          </div>
          {templates.map((template, index) => (
            <div className="indi-card-item-wrapper" key={index}>
              <TemplateItem template={template} applyActions={true} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TemplatesList;

