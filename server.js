const express = require("express");
const connectDb = require("./connectDb");
const initRouter = require("./server/routes/api");
const cors = require("cors");
const keys = require('./server/configs/index');


connectDb();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/", cors() ,  initRouter);


const port = process.env.PORT || keys.port;

app.listen(port, () => {
  console.log(`Connect Server App from ${port} Successfuly`)
})