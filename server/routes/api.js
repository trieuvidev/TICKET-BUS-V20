const express = require("express");
const stationRouter = require("../controllers/stations/index");
const accountRouter = require("../controllers/accounts/index");
const tripRouter = require("../controllers/trips/index");
const ticketRouter = require("../controllers/tickets/index");

const router = express.Router();

router.use("/api", stationRouter);
router.use("/api", accountRouter);
router.use("/api", tripRouter);
router.use("/api", ticketRouter);

module.exports = router;
