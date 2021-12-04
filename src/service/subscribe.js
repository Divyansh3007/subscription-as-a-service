const dbLayer = require("../model/account");
const validator = require("../utilities/validator");

let service = {};

// Individual services for each use case

// To add a new user.
service.userCreation = async (username) => {
  let userid = await dbLayer.createUser(username);
  if (userid) {
    return userid;
  } else {
    let err = new Error("User details not added.");
    err.status = 400;
    throw err;
  }
};

// To add subscription data.
service.subscriptionDataAdd = async (subscribeObj) => {
  let subscribeData = await dbLayer.createAccount(subscribeObj);
  if (subscribeData) {
    return subscribeData;
  } else {
    let err = new Error("subscribe data not added");
    err.status = 500;
    throw err;
  }
};

// To setup initial DB, optional service.
service.insertScript = async () => {
  let data = await dbLayer.insertScript();
  return data;
};

// to add details for any plan id.
priceAndValidity = (subscribeObj) => {
  let plan_id = subscribeObj.plan_id.toString();
  let date = new Date(subscribeObj.start_date);
  let validity = 0,
    endDate = new Date(),
    cost;
  if (plan_id == "FREE") {
    validity = 0;
    cost = 0.0;
    endDate = null;
  } else if (plan_id == "TRIAL") {
    validity = 7;
    cost = 0.0;
    endDate = date.setDate(date.getDate() + validity);
  } else if (plan_id === "LITE_1M") {
    validity = 30;
    cost = 100.0;
    endDate = date.setDate(date.getDate() + validity);
  } else if (plan_id === "PRO_1M") {
    validity = 180;
    cost = 200;
    endDate = date.setDate(date.getDate() + validity);
  } else if (plan_id === "LITE_6M") {
    validity = 180;
    cost = 500.0;
    endDate = date.setDate(date.getDate() + validity);
  } else if (plan_id === "PRO_6M") {
    validity = 180;
    cost = 900.0;
    endDate = date.setDate(date.getDate() + validity);
  }

  let tempObj = {
    validity: validity,
    cost: cost,
    endDate: endDate,
  };
  return tempObj;
};

// To add subscription data.
service.updateSubscription = async (username, subscribeObj) => {
  let tempObj = priceAndValidity(subscribeObj);
  console.log(tempObj);
  let finalObj = {
    user_name: username,
    plan_id: subscribeObj.plan_id.toString(),
    start_date: subscribeObj.start_date,
    end_date: tempObj.endDate,
  };

  let uid = await dbLayer.updateSubscription(username, finalObj);
  if (uid) {
    let obj = { status: "SUCCESS", amount: -tempObj.cost };
    return obj;
  } else {
    let err = new Error("Subscription details not updated");
    err.status = 400;
    throw err;
  }
};

// to fetch subscription details for any username
service.getSubscription = async (username) => {
  let data = await dbLayer.getSubscription(username);
  if (data.length) {
    return data;
  } else {
    let err = new Error("No Subscription details found");
    err.status = 404;
    throw err;
  }
};

// to process data and return final object.
getReturnObj = (date, obj) => {
  let finalObj;
  console.log(date);
  let data = obj[0].subscription;
  console.log(data);
  data.forEach((element) => {
    if (
      element.end_date != null &&
      new Date(date) < new Date(element.end_date)
    ) {
      const date1 = new Date(date);
      const date2 = new Date(element.end_date);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      finalObj = {
        plan_id: element.plan_id,
        days_left: diffDays,
      };
    }
  });
  return finalObj;
};

// to fetch subscription details for any username and date
service.getSubscriptionValidity = async (username, date) => {
  let data = await dbLayer.getSubscriptionValidity(username);
  let tempObj = getReturnObj(date, data);
  if (tempObj) {
    return tempObj;
  } else {
    let err = new Error("No Subscription details found");
    err.status = 404;
    throw err;
  }
};

module.exports = service;
