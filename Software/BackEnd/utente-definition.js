const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        email: String,      //  email address used by the user to login
        password: String,   //  (hashed) password used by the user to login. It can be changed afterwards
        premium: Boolean,   //  True: premium user, False: freemium user. 
                            //  It changes authomatically once the user issues a payment with Stripe
        createdIn: Int32,   //  UNIX format, when the user signed up on the website
        idPayment: String   //  if it's a premium user, the payment token issued by Stripe
    }, {collection : 'Users', strictQuery: 'throw'}
);

const model = mongoose.model("Users", schema);

module.exports = {
    schema,
    model
}