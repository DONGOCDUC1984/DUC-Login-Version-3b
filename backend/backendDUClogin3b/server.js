require("dotenv").config();
console.log("server file, process.env.JWTSECRET: " + process.env.JWTSECRET);
var express = require("express");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/DUClogin3b", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log("Connected to db."))
  .catch((err) => console.log(err));

var app = express();
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json("OK.This is home page.");
});

app.use("/", require("./routes/commentRoutes"));
app.use("/", require("./routes/productRoutes"));
app.use("/", require("./routes/userRoutes"));

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
