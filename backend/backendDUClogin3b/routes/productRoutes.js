var express = require("express");
var router = express.Router();
var { getproduct, postproduct } = require("../controllers/productController");
var { authenticate, checkAdmin } = require("../middleware/util");

router.get("/getproduct", authenticate, getproduct);
router.post("/postproduct", authenticate, checkAdmin, postproduct);

module.exports = router;
