const express = require("express");
const app = express();
const cors = require("cors");

const authentication = require("./authentication.js");
const statusUser = require(".status.js");

const users = require("./users.js");

/**
 * Configure Express.js parsing middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * CORS requests
 */
app.use(cors());

// // Add headers before the routes are defined
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

/**
 * Serve front-end static files
 */
app.use("/", express.static(process.env.FRONTEND || "static"));
// If process.env.FRONTEND folder does not contain index.html then use the one from static
app.use("/", express.static("static")); // expose also this folder

app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

/**
 * Authentication routing and middleware
 */
app.use("/api/v1/authentications", authentication);

app.use("/api/v1/status", statusUser);

/**
 * Resource routing
 */

app.use("/api/v1/users", users);

/* Default 404 handler */
app.use((req, res) => {
  res.status(404);
  res.json({ error: "Not found" });
});

module.exports = app;
