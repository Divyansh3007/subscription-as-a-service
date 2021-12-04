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

// To add subscription data.
service.updateSubscription = async (username, subscribeObj) => {
  let tid = await dbLayer.updateSubscription(username, subscribeObj);
  if (tid) {
    return tid;
  } else {
    let err = new Error("subscription details not updated");
    err.status = 400;
    throw err;
  }
};

module.exports = service;
