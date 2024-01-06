const express = require("express");
const shipmentController = require("../Controllers/shipmentBreak");

const router = express.Router();


router.delete("/shipment_break",shipmentController.breakShipment);

module.exports = router;
