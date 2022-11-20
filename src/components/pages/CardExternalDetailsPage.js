import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Container from "react-bootstrap/Container";

import ContextComponent from "../AppContext";
import CardItem from "../body/content.area/cards/CardItem";
import Utils from "../Utils";

const CardExternalDetailsPage = () => {
  const { cardid } = useParams();

  let [badgesCtxData, setBadgesCtxData] = useState([]);
  let [addrCtxData, setAddrCtxData] = useState([]);
  let [canRender, setCanRender] = useState(false);
  let [fetchAddresses, setFetchAddresses] = useState(false);

  

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

  return (
    <ContextComponent.Provider
      value={{
        badgesCtxData,
        addrCtxData,
      }}
    >
      {canRender && <Container className="indi-app indi-ext-card-details-page">
        <div className="indi-ext-card-item-wrapper d-flex">
          <CardItem cardId={cardid} />
        </div>
      </Container>}
    </ContextComponent.Provider>
  );
};

export default CardExternalDetailsPage;
