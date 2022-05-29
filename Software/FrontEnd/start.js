//Packages
const express = require("express");
const custom_api = require("../BackEnd/atlas-interface.js");
const Iapi = require("../BackEnd/api-interface.js");
const zona_omi = require("../BackEnd/zona-omi-definition.js");
const utente = require("../BackEnd/utente-definition.js");

//Definisce la porta su cui ascoltare | Heroku RICHIEDE la porta 5000
const PORT = process.env.PORT || 5000;

//Definisce una istanza della "classe" express con cui si interagisce
//con l'interfaccia web
const web_interface = express();

const zona = custom_api.atlasConnectionSetup();

//Fare cose con l'interfaccia web

//web_interface.use(express.static("./omi-finder/build"));

// "/" indica che è la homepage del sito
// Inserire /[qualcosa] si riferisce a quella pagina
web_interface.get("/", (req, res) => {
	res.sendFile(__dirname + '/omi-finder/build/index.html');
});

web_interface.get("/v2/getBy/:filter", async (req, res) => {
	res.json(await Iapi.getBy(zona_omi.model, req.params.filter, req.query));
});

web_interface.get("/v2/getSettore/:settore/:filter", async (req, res) => {
	res.json(await Iapi.getSettore(zona_omi.model, req.params.filter, req.query, req.params.settore));
});

web_interface.get("/v2/getTipo/:settore/:tipo/:filter", async (req, res) => {
	res.json(await Iapi.getTipo(zona_omi.model, req.params.filter, req.query, req.params.settore, req.params.tipo));
});

//Dire ad espress su quale porta ascoltare le richieste
//Con aggiunta funzione che lo dichiara sulla console
web_interface.listen(PORT, () => console.log(`Listening on ${PORT}`));
