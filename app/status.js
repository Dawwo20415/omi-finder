const express = require("express");
const router = express.Router();
const User = require("./models/user"); // get our mongoose model

// doesn't work.
router.post("", async function (req, res) {
  const id = req.params.id;
  User.findById(id)
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

/*


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

    
*/

module.exports = router;
