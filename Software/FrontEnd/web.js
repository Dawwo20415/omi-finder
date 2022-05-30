const express = require("express");
const path = require("path");

// const custom_api = require("../BackEnd/atlas-interface.js");
// const Iapi = require("../BackEnd/api-interface.js");
// const zona_omi = require("../BackEnd/zona-omi-definition.js");
// const utente = require("../BackEnd/utente-definition.js");

//Definisce la porta su cui ascoltare | Heroku RICHIEDE la porta 5000
const PORT = process.env.PORT || 5000;

const app = express();

// const zona = custom_api.atlasConnectionSetup();

app.use(express.static(path.join(__dirname, "build")));

// Siccome React ha un router interno passo ad ogni pagina del sito
// il frontend di React ("/*" significa ogni path dopo root)
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log("Listening..."));
