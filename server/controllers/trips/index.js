const express = require("express");
const tripController = require("./trip");
const {authenticate, authorize} = require("../../middlewares/authenticate");
const {checkCreate} = require("../../validations/trips/index");

const router = express.Router();

router.post("/trip/creates" , authenticate, authorize(["admin"]), checkCreate, tripController.createTrips)
router.get("/trips", tripController.getTrips)
router.get("/trip/:id", tripController.getTripById)
router.put("/trip/:id",authenticate,authorize(["admin"]) , tripController.updateTrip)
router.delete("/trip/:id",authenticate,authorize(["admin"]), tripController.deleteTrip)


module.exports = router;
