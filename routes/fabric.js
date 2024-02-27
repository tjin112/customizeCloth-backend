const router = require("express").Router();

const fabricControllers = require("../controllers/fabricControllers");

router.get("/", fabricControllers.getAllFrabic);
router.post("/save", fabricControllers.saveFabric);
// router.post("/quantity", cartControllers.decrementCartItem);
// router.delete("/:cartItemId", cartControllers.deleteCartItem);

module.exports = router;
