require("dotenv").config();
console.log(
  "productController file, process.env.JWTSECRET: " + process.env.JWTSECRET
);

//var Product = require("../models/Product");

async function getproduct(req, res) {
  try {
    await res.status(200).json("Hello,my friend.This is getproduct");
  } catch (error) {
    console.log(error);
  }
}

async function postproduct(req, res) {
  try {
    await res.status(200).json("Hello,DUC.This is postproduct");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getproduct,
  postproduct,
};
