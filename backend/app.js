const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const urlRoutes = require("./routes/UrlRoutes");
const userRoutes = require("./routes/UserRoutes");
const { errorConverter, errorHandler } = require("./utils/ErrorHandler");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded((extended = true)));
app.use(bodyParser.json());

app.use("/api/urls", urlRoutes);
app.use("/api/users", userRoutes);

console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server started!");
});
