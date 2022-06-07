const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");

const Iapi = require("../BackEnd/api-interface.js");
const Iatlas = require("../BackEnd/atlas-interface.js");
const zona_omi = require("../BackEnd/zona-omi-definition.js");
const Utente = require("../BackEnd/utente-definition.js");

//Definisce la porta su cui ascoltare | Heroku RICHIEDE la porta 5000
const PORT = process.env.PORT || 5000;

const app = express();

Iatlas.atlasConnectionSetup();

app.use(express.static(path.join(__dirname, "build")));

// Parsing automatico body json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/v2/getBy/:filter", async (req, res) => {
	res.json(await Iapi.getBy(zona_omi.model, req.params.filter, req.query));
});

app.get("/v2/getSettore/:settore/:filter", async (req, res) => {
	res.json(await Iapi.getSettore(zona_omi.model, req.params.filter, req.query, req.params.settore));
});

app.get("/v2/getTipo/:settore/:tipo/:filter", async (req, res) => {
	res.json(await Iapi.getTipo(zona_omi.model, req.params.filter, req.query, req.params.settore, req.params.tipo));
});

// Da qua in giù autenticazione

app.post("/v2/userGetStatus/", async (req, res) => {
	const { id } = req.body;
	Iapi.userGetStatus(id, Utente)
		.then((value) => {
			res.json(value);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.post("/v2/login/", (req, res) => {
	const { emailOrUsername, password } = req.body;
	Iapi.loginUser(emailOrUsername, password, Utente)
		.then((value) => {
			res.json(value);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.put("/v2/register/", (req, res) => {
	const { username, email, password } = req.body;
	// formato UNIX per verificare quando l'utente si è registrato
	const createdIn = Math.round(new Date().getTime() / 1000);
	Iapi.registerUser(username, email, password, createdIn, Utente)
		.then((value) => {
			res.json(value);
		})
		.catch((err) => {
			res.json(err);
		});
});

// Non implementato lato frontend per ora non serve
/*
app.patch("/v2/changePassword/", async (req, res) => {
    const {email, oldPassword, newPassword} = req.body;
	res.json(await Iapi.changePassword(email, oldPassword, newPassword, Utente));
});
*/

// Pagina web
// Siccome React ha un router interno passo ad ogni pagina del sito
// il frontend di React ("/*" significa ogni path dopo root)
app.get("/*", (_, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
