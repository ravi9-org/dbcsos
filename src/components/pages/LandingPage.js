import React, { useContext, useEffect, useState } from "react";
import Header from "../header/Header";
import Body from "../body/Body";
import Footer from "../footer/Footer";

import Utils from "../Utils";
import ContextComponent from "../AppContext";

const LandingPage = () => {
  let [canRender, setCanRender] = useState(false);
  let { addrCtxData, setAddrCtxData, setCanRedirectToLogin } = useContext(ContextComponent);

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
        //debugger;
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
      setCanRedirectToLogin(true);
    };

    try {
      Utils.getAddresses().then(success, fail);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (!Utils.isObjectEmpty(addrCtxData)) {
      setCanRender(true);
    }
  }, [addrCtxData]);

  return (
    <>
      {canRender && (
        <>
          <Header />
          <Body />
          <Footer />
        </>
      )}
    </>
  );
};

export default LandingPage;
