require("dotenv").config();
console.log(
  "commentController file, process.env.JWTSECRET: " + process.env.JWTSECRET
);

var Comment = require("../models/Comment");

async function getcomment(req, res) {
  try {
    var comments = await Comment.find({ user_email: req.user.email });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
}

async function setcomment(req, res) {
  var { text } = req.body;
  if (!text) {
    res.status(400).json("Please add the field.");
  }
  console.log("email: ", req.user.email);
  try {
    var comment = await Comment.create({
      user_email: req.user.email,
      text: text,
    });
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
}

async function updatecomment(req, res) {
  var { text } = req.body;
  if (!text) {
    res.status(400).json("Please add the field.");
  }

  try {
    var comment = await Comment.findById(req.params._id);
    if (!comment) {
      res.status(400).json("Comment does not exist.");
    }
    console.log("comment.user_email: ", comment.user_email);
    if (comment.user_email !== req.user.email) {
      res.status(400).json("User not authorized.");
    } else {
      var updatecomment = await Comment.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json(updatecomment);
    }
  } catch (error) {
    console.log(error);
  }
}

async function deletecomment(req, res) {
  console.log("req.params._id: ", req.params._id);
  try {
    var comment = await Comment.findById(req.params._id);
    if (!comment) {
      res.status(400).json("Comment does not exist.");
    }
    if (comment.user_email !== req.user.email) {
      res.status(400).json("User not authorized.");
    } else {
      await comment.remove();
      res.status(200).json("Comment was deleted.");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getcomment,
  setcomment,
  updatecomment,
  deletecomment,
};
