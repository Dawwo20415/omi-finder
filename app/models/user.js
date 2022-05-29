var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model(
  "User",
  new Schema({
    /*email: String,		// email address of the user
	password: String,	// Hashed password of the user
	premium: Boolean,	// True: Premium, False: Freemium
	idPayment: String,	// ID Payment of the user (if premium, blank otherwise)
	createdIn: Number	// UNIX Standardization of the date the user was created in*/

    email: String, // email address of the user
    password: String, // Hashed password of the user
  })
);
