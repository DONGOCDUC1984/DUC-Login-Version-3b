var express = require("express");
var router = express.Router();
var {
  getcomment,
  setcomment,
  updatecomment,
  deletecomment,
} = require("../controllers/commentController");
var { authenticate } = require("../middleware/util");

router.get("/getcomment", authenticate, getcomment);
router.post("/setcomment", authenticate, setcomment);
router.put("/updatecomment/:_id", authenticate, updatecomment);
router.delete("/deletecomment/:_id", authenticate, deletecomment);

module.exports = router;
