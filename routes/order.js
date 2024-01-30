const router = require("express").Router();

const orderControllers = require("../controllers/ordersControllers");

router.get("/:id", orderControllers.getUserOrders);

module.exports = router;
