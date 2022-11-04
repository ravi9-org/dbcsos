import React from "react";

const CardList = () => {
  return (
    <div className="row indi-badge-row-wrapper">
      <div className="col indi-badge-add-button-wrapper">
        <a href="/" className="indi-badge-add-button">
          Badges
        </a>
      </div>

      <ul className="col col-sm-9 mb-0 indi-badge-list-wrapper">
        <li
          key="indi-add-badge-item-wechat"
          className="d-sm-inline-block next-list-item"
        >
          <a
            href="/"
            className="nav-link addBadge indi-add-badge-item indi-add-badge-item-wechat "
          >
            Test 1
          </a>
          <p className="badge-icon-text">We chat</p>
        </li>
        <li
          key="indi-add-badge-item-vimeo"
          className="d-sm-inline-block next-list-item"
        >
          <a
            href="/"
            className="nav-link addBadge indi-add-badge-item indi-add-badge-item-vimeo "
          >
            Test 2
          </a>
          <p className="badge-icon-text">Vimeo</p>
        </li>
      </ul>
    </div>
  );
};

export default CardList;
