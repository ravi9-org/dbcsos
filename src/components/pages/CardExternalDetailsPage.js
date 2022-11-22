import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Container from "react-bootstrap/Container";

import ContextComponent from "../AppContext";
import CardItem from "../body/content.area/cards/CardItem";
import Utils from "../Utils";
import downloadImage from "./../../assets/img/Upload.png";

const CardExternalDetailsPage = () => {
  const { cardid } = useParams();

  let [badgesCtxData, setBadgesCtxData] = useState([]);
  let [addrCtxData, setAddrCtxData] = useState([]);
  let [canRender, setCanRender] = useState(false);
  let [fetchAddresses, setFetchAddresses] = useState(false);
  let [cardObject, setCardObject] = useState({});

  useEffect(() => {
    const badgeSuccess = (res) => {
      setBadgesCtxData(res.data);
      setFetchAddresses(true);
    };
    const badgeFail = (err) => {
      err?.message?.length && console.log(err);
    };

    Utils.getBadges().then(badgeSuccess, badgeFail);
  }, []);

  useEffect(() => {
    const success = (res) => {
      let data = res.data;
      let tempAddrIds = [];
      let tempAddrNames = [];
      let tempAddrValues = [];
      let tempCityValues = [];
      let tempCountryValues = [];
      let tempZipValues = [];
      let tempFullAddrValues = [];
      let tempAddrNumbers = [];
      data.map((addr, index) => {
        tempAddrIds.push(addr.id);
        tempAddrNames.push(addr.name);

        let address = addr?.address || "";
        let city = addr?.city || "";
        let country = addr?.country || "";
        let zip = addr?.zip || "";

        tempAddrValues.push(address);
        tempCityValues.push(city);
        tempCountryValues.push(country);
        tempZipValues.push(zip);

        tempFullAddrValues.push(
          address + " " + city + " " + country + " " + zip
        );
        tempAddrNumbers.push(addr.contact);
      });

      let addrObj = {
        ids: tempAddrIds,
        addressNames: tempAddrNames,
        addresses: tempAddrValues,
        cities: tempCityValues,
        countries: tempCountryValues,
        fullAddresses: tempFullAddrValues,
        numbers: tempAddrNumbers,
      };
      setAddrCtxData(addrObj);

      setCanRender(true);
    };
    const fail = (err) => {
      console.log(err);
    };

    if (fetchAddresses) {
      try {
        Utils.getAddresses().then(success, fail);
      } catch (e) {
        console.log(e);
      }
    }
  }, [fetchAddresses]);

  const downloadHandler = (e) => {
    // console.log(cardObject);

    let userFirstName = "test first name";
    let userID = "test UID";
    let userEmail = "test@email.com";
    let telephone = "+91 98832 42424";
    let title = "Sr. Manager";
    let url = "https://cmsedge.com";
    let urlLink = "https://cmsedge.com";

    const POSTFIX = "\n";
    let vcfData = [];

    vcfData.push("BEGIN:VCARD" + POSTFIX);
    vcfData.push("VERSION:3.0" + POSTFIX);
    vcfData.push("FN:" + userFirstName + POSTFIX);
    vcfData.push("UID:" + userID + POSTFIX);
    vcfData.push("EMAIL:" + userEmail + POSTFIX);
    vcfData.push("TEL;TYPE=WORK::" + telephone + POSTFIX);
    vcfData.push("TITLE:" + title + POSTFIX);
    vcfData.push("URL:" + url + POSTFIX);
    vcfData.push("URL;TYPE=LINK:" + urlLink + POSTFIX);

    cardObject.fields.map((field, index) => {
      let value = cardObject.fieldsData[index];
      let pushString = "";
      if (value.trim().length > 0) {
        if (
          field === "vimeo" ||
          field === "wechat" ||
          field === "instagram" ||
          field === "linkedin" ||
          field === "twitter" ||
          field === "link"
        ) {
          pushString =
            "URL;TYPE=" + field.toUpperCase() + ":" + value + POSTFIX;
        }
      }
      pushString.length && vcfData.push(pushString);
    });

    vcfData.push("NOTE:Created with by cmsedge" + POSTFIX);
    vcfData.push("N:;" + userFirstName + ";;;;" + POSTFIX);
    vcfData.push("END:VCARD");

    // console.log(vcfData);
    const file = new Blob(vcfData, { type: "text/plain" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = userFirstName.replaceAll(" ", "_") + ".vcf";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <ContextComponent.Provider
      value={{
        badgesCtxData,
        addrCtxData,
        setCardObject,
      }}
    >
      {canRender && (
        <Container className="indi-app indi-ext-card-details-page">
          <div className="indi-ext-card-item-wrapper d-flex">
            <CardItem cardId={cardid} />
          </div>
          <div
            className="indi-card-ext-download-card"
            role="button"
            onClick={downloadHandler}
          >
            <img src={downloadImage} alt="download" />
          </div>
        </Container>
      )}
    </ContextComponent.Provider>
  );
};

export default CardExternalDetailsPage;
