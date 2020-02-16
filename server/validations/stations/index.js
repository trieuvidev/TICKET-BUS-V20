const {middlewareCreateStation} = require("./validation.create.staton.post");
const { middlewareUpdateStation } = require("./validation.update.station.put");

const checkCreate = middlewareCreateStation;
const checkUpdate = middlewareUpdateStation;

module.exports = { 
  checkCreate,
  checkUpdate 
}