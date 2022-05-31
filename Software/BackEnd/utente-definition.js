const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    email: String,      //  email address used by the user to login
    password: String,   //  (hashed) password used by the user to login. It can be changed afterwards
    createdIn: Number,  //  UNIX format, when the user signed up on the website
    idPayment: String,  //  if it's a premium user, the payment token issued by Stripe
  },
  { collection: "Users", strictQuery: "throw" }
)


module.exports = Utente = mongoose.model("Utente", UserSchema)
