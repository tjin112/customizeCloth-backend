const router = require("express").Router();

const attributesControllers = require("../controllers/attributesControllers");

router.get("/", attributesControllers.getAllAttributes);
router.post("/save", attributesControllers.saveAttire);
// router.post("/quantity", cartControllers.decrementCartItem);
// router.delete("/:cartItemId", cartControllers.deleteCartItem);

module.exports = router;
