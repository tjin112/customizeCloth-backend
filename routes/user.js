const router = require("express").Router();
const userController = require("../controllers/userControllers");

router.delete("/delete/:id", userController.deleteUser);
router.get("/getuser/:id", userController.getUser);
module.exports = router;
