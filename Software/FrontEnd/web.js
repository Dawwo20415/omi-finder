const express = require("express");
const path = require("path");

const Iapi = require("../BackEnd/api-interface.js");
const Iatlas = require("../BackEnd/atlas-interface.js");
const zona_omi = require("../BackEnd/zona-omi-definition.js");
const utente = require("../BackEnd/utente-definition.js");

//Definisce la porta su cui ascoltare | Heroku RICHIEDE la porta 5000
const PORT = process.env.PORT || 5000;

const app = express();

Iatlas.atlasConnectionSetup();

app.use(express.static(path.join(__dirname, "build")));


app.get("/v2/getBy/:filter", async (req, res) => {
	res.json(await Iapi.getBy(zona_omi.model, req.params.filter, req.query));
});

app.get("/v2/getSettore/:settore/:filter", async (req, res) => {
	res.json(await Iapi.getSettore(zona_omi.model, req.params.filter, req.query, req.params.settore));
});

app.get("/v2/getTipo/:settore/:tipo/:filter", async (req, res) => {
	res.json(await Iapi.getTipo(zona_omi.model, req.params.filter, req.query, req.params.settore, req.params.tipo));
});

// Siccome React ha un router interno passo ad ogni pagina del sito
// il frontend di React ("/*" significa ogni path dopo root)
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log("Listening..."));
