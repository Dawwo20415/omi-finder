const app = require("./app/app.js");
require("dotenv").config();
const mongoose = require("mongoose");

/**
 * https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment#4-listen-on-the-correct-port
 */
const port = process.env.PORT || 8080;

app.locals.db = mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(() => {
    console.log(
      "Something went wrong! Check the string to connect to the Database"
    );
  });
