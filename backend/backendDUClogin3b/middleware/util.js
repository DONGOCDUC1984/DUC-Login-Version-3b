require("dotenv").config();
console.log("util file, process.env.JWTSECRET: " + process.env.JWTSECRET);
var User = require("../models/User");
var jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
  try {
    var token = req.cookies.token;

    var decoded = jwt.verify(token, process.env.JWTSECRET);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    console.log(error);
  }
}

function checkAdmin(req, res, next) {
  try {
    if (req.user && req.user.isAdmin == false) {
      return res.status(400).json("Not Admin.So Not Authorized");
    } else {
      return next();
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { authenticate, checkAdmin };
