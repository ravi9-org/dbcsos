import React, { useContext, useState, useEffect } from "react";
import LeftNavigation from "./left.navigation/LeftNavigation";
import ContentArea from "./content.area/ContentArea";
import ContextComponent from "../AppContext";
import Utils from "../Utils";

const Body = () => {
  let [canRender, setCanRender] = useState(true);
  let { addrCtxData, setAddrCtxData } = useContext(ContextComponent);

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
    };
    const fail = (err) => {
      console.log(err);
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
        <div className="indi-body-wrapper container ">
          <div className="indi-body-row h-100">
            <div className="row h-100">
              <div className="col col-sm-3 indi-full-height">
                <LeftNavigation />
              </div>
              <div className="col col-sm-9 indi-full-height">
                <ContentArea />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Body;
