const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const eventController = require("./event.controller");

const app = express();
app.use(cors());

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/users", eventController.userCreate);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is up and running on port number" + port);
});
