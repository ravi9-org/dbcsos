import React, { useState, useRef } from 'react';

const CardList = () => {
    // const [data, setData] = useState("Hello, how are you?");
    // const [toggle, setToggle] = useState(false);
    // const returnComment = useCallback((name) => {
    //     //console.log(' i m in returnComment ');
    //     return data + ":" + name;
    // }, [data]);
    return (
        <div className="row dbc-badge-row-wrapper">
            <div className="col dbc-badge-add-button-wrapper">
                <a href="#" className="dbc-badge-add-button">Badges</a>
            </div>
            
            <ul className="col col-sm-9 mb-0 dbc-badge-list-wrapper">
                <li className="d-sm-inline-block next-list-item">
                <a href="#" className="nav-link addBadge dbc-add-badge-item dbc-add-badge-item-wechat ">
                Test 1
                </a>
                <p className="badge-icon-text">We chat</p>
                </li><li className="d-sm-inline-block next-list-item">
                <a href="#" className="nav-link addBadge dbc-add-badge-item dbc-add-badge-item-vimeo ">
                Test 2
                </a>
                <p className="badge-icon-text">Vimeo</p>
                </li>
            </ul>
        </div>
    )
}

export default CardList