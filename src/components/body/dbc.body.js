import React, { useState, useRef } from 'react';
import LeftNavigation from './left.navigation/left.navigation';
import RightContent from './content.area/cards.list';
// import RightContent from './content.area/cards.list';

const DBCBody = () => {
    // const [data, setData] = useState("Hello, how are you?");
    // const [toggle, setToggle] = useState(false);
    // const returnComment = useCallback((name) => {
    //     //console.log(' i m in returnComment ');
    //     return data + ":" + name;
    // }, [data]);
    return (
        <div>
            <LeftNavigation />
            <RightContent />
        </div>
    )
}

export default DBCBody