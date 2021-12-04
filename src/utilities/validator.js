let validator = {};

// To validate date
validator.validateDate = (tDate) => {
  if (new Date(tDate) > new Date()) {
    let err = new Error("Transaction date cannot be future date");
    err.status = 406; //Not acceptable code.
    throw err;
  }
};

module.exports = validator;
