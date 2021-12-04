const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);
const url = "mongodb://localhost:27017/userDB";

let schema = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  subscription: {
    type: [
      {
        user_name: {
          type: String,
        },
        plan_id: {
          type: String,
        },
        start_date: {
          type: Date,
        },
        end_date: {
          type: Date,
        },
      },
    ],

    default: [],
  },
};

let accountSchema = new Schema(schema, {
  collection: "UserDB",
  timestamps: true,
});

let connection = {};
connection.getCollection = async () => {
  try {
    return (
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    ).model("UserDB", accountSchema);
  } catch (err) {
    let error = new Error("Could not connect to database");
    error.status = 500;
    throw error;
  }
};

module.exports = connection;
