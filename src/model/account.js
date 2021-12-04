const initialData = require("./data.json");
const connection = require("../utilities/connection");

let createConnection = async () => {
  collection = await connection.getCollection();
};

let model = {};
// to add new user.
model.createUser = async (username) => {
  let UserData = await collection.create(username);
  return UserData ? true : false;
};

// model function for initial data setup, optional.
model.insertScript = async () => {
  await collection.deleteMany();
  let response = await collection.insertMany(initialData);
  if (response && response.length > 0) {
    return response.length;
  } else {
    let err = new Error("Script insertion failed");
    err.status = 500;
    throw new Error();
  }
};

//  to add subscription data, post call.

model.updateSubscription = async (username, subscriptionObj) => {
  //   let user_name = await model.generateId();
  //   subscriptionObj.user_name = user_name;
  let response = await collection.updateOne(
    { username: username },
    { $push: { subscription: subscriptionObj } }
  );
  if (response.nModified > 0) return subscriptionObj.user_name;
  else return null;
};

// to fetch subscription details based on name
model.getSubscription = async (username) => {
  let subscribeData = await collection.find(
    { username: username },
    { _id: 0, subscription: 1 }
  );
  return subscribeData;
};

// to fetch subscription details based on name and date.
model.getSubscriptionValidity = async (username) => {
  let subscribeData = await collection.find(
    { username: username },
    { _id: 0, subscription: 1 }
  );
  return subscribeData;
};
