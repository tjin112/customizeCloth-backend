const router = require("express").Router();

const cartControllers = require("../controllers/cartControllers");

router.get("/find/:id", cartControllers.getCart);
router.post("/", cartControllers.addToCart);
router.post("/quantity", cartControllers.decrementCartItem);
router.delete("/:cartItemId", cartControllers.deleteCartItem);

module.exports = router;
