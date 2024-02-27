const router = require("express").Router();

const categoryControllers = require("../controllers/categoryControllers");

router.post("/add", categoryControllers.addCategory);
router.get("/", categoryControllers.getCategory);
router.post("/delete", categoryControllers.deleteCategory);
router.post("/update", categoryControllers.updateCategoryDetails);
console.log('categoryControllers called')
module.exports = router;
