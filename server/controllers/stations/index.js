const express = require("express");
const stationController = require("./stations");
const {authenticate, authorize} = require("../../middlewares/authenticate");
const {checkCreate, checkUpdate} = require("../../validations/stations/index");

const router = express.Router();

router.post("/stations",authenticate, authorize(["admin"]), checkCreate,  stationController.createStations)
router.get("/stations", stationController.findStations)
router.get("/station/:id",stationController.findByIdStation)
router.put("/station/:id", authenticate , authorize(["admin"]), checkUpdate,stationController.updateStation)
router.delete("/station/:id",authenticate, authorize(["admin"]), stationController.deleteStation)

module.exports = router;
