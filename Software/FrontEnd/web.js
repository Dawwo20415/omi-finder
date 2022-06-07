const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const url = require("url");
const query = require("querystring");

const Iapi = require("../BackEnd/api-interface.js");
const Iatlas = require("../BackEnd/atlas-interface.js");
const zona_omi = require("../BackEnd/zona-omi-definition.js");
const Utente = require("../BackEnd/utente-definition.js");

//Definisce la porta su cui ascoltare | Heroku RICHIEDE la porta 5000
const PORT = process.env.PORT || 5000;

const app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

Iatlas.atlasConnectionSetup();

app.use(express.static("C:/Users/Simone/Desktop/omi-finder-development/Software/FrontEnd/omi-finder/build/index.html"));

app.get("/v2/getBy/:filter", async (req, res) => {
	res.json(await Iapi.getBy(zona_omi.model, req.params.filter, req.query));
});

app.get("/v2/getSettore/:settore/:filter", async (req, res) => {
	res.json(await Iapi.getSettore(zona_omi.model, req.params.filter, req.query, req.params.settore));
});

app.get("/v2/getTipo/:settore/:tipo/:filter", async (req, res) => {
	res.json(await Iapi.getTipo(zona_omi.model, req.params.filter, req.query, req.params.settore, req.params.tipo));
});

app.get("/v2/getByCoordinate", async (req, res) => {
	const parsedUrl = url.parse(req.url);
	const { latitude, longitude } = query.parse(parsedUrl.query);
	res.json(await Iapi.getByCoordinate(zona_omi.model,longitude,latitude));
});

// Da qua in giù autenticazione

app.post("/v2/userGetStatus/", urlencodedParser, async (req, res) => {
	res.json(await Iapi.userGetStatus(req.body.id, Utente));
});

app.post("/v2/login/", urlencodedParser, async (req, res) => {
	const { emailOrUsername, password } = req.body;
	res.json(await Iapi.loginUser(emailOrUsername, password, Utente));
});

app.put("/v2/register/", urlencodedParser, async (req, res) => {
	const { username, email, password } = req.body;
	// formato UNIX per verificare quando l'utente si è registrato
	const createdIn = Math.round(new Date().getTime() / 1000);
	res.json(await Iapi.registerUser(username, email, password, createdIn, Utente));
});

// Non implementato lato frontend per ora non serve
/*
app.patch("/v2/changePassword/", urlencodedParser, async (req, res) => {
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

app.listen(PORT, () => console.log("Listening..."));
