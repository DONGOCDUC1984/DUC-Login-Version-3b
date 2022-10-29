var mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
