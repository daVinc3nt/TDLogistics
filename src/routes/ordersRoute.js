const express = require("express");
const ordersController = require("../controllers/ordersController");

const router = express.Router();

router.post("/create", ordersController.createNewOrder);
router.post("/check", ordersController.checkExistOrder);
router.get("/search", ordersController.getOrder);
// router.get("/", ordersController.getAllOrders);
//router.get("/sum", ordersController.getSumGroupByField);

module.exports = router;