import React, { useState, useRef } from "react";
import axios from "axios";

import Utils from "../../utils";

const TemplateList = () => {

  let logoRef = useRef(null);
  let bgRef = useRef(null);


  let myFile = useRef();

  const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
  });
  
  let [logo, setLogo] = useState('');
  let [bg, setBg] = useState('');

  let onFileChange = function (e, callback) {
    let file = e.currentTarget.files[0];
    fileToDataUri(file)
      .then(dataUri => {
        callback(dataUri);
        console.log(" ==================== dataUri : " + dataUri);        
      });
  }

  let logoChange = function (e) {
    onFileChange(e, setLogo);
  }
  
  let bgChange = function (e) {
    onFileChange(e, setBg);
  }

  const onClickHandler = (e) => {
    e.preventDefault();
    

    let formData = {
      "templateName": "aspire",
      "backgroundImage": bg,
      "logoImage": logo,
      "fields": [{
        "telephone": {
          "type": "text",
          "required": true,
          "multiple": true
        },
        "email": {
          "type": "text",
          "required": true,
          "multiple": true
        },
        "website": {
          "type": "text",
          "required": false,
          "multiple": false
        },
        "youtube": {
          "type": "text",
          "value": "http://www.youtube.com",
          "required": false,
          "multiple": false,
          "readonly": true
        },
        "twitter": {
          "type": "text",
          "required": false,
          "multiple": false
        },
        "wechat": {
          "type": "text",
          "required": false,
          "multiple": false
        },
        "linkedin": {
          "type": "text",
          "required": false,
          "multiple": false
        },
      }]
    };
  
    let url = Utils.PARAMS.API.TEMPLATES;

    let data = JSON.stringify(formData);

    console.log(url);
    console.log(formData);
    console.log(data);

    debugger;

    try {
      axios.post(url, formData /*data*/ /*, headersInfo*/).then((res) => {
        console.log(res);
        debugger;
      }, (err) => {
        console.log(err);
        debugger;
       });
    } catch (e) {
      console.log(e);
    }

   

    // try {
    //   axios.post(url, data /*, headersInfo*/).then((res) => {
    //     console.log(res);
    //     debugger;
    //   });
    // } catch (e) {
    //   console.log(e);
    // }


  }

  return (
    <>
      <div className="dbc-tile">
        <form>
          <input type="file" name="logo" ref={logoRef} onChange={ logoChange }/>
          <input type="file" name="bg" ref={bgRef} onChange={bgChange} />
          <button onClick={onClickHandler}>Send</button>
          </form>
      </div>

      <br />
      <br />
      <br />
      <br />
      logo: {logo}
      <br />
      bg:{bg}
      <br />
      <br />
      <br />
      <br />
      <div className="dbc-tile">
        This is templates list pageThis is templates list pageThis is templates
        list pageThis is templates list pageThis is templates list page
      </div>
      <div className="dbc-tile">
        This is templates list pageThis is templates list pageThis is templates
        list page
      </div>
    </>
  );
};

export default TemplateList;
