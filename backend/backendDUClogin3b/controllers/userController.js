require("dotenv").config();
console.log(
  "userController file, process.env.JWTSECRET: " + process.env.JWTSECRET
);

var User = require("../models/User");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

function aboutuser(req, res) {
  res.status(200).json(req.user);
}

async function register(req, res) {
  try {
    var { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json("Please add all fields.");
    } else {
      var userExists = await User.findOne({ email: email });
      if (userExists) {
        res.status(400).json("User already existed.");
      }

      var hashedPassword = await bcrypt.hashSync(password, 10);
      var user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        isAdmin: false,
      });
      if (!user) {
        res.status(400).json("Invalid User Data");
      } else {
        var token = await jwt.sign(
          { _id: user._id, email: user.email },
          process.env.JWTSECRET
        );
        res
          .cookie("token", token, { httpOnly: true })
          .json({ _id: user._id, name: user.name, email: user.email });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res) {
  var { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("Please add all fields.");
  }

  try {
    var user = await User.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      var token = await jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWTSECRET
      );
      res
        .cookie("token", token, { httpOnly: true })
        .json({ _id: user._id, name: user.name, email: user.email });
    } else {
      res.status(400).json("Wrong email or wrong password.");
    }
  } catch (error) {
    console.log(error);
  }
}

async function createadmin(req, res) {
  try {
    var hashedPassword = await bcrypt.hashSync("NGOCDUC84", 10);
    var user = await User.create({
      name: "NGOC DUC",
      email: "NGOCDUC84@gmail.com",
      password: hashedPassword,
      isAdmin: true,
    });
    if (!user) {
      res.status(400).json("Admin Was Not Created ");
    } else {
      var token = await jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWTSECRET
      );
      res.cookie("token", token, { httpOnly: true }).json({
        message: "Admin Was Created Successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function logout(req, res) {
  res.clearCookie("token").json("Logged out.");
}

module.exports = { aboutuser, register, login, createadmin, logout };
