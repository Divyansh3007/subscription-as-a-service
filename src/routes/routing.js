const express = require("express");
const routing = express.Router();
const service = require("../service/subscribe");
const Subscription = require("../model/subscription");

//Routing to add user
routing.put("/user/:username", async (req, res, next) => {
  let username = {
    username: req.params.username,
  };
  try {
    let uid = await service.userCreation(username);
    let timeStamp = new Date();
    // to do response
    res.status(201);
    res.json({
      user_name: req.params.username,
      created_at: timeStamp,
    });
  } catch (err) {
    next(err);
  }
});

routing.get("/setupDB", async (req, res, next) => {
  try {
    let data = await service.insertScript();
    if (data) {
      res.status(201);
      res.json({ message: "Inserted " + data + " document in database" });
    }
  } catch (err) {
    next(err);
  }
});

//Routing to create/add new subscription for user
routing.post("/subscription", async (req, res, next) => {
  let subscribeObj = req.body;
  let username = subscribeObj.user_name;
  console.log(subscribeObj);
  try {
    let subscribeData = await service.updateSubscription(
      username,
      subscribeObj
    );
    res.json(subscribeData);
  } catch (err) {
    next(err);
  }
});

//Routing to get subscription details
routing.get("/subscription/:username", async (req, res, next) => {
  let username = req.params.username;
  try {
    let subscriptionDetails = await service.getSubscription(username);
    console.log(subscriptionDetails[0].subscription);
    res.status(200);
    res.json(subscriptionDetails[0].subscription);
  } catch (err) {
    next(err);
  }
});

//Routing to get subscription details with date
routing.get("/subscription/:username/:date", async (req, res, next) => {
  let username = req.params.username;
  let tempDate = req.params.date;
  let date = new Date(tempDate);
  try {
    let subscriptionDetails = await service.getSubscriptionValidity(
      username,
      date
    );
    res.status(200);
    res.json(subscriptionDetails);
  } catch (err) {
    next(err);
  }
});

module.exports = routing;
