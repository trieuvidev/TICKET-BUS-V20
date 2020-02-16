const mongoose = require("mongoose");
const bluebird = require("bluebird");

const connectDatabase = () => {
  mongoose.Promise = bluebird;
  let URL = `${process.env.MONGO_LOCAL_URL}`;
  return mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("Connect Database MongoDB Successfuly"))
    .catch(console.log);
};

module.exports = connectDatabase;