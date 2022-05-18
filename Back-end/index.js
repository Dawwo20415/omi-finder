const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");

const app = express();
const router = express.Router();
var port = 4000;

dotenv.config();
const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@omifinder.brexx.mongodb.net/OmiFinder?retryWrites=true&w=majority`;
mongoose.connect(mongoString, { useNewUrlParser: true });

mongoose.connection.once("open", function (ref) {
  console.log(
    "Connected to the MONGO server.\n\nThis is the list of Collections on it"
  );
  //trying to get collection names
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) console.log(err);
    else {
      console.log(names); // [{ name: 'dbname.myCollection' }]
      module.exports.Collection = names;
    }
  });
});

app.use("/", router);

app.listen(port, function () {
  console.log("Server is running on Port: " + port);
});

var users = mongoose.model("Users", new mongoose.Schema({}), "Users");

app.get("/statusUsers", function (_, res) {
  users.find({}, "premium", function (err, data) {
    if (err) return next(err);
    res.status(200).json(data);
  });
});

// This functions returns the status of a single user
app.get("/statusUser/:id?", function (req, res) {
  const id = req.params.id;
  users
    .findById(id)
    .select("_id, premium")
    .then(function (data, err) {
      // if the user with the id=${id} exists
      data ? res.status(200).json(data) : res.status(500).json(err);
    })
    .catch(function () {
      // if the user with the id=${id} does not exist
      res.status(404).json({ reason: "The ID " + id + " does not exist" });
    });
});

// NOTE : this is not a secure function and SHOULD NOT be used in the final product
// It could be considered more of a test rather than a final functionality
app.get("/login/:mail/:pwd", function (req, res) {
  });
  