const express = require("express");
const router = express.Router();
const User = require("./models/user"); // get our mongoose model
const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens

// ---------------------------------------------------------
// route to authenticate and get a new token
// ---------------------------------------------------------
router.post("", async function (req, res) {
  email_input = req.body.email;
  password_input = req.body.password;

  console.log(
    "The user with the " +
      email_input +
      " email address is trying to log into the system"
  );
  // find the user
  let user = await User.findOne({
    email: email_input,
  }).exec();

  // user not found
  if (!user) {
    let message_output = "Authentication failed. User not found.";
    console.log(message_output);
    res.json({
      success: false,
      message: message_output,
    });
  } else {
    // from this part onwards, the security is lacking. Do not use is in production.
    // this shows the password the user entered.
    // For test purposes only
    console.log("The password the user entered is: " + password_input);
    // check if password matches
    if (user.password != password_input) {
      let message_output = "Authentication failed. Wrong password.";
      console.log(message_output);
      res.json({
        success: false,
        message: message_output,
      });
    } else {
      // couldn't test this part of code since I got stuck on the part above
      // if user is found and password is right create a token
      var payload = {
        email: user.email,
        id: user._id,
        // other data encrypted in the token
      };
      var options = {
        expiresIn: 86400, // expires in 24 hours
      };
      var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

      res.json({
        success: true,
        message: "Enjoy your token!",
        token: token,
        email: user.email,
        id: user._id,
        self: "api/v1/" + user._id,
      });
    }
  }
});

module.exports = router;
